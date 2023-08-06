import './style.css'
import { M4 } from './M4'
import { Cube } from './Cube'
import { Camera } from './Camera'
import { bindAttribute, degToRad } from './utils'
import { Vec3 } from './Vec3'
import { Plane } from './Plane'
import { Primitive } from './Primitive'

// const vertexShaderSource = `#version 300 es
// in vec4 a_position;
// in vec3 a_normal;

// uniform vec3 u_lightWorldPosition;
// uniform vec3 u_viewWorldPosition;

// uniform mat4 u_world;
// uniform mat4 u_worldViewProjection;
// uniform mat4 u_worldInverseTranspose;

// out vec3 v_normal;

// out vec3 v_surfaceToLight;
// out vec3 v_surfaceToView;

// void main() {
//   // Multiply the position by the matrix.
//   gl_Position = u_worldViewProjection * a_position;

//   // orient the normals and pass to the fragment shader
//   v_normal = mat3(u_worldInverseTranspose) * a_normal;

//   // compute the world position of the surfoace
//   vec3 surfaceWorldPosition = (u_world * a_position).xyz;

//   // compute the vector of the surface to the light
//   // and pass it to the fragment shader
//   v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

//   // compute the vector of the surface to the view/camera
//   // and pass it to the fragment shader
//   v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
// }`
const vertexShaderSource = `#version 300 es
in vec4 a_pos;
in vec4 a_color;
in vec3 a_normal;

// A matrix to transform the positions by
uniform mat4 u_worldMatrix;
uniform mat4 u_viewProjectionMatrix;
uniform vec3 u_viewWorldPosition;

out vec4 v_col;
out vec4 v_worldPosition;
out vec4 v_pos;
out vec4 v_translation;
out vec3 v_normal;
out vec3 v_surfaceToView;

void main(){
	vec4 worldPosition = u_worldMatrix * a_pos;

	gl_Position =  u_viewProjectionMatrix * worldPosition;
	v_col = a_color;
	v_worldPosition = worldPosition;
	v_pos = a_pos;
	v_translation = u_worldMatrix[3].xyzw;

	mat4 worldInverseTranspose = transpose(inverse(u_worldMatrix));
	v_normal = mat3(worldInverseTranspose) * a_normal;

	v_surfaceToView = u_viewWorldPosition - worldPosition.xyz;
}
`

const fragmentShaderSource = `#version 300 es

precision highp float;
out vec4 outColor;

in vec3 v_normal;
in vec4 v_col;
in vec4 v_worldPosition;
in vec4 v_pos;
in vec4 v_translation;
in vec3 v_surfaceToView;

uniform vec3 u_reverseLightDirection;
uniform vec3 u_pointlightPosition;
uniform vec3 u_spotlightPosition;
uniform vec3 u_lightDirection;
uniform float u_innerLimit;
uniform float u_outerLimit;
uniform float u_shininess;


void main(){

  	vec3 normal = normalize(v_normal);
	vec3 surfaceToLight = u_pointlightPosition - vec3(v_worldPosition);
	float pointlight = dot(normal, normalize(surfaceToLight));

	vec3 surfaceToLightDirection = normalize(surfaceToLight);
	vec3 surfaceToViewDirection = normalize(v_surfaceToView);
	vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

	float specular = dot(normal, halfVector);
	
	specular = pow(specular, 300.0);


	// float light = dot(normal, u_reverseLightDirection);

	specular = 0.0;

	vec3 lightDirection = normalize(u_lightDirection);
	float dotFromDirection = dot(surfaceToLightDirection, lightDirection);
	// step(a,b)  if (a >= b) 1 else 2 
	  // inLight will be 1 if we're inside the spotlight and 0 if not

	float limitRange = u_innerLimit - u_outerLimit;
	float inLight = clamp(( dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
	float light = inLight * dot(normal, surfaceToLightDirection);
	// specular = inLight * pow(dot(normal, halfVector), u_shininess);




	outColor = vec4(v_col.xyz,1.0);
	outColor.rgb *= light;
	outColor.rgb *= pointlight;
	outColor.rgb += specular;
}
`
main()
function main() {
	const canvas = document.getElementById('main-canvas') as HTMLCanvasElement

	const gl = canvas.getContext('webgl2')
	if (!gl) throw new Error('Cannot execute')
	const program = gl.createProgram()!

	const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
	const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!
	{
		// vertex shader
		gl.shaderSource(vertexShader, vertexShaderSource)
		gl.compileShader(vertexShader)
		gl.attachShader(program, vertexShader)
	}
	{
		// fragment shader
		gl.shaderSource(fragShader, fragmentShaderSource)
		gl.compileShader(fragShader)
		gl.attachShader(program, fragShader)
	}

	gl.linkProgram(program)
	gl.useProgram(program)

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const info = gl.getProgramInfoLog(program)
		throw `Could not compile WebGL program. \n\n${info}`
	}
	const viewProjectionMatrixLocation = gl.getUniformLocation(
		program,
		'u_viewProjectionMatrix'
	)
	const worldMatrixLocation = gl.getUniformLocation(program, 'u_worldMatrix')

	const reverseLightDirectionLocation = gl.getUniformLocation(
		program,
		'u_reverseLightDirection'
	)
	const viewWorldLocation = gl.getUniformLocation(program, 'u_viewWorldPosition')
	const pointLightPositionLocation = gl.getUniformLocation(
		program,
		'u_pointlightPosition'
	)

	const lightDirectionLocation = gl.getUniformLocation(program, 'u_lightDirection')
	const innerLimitLocation = gl.getUniformLocation(program, 'u_innerLimit')
	const outerLimitLocation = gl.getUniformLocation(program, 'u_outerLimit')
	const shininessLocation = gl.getUniformLocation(program, 'u_shininess')
	window.addEventListener('unload', () => {
		console.log('UNLOAD')
	})

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)

	const objects: Primitive[] = []
	const cube = new Cube(2)
	objects.push(cube)
	const cube2 = new Cube(2)
	objects.push(cube2)

	const plane = new Plane(50, 50)
	objects.push(plane)
	plane.translateY(-4)
	plane.rotateZ(0.2)

	const camera = new Camera()
	camera.translateZ(10)
	const savedCamera = localStorage.getItem('cameraM4')

	if (savedCamera) {
		camera.m4 = JSON.parse(savedCamera)
	}

	window.addEventListener('unload', () => {
		localStorage.setItem('cameraM4', JSON.stringify(camera.m4))
	})

	const lightDirection = new Float32Array([0, 1, 0.2])

	cube2.translateY(8)

	// set attributes

	const { buffer: posBuffer } = bindAttribute(
		gl,
		program,
		'a_pos',
		cube.geometry.toFloat32Array()
	)
	const { buffer: colorBuffer } = bindAttribute(
		gl,
		program,
		'a_color',
		cube.vertexData.toFloat32Array()
	)
	const { buffer: normalBuffer } = bindAttribute(
		gl,
		program,
		'a_normal',
		cube.normals.toFloat32Array()
	)

	gl.useProgram(program)

	let previous = 0
	let deltaTime = 0

	const draw = (t: number) => {
		deltaTime = t - previous
		previous = t
		canvas.width = canvas.clientWidth
		canvas.height = canvas.clientHeight

		console.log(deltaTime)
		const projectionMatrix = M4.perspective(
			Math.PI / 2,
			canvas.width / canvas.height,
			1,
			2000
		)

		camera.m4 = M4.lookAt(camera.pos, new Vec3(cube.m4.w0, cube.m4.w1, cube.m4.w2))
		console.log(camera)
		const viewMatrix = M4.inverse(camera.m4)
		console.log(viewMatrix)
		const viewProjectionMatrix = M4.multiplyM4(projectionMatrix, viewMatrix)

		gl.uniformMatrix4fv(
			viewProjectionMatrixLocation,
			false,
			viewProjectionMatrix.toFloat32Array()
		)
		gl.uniform3fv(pointLightPositionLocation, new Vec3(0, 10, 0))
		gl.uniform3fv(reverseLightDirectionLocation, lightDirection)
		gl.uniform3fv(viewWorldLocation, camera.translation)

		gl.uniform1f(shininessLocation, 100)
		gl.uniform1f(outerLimitLocation, Math.cos(degToRad(51)))
		gl.uniform1f(innerLimitLocation, Math.cos(degToRad(50)))
		gl.uniform3fv(lightDirectionLocation, new Vec3(0, -1, 0).negate())
		// convert clipspace to pixel
		gl.viewport(0, 0, canvas.width, canvas.height)
		// clear the canvas
		gl.enable(gl.CULL_FACE)
		gl.enable(gl.DEPTH_TEST)

		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		gl.bindVertexArray(vao)
		for (let i = 0; i < objects.length; ++i) {
			if (objects[i] instanceof Cube) {
				objects[i].rotateX(deltaTime * 0.001 + i * 0.01)
				objects[i].rotateY(deltaTime * 0.001 + i * 0.01)
			}
			gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
			gl.bufferData(
				gl.ARRAY_BUFFER,
				objects[i].geometry.toFloat32Array(),
				gl.STATIC_DRAW
			)
			gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
			gl.bufferData(
				gl.ARRAY_BUFFER,
				objects[i].vertexData.toFloat32Array(),
				gl.STATIC_DRAW
			)
			gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
			gl.bufferData(
				gl.ARRAY_BUFFER,
				objects[i].normals.toFloat32Array(),
				gl.STATIC_DRAW
			)

			gl.uniformMatrix4fv(
				worldMatrixLocation,
				false,
				objects[i].m4.toFloat32Array()
			)

			gl.drawArrays(gl.TRIANGLES, 0, objects[i].vertexCount)
		}
		console.log(
			new Vec3(lightDirection[0], lightDirection[1], lightDirection[2]).dot(
				new Vec3(0, 1, 0)
			)
		)
		requestAnimationFrame(draw)
	}
	requestAnimationFrame(draw)
}
