import './style.css'
import { M4 } from './M4'
import { m4 } from 'twgl.js'
import { Cube } from './Cube'
import { Camera } from './Camera'

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

	const aPosLocation = gl.getAttribLocation(program, 'a_pos')
	const aColorLocation = gl.getAttribLocation(program, 'a_color')
	const viewProjectionMatrixLocation = gl.getUniformLocation(
		program,
		'u_viewProjectionMatrix'
	)
	const worldMatrixLocation = gl.getUniformLocation(program, 'u_worldMatrix')

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)

	const cube = new Cube(2)
	console.log(cube)

	const camera = new Camera()

	{
		const buffer = gl.createBuffer()!
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		gl.bufferData(gl.ARRAY_BUFFER, cube.geometry.toFloat32Array(), gl.STATIC_DRAW)

		gl.enableVertexAttribArray(aPosLocation)
		gl.vertexAttribPointer(aPosLocation, 3, gl.FLOAT, false, 0, 0)
	}
	{
		const buffer = gl.createBuffer()!
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		gl.bufferData(gl.ARRAY_BUFFER, cube.vertex_color, gl.STATIC_DRAW)

		gl.enableVertexAttribArray(aColorLocation)
		gl.vertexAttribPointer(aColorLocation, 3, gl.FLOAT, false, 0, 0)
	}

	gl.useProgram(program)

	let previous = 0
	let deltaTime = 0
	const draw = (t: number) => {
		deltaTime = t - previous
		previous = t
		canvas.width = canvas.clientWidth
		canvas.height = canvas.clientHeight

		console.log(deltaTime)
		cube.rotateX(deltaTime * 0.001)
		cube.rotateY(deltaTime * 0.001)
		const projectionMatrix = M4.perspective(
			Math.PI / 2,
			canvas.width / canvas.height,
			1,
			2000
		)
		const viewMatrix = M4.inverse(camera.m4)
		const viewProjectionMatrix = M4.multiplyM4(projectionMatrix, viewMatrix)
		gl.uniformMatrix4fv(
			viewProjectionMatrixLocation,
			false,
			viewProjectionMatrix.toFloat32Array()
		)
		gl.uniformMatrix4fv(worldMatrixLocation, false, cube.m4.toFloat32Array())
		// convert clipspace to pixel
		gl.viewport(0, 0, canvas.width, canvas.height)
		// clear the canvas
		gl.enable(gl.CULL_FACE)
		gl.enable(gl.DEPTH_TEST)

		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		gl.bindVertexArray(vao)

		gl.drawArrays(gl.TRIANGLES, 0, cube.geometry.components.length * 3)
		requestAnimationFrame(draw)
	}
	requestAnimationFrame(draw)
}
