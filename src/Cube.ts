import { Geometry } from './Geometry'
import { M4 } from './M4'

export class Cube {
	m4: M4
	size: number
	geometry: Geometry
	vertex_color: Float32Array
	centered: boolean

	constructor(size: number = 1, centered = true, vertex_color?: Float32Array) {
		this.size = size
		this.centered = centered

		this.geometry = this.createCubeGeometry(size)
		this.vertex_color = vertex_color ?? this.defaultVertexColors()

		this.m4 = M4.identity()
	}
	public translateX(tx: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.translate(tx, 0, 0))
	}
	public translateZ(tz: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.translate(0, 0, tz))
	}
	public translateY(ty: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.translate(0, ty, 0))
	}

	public rotateY(d: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.rotationY(d))
	}
	public rotateZ(d: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.rotationZ(d))
	}
	public rotateX(d: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.rotationX(d))
	}
	private defaultVertexColors() {
		// prettier-ignore
		return new Float32Array([
            // front face
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,

            //face left
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,

		// face down
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,

            // face right
            0.5,0.5,0,
            0.5,0.5,0,
            0.5,0.5,0,
            0.5,0.5,0,
            0.5,0.5,0,
            0.5,0.5,0,

            // face up
            0,0.5,0.5,
            0,0.5,0.5,
            0,0.5,0.5,
            0,0.5,0.5,
            0,0.5,0.5,
            0,0.5,0.5,

            // face back
            0.5,0.5,0.5,
            0.5,0.5,0.5,
            0.5,0.5,0.5,
            0.5,0.5,0.5,
            0.5,0.5,0.5,
            0.5,0.5,0.5,
        ])
	}

	private createCubeGeometry(s: number) {
		if (!(s > 0)) throw new Error('Cant create negative length cube')

		// prettier-ignore
		const vertices =  [
            // front face
        0,0,0,
		s,0,0,
		0,s,0,

		s,0,0,
		s,s,0,
		0,s,0,

		// face left
		0,s,-s,
		0,0,0,
		0,s,0,

		0,0,0,
		0,s,-s,
		0,0,-s,

		// face down
		s,0,-s,
		0,0,0,
		0,0,-s,

		0,0,0,
		s,0,-s,
		s,0, 0,

		// face right
		s, s , 0,
		s, 0, -s,
		s, s, -s,

		s, 0, 0,
		s, 0, -s,
		s, s, 0,

		// face up
		0, s, 0, 
		s, s, 0,
		0, s, -s,

		s, s, 0,
		s, s, -s,
		0, s, -s,

		// face back
		0, s, -s,
		s, 0, -s,
		0, 0, -s,

		s, s, -s,
		s, 0, -s,
		0, s, -s

	]

		const geom = new Geometry(vertices)
		if (this.centered) {
			geom.multiplyM4(M4.translate(-s / 2, -s / 2, s / 2))
		}
		return geom
	}
}
