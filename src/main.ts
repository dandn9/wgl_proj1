import './style.css'
import { M4 } from './M4'
import { Cube } from './Cube'
import { Camera } from './Camera'
import { bindAttribute } from './utils'
import { Vec3 } from './Vec3'

const vertexShaderSource = `#version 300 es
in vec4 a_pos;
in vec4 a_color;

// A matrix to transform the positions by
uniform mat4 u_worldMatrix;

out vec4 v_col;
uniform mat4 u_viewProjectionMatrix;

void main(){
	gl_Position =  u_viewProjectionMatrix * u_worldMatrix * a_pos;
	v_col = a_color;
}
`

const fragmentShaderSource = `#version 300 es

precision highp float;
out vec4 outColor;
in vec4 v_col;

void main(){
	outColor = vec4(v_col.xyz,1.0);
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

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)

	const objects: Cube[] = []
	const cube = new Cube(2)
	objects.push(cube)
	const cube2 = new Cube(2)
	objects.push(cube2)

	const camera = new Camera()
	camera.translateZ(10)

	cube2.translateY(5)

	// set attributes

	bindAttribute(gl, program, 'a_pos', cube.geometry.toFloat32Array())
	bindAttribute(gl, program, 'a_color', cube.vertex_color)

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
		// convert clipspace to pixel
		gl.viewport(0, 0, canvas.width, canvas.height)
		// clear the canvas
		gl.enable(gl.CULL_FACE)
		gl.enable(gl.DEPTH_TEST)

		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		gl.bindVertexArray(vao)
		for (let i = 0; i < objects.length; ++i) {
			objects[i].rotateX(deltaTime * 0.001 + i * 0.01)
			objects[i].rotateY(deltaTime * 0.001 + i * 0.01)
			gl.uniformMatrix4fv(
				worldMatrixLocation,
				false,
				objects[i].m4.toFloat32Array()
			)

			gl.drawArrays(gl.TRIANGLES, 0, objects[i].vertexCount)
		}
		requestAnimationFrame(draw)
	}
	requestAnimationFrame(draw)
}
