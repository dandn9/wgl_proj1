import { Geometry } from './Geometry'
import { M4 } from './M4'

export class Movable {
	m4: M4
	constructor() {
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
	public translate(tx: number, ty: number, tz: number) {
		this.m4 = M4.multiplyM4(this.m4, M4.translate(tx, ty, tz))
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
}
export class Primitive extends Movable {
	geometry: Geometry
	normals: Geometry
	vertexData: Geometry
	vertexCount: number

	constructor(
		geometry: Geometry,
		normals: Geometry,
		vertexData: Geometry,
		vertexCount: number
	) {
		super()
		this.geometry = geometry
		this.normals = normals
		this.vertexData = vertexData
		this.vertexCount = vertexCount
	}
}
