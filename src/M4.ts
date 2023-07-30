/**
 * x0 y0 z0 w0
 * x1 y1 z1 w1
 * x2 y2 z2 w2
 * x3 y3 z3 w3
 */
export class M4 {
	private constructor(
		public x0: number,
		public x1: number,
		public x2: number,
		public x3: number,
		public y0: number,
		public y1: number,
		public y2: number,
		public y3: number,
		public z0: number,
		public z1: number,
		public z2: number,
		public z3: number,
		public w0: number,
		public w1: number,
		public w2: number,
		public w3: number
	) {}

	public multiplyM4(m4: M4) {
		/**
		 * x00 y00 z00 w00   x10 y10 z10 w10
		 * x01 y01 z01 w01   x11 y11 z11 w11
		 * x02 y02 z02 w02 x x12 y12 z12 w12
		 * x03 y03 z03 w03   x13 y13 z13 w13
		 */

		const newX0 =
			this.x0 * m4.x0 + this.y0 * m4.x1 + this.z0 * m4.x2 + this.w0 * m4.x3
		const newX1 =
			this.x1 * m4.x0 + this.y1 * m4.x1 + this.z1 * m4.x2 + this.w1 * m4.x3
		const newX2 =
			this.x2 * m4.x0 + this.y2 * m4.x1 + this.z2 * m4.x2 + this.w2 * m4.x3
		const newX3 =
			this.x3 * m4.x0 + this.y3 * m4.x1 + this.z3 * m4.x2 + this.w3 * m4.x3

		const newY0 =
			this.x0 * m4.y0 + this.y0 * m4.y1 + this.z0 * m4.y2 + this.w0 * m4.y3
		const newY1 =
			this.x1 * m4.y0 + this.y1 * m4.y1 + this.z1 * m4.y2 + this.w1 * m4.y3
		const newY2 =
			this.x2 * m4.y0 + this.y2 * m4.y1 + this.z2 * m4.y2 + this.w2 * m4.y3
		const newY3 =
			this.x3 * m4.y0 + this.y3 * m4.y1 + this.z3 * m4.y2 + this.w3 * m4.y3

		const newZ0 =
			this.x0 * m4.z0 + this.y0 * m4.z1 + this.z0 * m4.z2 + this.w0 * m4.z3
		const newZ1 =
			this.x1 * m4.z0 + this.y1 * m4.z1 + this.z1 * m4.z2 + this.w1 * m4.z3
		const newZ2 =
			this.x2 * m4.z0 + this.y2 * m4.z1 + this.z2 * m4.z2 + this.w2 * m4.z3
		const newZ3 =
			this.x3 * m4.z0 + this.y3 * m4.z1 + this.z3 * m4.z2 + this.w3 * m4.z3

		const newW0 =
			this.x0 * m4.w0 + this.y0 * m4.w1 + this.z0 * m4.w2 + this.w0 * m4.w3
		const newW1 =
			this.x1 * m4.w0 + this.y1 * m4.w1 + this.z1 * m4.w2 + this.w1 * m4.w3
		const newW2 =
			this.x2 * m4.w0 + this.y2 * m4.w1 + this.z2 * m4.w2 + this.w2 * m4.w3
		const newW3 =
			this.x3 * m4.w0 + this.y3 * m4.w1 + this.z3 * m4.w2 + this.w3 * m4.w3

		this.x0 = newX0
		this.x1 = newX1
		this.x2 = newX2
		this.x3 = newX3

		this.y0 = newY0
		this.y1 = newY1
		this.y2 = newY2
		this.y3 = newY3

		this.z0 = newZ0
		this.z1 = newZ1
		this.z2 = newZ2
		this.z3 = newZ3

		this.w0 = newW0
		this.w1 = newW1
		this.w2 = newW2
		this.w3 = newW3
	}

	static identity() {
		// prettier-ignore
		return new M4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		)
	}
	static translate(tx: number, ty: number, tz: number) {
		/**
		 * 1  0  0  tx
		 * 0  1  0  ty
		 * 0  0  1  tz
		 * 0  0  0  1
		 */

		// prettier-ignore
		return new M4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			tx, ty, tz, 1)
	}
	static rotationX(angle: number) {
		/**
		 * c = Math.cos(angleInRadians)
		 * s = Math.sin(angleInRadians)
		 *
		 * 1, 0,  0, 0,
		 * 0, c,  s, 0,
		 * 0, -s, c, 0,
		 * 0, 0,  0, 1
		 */
		const c = Math.cos(angle)
		const s = Math.sin(angle)

		// prettier-ignore
		return new M4(
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1
		)
	}
	static rotationY(angle: number) {
		/**
		 * c = cos
		 * s = sin
		 *
		 * c 0 s 0
		 * 0 1 0 0
		 * s 0 -c 0
		 * 0 0 0 1
		 */
		const c = Math.cos(angle)
		const s = Math.sin(angle)
		// prettier-ignore
		return new M4(
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1)
	}
	static rotationZ(angle: number) {
		/**
		 * c = cos
		 * s = sin
		 *
		 * c -s 0 0
		 * s  c  0 0
		 * 0  0  1 0
		 * 0  0  0 1
		 */
		const c = Math.cos(angle)
		const s = Math.sin(angle)
		// prettier-ignore
		return new M4(
			c, s, 0,  0,
			-s,c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		)
	}
	static scale(sx: number, sy: number, sz: number) {
		/**
		 * sx 0 0 0
		 * 0 sy 0 0
		 * 0 0 sz 0
		 * 0 0 0 1
		 */

		// prettier-ignore
		return new M4(
			sx,0, 0, 0,
			0, sy, 0, 0,
			0, 0, sz, 0,
			0, 0, 0, 1)
	}
	public toFloat32Array() {
		// prettier-ignore
		return new Float32Array([
			this.x0, this.x1, this.x2, this.x3,
			this.y0, this.y1, this.y2, this.y3,
			this.z0, this.z1, this.z2, this.z3,
			this.w0, this.w1, this.w2, this.w3,
		])
	}

	static perspective(fieldOfView: number, aspect: number, zNear: number, zFar: number) {
		const f = 1 / Math.tan(fieldOfView * 0.5)

		/**
		 * https://www.youtube.com/watch?v=ih20l3pJoeU
		 * f/aspect  0  0                              0
		 * 0         f  0                              0
		 * 0         0  zFar / zFar-zNear              1
		 * 0         0  -Zfar * zNear / zFar - zNear   0
		 */

		// prettier-ignore
		return new M4(
			f/aspect, 0, 0, 0,
			0, f, 0, 0,
			0, 0, zFar / (zFar-zNear), (zFar * zNear) / (zFar-zNear),
			0, 0, 1, 0
		)
	}
}
