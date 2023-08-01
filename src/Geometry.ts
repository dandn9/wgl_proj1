import { M4 } from './M4'
import { Vec3 } from './Vec3'

export class Geometry {
	components: Vec3[]

	constructor(components: Vec3[] | Array<number>) {
		if (components.length > 0 && components[0] instanceof Vec3) {
			this.components = components as Vec3[]
		} else {
			this.components = []
			const arr = components as Array<number>
			for (let i = 0; i < arr.length / 3; ++i) {
				this.components.push(
					new Vec3(arr[i * 3 + 0], arr[i * 3 + 1], arr[i * 3 + 2])
				)
			}
		}
	}
	toFloat32Array() {
		const f32A = new Float32Array(this.components.length * 3)
		for (let i = 0; i < this.components.length; ++i) {
			f32A[i * 3 + 0] = this.components[i].x
			f32A[i * 3 + 1] = this.components[i].y
			f32A[i * 3 + 2] = this.components[i].z
		}

		return f32A
	}

	public multiplyM4(m: M4) {
		this.components.forEach((c) => c.multiplyM4(m))
	}
	public copy() {
		new Geometry(this.components.map((c) => c.copy()))
	}
}
