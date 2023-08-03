import { M4 } from './M4'

export class Vec3 {
	x: number
	y: number
	z: number

	constructor(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z
	}

	*[Symbol.iterator]() {
		yield this.x
		yield this.y
		yield this.z
	}

	multiplyM4(m: M4) {
		const nx = this.x * m.x0 + this.y * m.y0 + this.z * m.z0 + 1 * m.w0
		const ny = this.x * m.x1 + this.y * m.y1 + this.z * m.z1 + 1 * m.w1
		const nz = this.x * m.x2 + this.y * m.y2 + this.z * m.z2 + 1 * m.w2

		this.x = nx
		this.y = ny
		this.z = nz

		return this
	}
	static cross(a: Vec3, b: Vec3) {
		return new Vec3(
			a.y * b.z - a.z * b.y,
			a.z * b.x - a.x * b.z,
			a.x * b.y - a.y * b.x
		)
	}
	subtractV3(v3: Vec3) {
		this.x = this.x - v3.x
		this.y = this.y - v3.y
		this.z = this.z - v3.z

		return this
	}
	dot(v3: Vec3): number {
		return this.x * v3.x + this.y * v3.y + this.z * v3.z
	}
	normalize() {
		// we square it so we get the abs len
		const lenSq = this.x * this.x + this.y * this.y + this.z * this.z
		const len = Math.sqrt(lenSq)

		if (len > 0.00001) {
			this.x = this.x / len
			this.y = this.y / len
			this.z = this.z / len
		} else {
			this.x = 0
			this.y = 0
			this.z = 0
		}

		return this
	}
	public copy() {
		return new Vec3(this.x, this.y, this.z)
	}
}
