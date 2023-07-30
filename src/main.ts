import './style.css'
import { Vec4F } from './Vec4F'
import { M4 } from './M4'

const vertexShaderSource = `#version 300 es
in vec4 a_pos;
in vec4 a_color;
// A matrix to transform the positions by
uniform mat4 u_matrix;

out vec4 v_col;

void main(){
	gl_Position =  a_pos;
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
	const program = gl.createProgram()

	const vertexShader = gl.createShader(gl.VERTEX_SHADER)
	const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
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
	const uMatrixLocation = gl.getUniformLocation(program, 'u_matrix')

	// prettier-ignore
	const color_data = [
		// face front
		1,0,0,
		1,0,0,
		1,0,0,

		1,0,0,
		1,0,0,
		1,0,0,

		// face left
		0,1,0,
		0,1,0,
		0,1,0,
		
		0,1,0,
		0,1,0,
		0,1,0,

		// face down
		1,1,0,
		1,1,0,
		1,1,0,

		1,1,0,
		1,1,0,
		1,1,0,
		// face right
		0,1,1,
		0,1,1,
		0,1,1,

		0,1,1,
		0,1,1,
		0,1,1,

		// face up
		0.5,0.5,0.5,
		0.5,0.5,0.5,
		0.5,0.5,0.5,

		0.5,0.5,0.5,
		0.5,0.5,0.5,
		0.5,0.5,0.5,
		//face back
		0, 0.2, 0.2,
		0, 0.2, 0.2,
		0, 0.2, 0.2,

		0, 0.2, 0.2,
		0, 0.2, 0.2,
		0, 0.2, 0.2,


	]
	const colorVec4 = new Vec4F(color_data)

	// prettier-ignore
	const data = [
		// face front
		0,0,0,
		0,1,0,
		1,0,0,

		0,1,0,
		1,1,0,
		1,0,0,

		// face left
		0,1,-1,
		0,1,0,
		0,0,0,

		0,1,-1,
		0,0,0,
		0,0,-1,

		// face down
		0,0,0,
		1,0,0,
		0,0,-1,

		1,0,0,
		1,0,-1,
		0,0,-1,

		// face right
		1, 1 , 0,
		1, 1, -1,
		1, 0, -1,

		1, 1, 0,
		1, 0, -1,
		1, 0, 0,

		// face up
		0, 1, 0, 
		0, 1, -1,
		1, 1, 0,

		1, 1, 0,
		0, 1, -1,
		1, 1, -1,

		// face back
		0, 1, -1,
		1, 0, -1,
		0, 0, -1,

		1, 1, -1,
		1, 0, -1,
		0, 1, -1




	]

	let xAngle = 0
	let yAngle = 0
	let zAngle = 0
	function draw() {
		canvas.width = canvas.clientWidth
		canvas.height = canvas.clientHeight

		const vec4 = new Vec4F(data)
		const triangleBuff = gl.createBuffer()
		const colorBuff = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuff)
		// const perspective = M4.perspective(canvas.width, canvas.height, 400)
		// vec4.multiplyM4(perspective)
		let transforms = M4.identity()
		const perspective = M4.perspective(
			Math.PI * 0.5,
			canvas.width / canvas.height,
			1,
			2000
		)
		transforms.multiplyM4(perspective)
		transforms.multiplyM4(M4.translate(0, 0, -2))
		const rotationY = M4.rotationY(Math.PI * yAngle)
		transforms.multiplyM4(rotationY)
		const rotationZ = M4.rotationZ(Math.PI * zAngle)
		transforms.multiplyM4(rotationZ)
		const scale = M4.scale(0.5, 0.5, 0.5)
		transforms.multiplyM4(scale)
		console.log(transforms)

		vec4.multiplyM4(M4.translate(-0.5, -0.5, 0.5))
		vec4.multiplyM4(transforms)
		console.log(vec4)

		// position data
		gl.bufferData(gl.ARRAY_BUFFER, vec4.toFloat32Array(), gl.STATIC_DRAW)

		const vao = gl.createVertexArray()
		gl.bindVertexArray(vao)
		gl.enableVertexAttribArray(aPosLocation)
		gl.vertexAttribPointer(aPosLocation, 4, gl.FLOAT, false, 0, 0)

		// color
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuff)
		gl.bufferData(gl.ARRAY_BUFFER, colorVec4.toFloat32Array(), gl.STATIC_DRAW)
		gl.enableVertexAttribArray(aColorLocation)
		gl.vertexAttribPointer(aColorLocation, 4, gl.FLOAT, false, 0, 0)

		// Set the matrix.
		gl.uniformMatrix4fv(uMatrixLocation, false, transforms.toFloat32Array())

		gl.enable(gl.DEPTH_TEST)

		gl.viewport(0, 0, canvas.width, canvas.height)
		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		gl.drawArrays(gl.TRIANGLES, 0, data.length / 3)

		const error = gl.getError()
		console.log('error', error)
	}
	yAngle = 0.25
	xAngle = 0
	zAngle = 0.25
	draw()

	let lastTime = Date.now()
	setInterval(() => {
		const curr = Date.now()
		if (curr - lastTime >= 50) {
			lastTime = curr
			xAngle += 0.05
			yAngle += 0.05
			zAngle += 0.05
			draw()
		}
	})
}
