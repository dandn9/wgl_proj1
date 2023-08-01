import { M4 } from './M4'

export class Camera {
	m4: M4
	canvas: HTMLCanvasElement
	isEngaged: boolean

	constructor() {
		// by default the camera is a bit distant so that it can see objects on the origin
		this.m4 = M4.translate(0, 0, 10)
		this.canvas = document.querySelector('#main-canvas') as HTMLCanvasElement
		this.isEngaged = false

		this.setupCameraEvents()
	}
	setupCameraEvents() {
		console.log(this.canvas)
		window.addEventListener('keypress', (ev) => {
			const movement = [0, 0, 0]
			const mult = 0.5
			console.log(ev)
			switch (ev.key.toLowerCase()) {
				case 'a':
					movement[0] -= 1 * mult
					break
				case 'd':
					movement[0] += 1 * mult
					break
				case 'e':
					movement[1] += 1 * mult
					break
				case 'q':
					movement[1] -= 1 * mult
					break
				case 'w':
					movement[2] -= 1 * mult
					break
				case 's':
					movement[2] += 1 * mult
					break
				case 'f':
					this.isEngaged = !this.isEngaged
					break
			}
			this.translate(movement[0], movement[1], movement[2])
		})

		this.canvas.addEventListener('mousemove', (ev) => {
			// only move if it is engaged (pressing F)
			if (!this.isEngaged) return
			console.log(this.isEngaged)
			const mult = 0.002

			this.rotateX(ev.movementY * mult)
			this.rotateY(ev.movementX * mult)
		})
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
}
