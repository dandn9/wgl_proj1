import { M4 } from './M4'
import { Vec3 } from './Vec3'

export class Object3D {
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
	get translation() {
		return new Vec3(this.m4.w0, this.m4.w1, this.m4.w2)
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
