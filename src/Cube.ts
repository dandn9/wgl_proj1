import { Geometry } from './Geometry'
import { M4 } from './M4'
import { Primitive } from './Primitive'

export class Cube extends Primitive {
	m4: M4
	size: number
	vertexCount = 36
	declare vertexData: Geometry
	declare geometry: Geometry
	declare normals: Geometry

	constructor(size: number = 1) {
		super(
			Cube.defaultCubeGeometry(size),
			Cube.defaultNormals(),
			Cube.defaultVertexColors(),
			36
		)
		this.size = size
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
	private static defaultNormals() {
		// prettier-ignore
		return new Geometry([
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,

			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,

			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,

			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,

			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
		])
	}
	private static defaultVertexColors() {
		// prettier-ignore
		return new Geometry([
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

	private static defaultCubeGeometry(s: number) {
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
		geom.multiplyM4(M4.translate(-s / 2, -s / 2, s / 2))
		return geom
	}
}
