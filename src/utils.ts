export function bindAttribute(
	gl: WebGL2RenderingContext,
	program: WebGLProgram,
	name: string,
	data: Float32Array
) {
	const location = gl.getAttribLocation(program, name)
	const buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

	gl.enableVertexAttribArray(location)
	gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)

	return { buffer }

	// gl.bufferData(gl.ARRAY_BUFFER, cube)
}
