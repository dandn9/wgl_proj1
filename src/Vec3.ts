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

	multiplyM4(m: M4) {
		const nx = this.x * m.x0 + this.y * m.y0 + this.z * m.z0 + 1 * m.w0
		const ny = this.x * m.x1 + this.y * m.y1 + this.z * m.z1 + 1 * m.w1
		const nz = this.x * m.x2 + this.y * m.y2 + this.z * m.z2 + 1 * m.w2

		this.x = nx
		this.y = ny
		this.z = nz
	}
	public copy() {
		return new Vec3(this.x, this.y, this.z)
	}
}
