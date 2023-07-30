import { M4 } from './M4'

export class Vec4F {
	public components: number[][]

	// always supply a 3 size component, the 4th will be set to 1
	constructor(array: Array<number>) {
		if (array.length % 3 !== 0) throw new Error('Provide a size 3 component')
		this.components = []

		for (let i = 0; i < array.length / 3; ++i) {
			this.components[i] = []
			this.components[i][0] = array[i * 3 + 0]
			this.components[i][1] = array[i * 3 + 1]
			this.components[i][2] = array[i * 3 + 2]
			this.components[i][3] = 1
		}
	}

	toFloat32Array() {
		const f32A = new Float32Array(this.components.length * 4)
		for (let i = 0; i < this.components.length; ++i) {
			f32A[i * 4 + 0] = this.components[i][0]
			f32A[i * 4 + 1] = this.components[i][1]
			f32A[i * 4 + 2] = this.components[i][2]
			f32A[i * 4 + 3] = this.components[i][3]
		}

		return f32A
	}

	multiplyM4(m4: M4) {
		for (let i = 0; i < this.components.length; ++i) {
			this.multiplyComponentToMatrix(this.components[i], m4)
		}
		return this
	}
	multiplyComponentToMatrix(component: number[], m4: M4) {
		/**
		 * x0 y0 z0 w0    vx
		 * x1 y1 z1 w1    vy
		 * x2 y2 z2 w2  x vz
		 * x3 y3 z3 w3    vw
		 *
		 */

		const newX =
			component[0] * m4.x0 +
			component[1] * m4.y0 +
			component[2] * m4.z0 +
			component[3] * m4.w0

		const newY =
			component[0] * m4.x1 +
			component[1] * m4.y1 +
			component[2] * m4.z1 +
			component[3] * m4.w1

		const newZ =
			component[0] * m4.x2 +
			component[1] * m4.y2 +
			component[2] * m4.z2 +
			component[3] * m4.w2

		const newW =
			component[0] * m4.x3 +
			component[1] * m4.y3 +
			component[2] * m4.z3 +
			component[3] * m4.w3

		component[0] = newX
		component[1] = newY
		component[2] = newZ
		component[3] = newW

		if (newW != 0) {
			component[0] = component[0] / newW
			component[1] = component[1] / newW
			component[2] = component[2] / newW
			component[3] = 1
		}
	}
}
