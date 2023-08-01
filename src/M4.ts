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

	static multiplyM4(a: M4, b: M4) {
		/**
		 * x00 y00 z00 w00   x10 y10 z10 w10
		 * x01 y01 z01 w01   x11 y11 z11 w11
		 * x02 y02 z02 w02 x x12 y12 z12 w12
		 * x03 y03 z03 w03   x13 y13 z13 w13
		 */

		const newX0 = a.x0 * b.x0 + a.y0 * b.x1 + a.z0 * b.x2 + a.w0 * b.x3
		const newX1 = a.x1 * b.x0 + a.y1 * b.x1 + a.z1 * b.x2 + a.w1 * b.x3
		const newX2 = a.x2 * b.x0 + a.y2 * b.x1 + a.z2 * b.x2 + a.w2 * b.x3
		const newX3 = a.x3 * b.x0 + a.y3 * b.x1 + a.z3 * b.x2 + a.w3 * b.x3

		const newY0 = a.x0 * b.y0 + a.y0 * b.y1 + a.z0 * b.y2 + a.w0 * b.y3
		const newY1 = a.x1 * b.y0 + a.y1 * b.y1 + a.z1 * b.y2 + a.w1 * b.y3
		const newY2 = a.x2 * b.y0 + a.y2 * b.y1 + a.z2 * b.y2 + a.w2 * b.y3
		const newY3 = a.x3 * b.y0 + a.y3 * b.y1 + a.z3 * b.y2 + a.w3 * b.y3

		const newZ0 = a.x0 * b.z0 + a.y0 * b.z1 + a.z0 * b.z2 + a.w0 * b.z3
		const newZ1 = a.x1 * b.z0 + a.y1 * b.z1 + a.z1 * b.z2 + a.w1 * b.z3
		const newZ2 = a.x2 * b.z0 + a.y2 * b.z1 + a.z2 * b.z2 + a.w2 * b.z3
		const newZ3 = a.x3 * b.z0 + a.y3 * b.z1 + a.z3 * b.z2 + a.w3 * b.z3

		const newW0 = a.x0 * b.w0 + a.y0 * b.w1 + a.z0 * b.w2 + a.w0 * b.w3
		const newW1 = a.x1 * b.w0 + a.y1 * b.w1 + a.z1 * b.w2 + a.w1 * b.w3
		const newW2 = a.x2 * b.w0 + a.y2 * b.w1 + a.z2 * b.w2 + a.w2 * b.w3
		const newW3 = a.x3 * b.w0 + a.y3 * b.w1 + a.z3 * b.w2 + a.w3 * b.w3

		return new M4(
			newX0,
			newX1,
			newX2,
			newX3,
			newY0,
			newY1,
			newY2,
			newY3,
			newZ0,
			newZ1,
			newZ2,
			newZ3,
			newW0,
			newW1,
			newW2,
			newW3
		)
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
		 * 0, c,  -s, 0,
		 * 0, s, c, 0,
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
		 * -s 0 c 0
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
	static inverse(m4: M4) {
		var tx0 = m4.x0
		var tx1 = m4.x1
		var tx2 = m4.x2
		var tx3 = m4.x3
		var ty0 = m4.y0
		var ty1 = m4.y1
		var ty2 = m4.y2
		var ty3 = m4.y3
		var tz0 = m4.z0
		var tz1 = m4.z1
		var tz2 = m4.z2
		var tz3 = m4.z3
		var tw0 = m4.w0
		var tw1 = m4.w1
		var tw2 = m4.w2
		var tw3 = m4.w3
		var tmp_0 = tz2 * tw3
		var tmp_1 = tw2 * tz3
		var tmp_2 = ty2 * tw3
		var tmp_3 = tw2 * ty3
		var tmp_4 = ty2 * tz3
		var tmp_5 = tz2 * ty3
		var tmp_6 = tx2 * tw3
		var tmp_7 = tw2 * tx3
		var tmp_8 = tx2 * tz3
		var tmp_9 = tz2 * tx3
		var tmp_10 = tx2 * ty3
		var tmp_11 = ty2 * tx3
		var tmp_12 = tz0 * tw1
		var tmp_13 = tw0 * tz1
		var tmp_14 = ty0 * tw1
		var tmp_15 = tw0 * ty1
		var tmp_16 = ty0 * tz1
		var tmp_17 = tz0 * ty1
		var tmp_18 = tx0 * tw1
		var tmp_19 = tw0 * tx1
		var tmp_20 = tx0 * tz1
		var tmp_21 = tz0 * tx1
		var tmp_22 = tx0 * ty1
		var tmp_23 = ty0 * tx1

		var t0 =
			tmp_0 * ty1 +
			tmp_3 * tz1 +
			tmp_4 * tw1 -
			(tmp_1 * ty1 + tmp_2 * tz1 + tmp_5 * tw1)
		var t1 =
			tmp_1 * tx1 +
			tmp_6 * tz1 +
			tmp_9 * tw1 -
			(tmp_0 * tx1 + tmp_7 * tz1 + tmp_8 * tw1)
		var t2 =
			tmp_2 * tx1 +
			tmp_7 * ty1 +
			tmp_10 * tw1 -
			(tmp_3 * tx1 + tmp_6 * ty1 + tmp_11 * tw1)
		var t3 =
			tmp_5 * tx1 +
			tmp_8 * ty1 +
			tmp_11 * tz1 -
			(tmp_4 * tx1 + tmp_9 * ty1 + tmp_10 * tz1)

		var d = 1.0 / (tx0 * t0 + ty0 * t1 + tz0 * t2 + tw0 * t3)

		return new M4(
			d * t0,
			d * t1,
			d * t2,
			d * t3,
			d *
				(tmp_1 * ty0 +
					tmp_2 * tz0 +
					tmp_5 * tw0 -
					(tmp_0 * ty0 + tmp_3 * tz0 + tmp_4 * tw0)),
			d *
				(tmp_0 * tx0 +
					tmp_7 * tz0 +
					tmp_8 * tw0 -
					(tmp_1 * tx0 + tmp_6 * tz0 + tmp_9 * tw0)),
			d *
				(tmp_3 * tx0 +
					tmp_6 * ty0 +
					tmp_11 * tw0 -
					(tmp_2 * tx0 + tmp_7 * ty0 + tmp_10 * tw0)),
			d *
				(tmp_4 * tx0 +
					tmp_9 * ty0 +
					tmp_10 * tz0 -
					(tmp_5 * tx0 + tmp_8 * ty0 + tmp_11 * tz0)),
			d *
				(tmp_12 * ty3 +
					tmp_15 * tz3 +
					tmp_16 * tw3 -
					(tmp_13 * ty3 + tmp_14 * tz3 + tmp_17 * tw3)),
			d *
				(tmp_13 * tx3 +
					tmp_18 * tz3 +
					tmp_21 * tw3 -
					(tmp_12 * tx3 + tmp_19 * tz3 + tmp_20 * tw3)),
			d *
				(tmp_14 * tx3 +
					tmp_19 * ty3 +
					tmp_22 * tw3 -
					(tmp_15 * tx3 + tmp_18 * ty3 + tmp_23 * tw3)),
			d *
				(tmp_17 * tx3 +
					tmp_20 * ty3 +
					tmp_23 * tz3 -
					(tmp_16 * tx3 + tmp_21 * ty3 + tmp_22 * tz3)),
			d *
				(tmp_14 * tz2 +
					tmp_17 * tw2 +
					tmp_13 * ty2 -
					(tmp_16 * tw2 + tmp_12 * ty2 + tmp_15 * tz2)),
			d *
				(tmp_20 * tw2 +
					tmp_12 * tx2 +
					tmp_19 * tz2 -
					(tmp_18 * tz2 + tmp_21 * tw2 + tmp_13 * tx2)),
			d *
				(tmp_18 * ty2 +
					tmp_23 * tw2 +
					tmp_15 * tx2 -
					(tmp_22 * tw2 + tmp_14 * tx2 + tmp_19 * ty2)),
			d *
				(tmp_22 * tz2 +
					tmp_16 * tx2 +
					tmp_21 * ty2 -
					(tmp_20 * ty2 + tmp_23 * tz2 + tmp_17 * tx2))
		)
	}

	static perspective(fieldOfView: number, aspect: number, zNear: number, zFar: number) {
		const f = Math.tan(Math.PI * 0.5 - fieldOfView * 0.5)
		const rangeInv = 1.0 / (zNear - zFar)

		/**
		 * https://github.com/greggman/twgl.js/blob/master/src/m4.js#L347
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
			0, 0, (zNear+zFar)*rangeInv, -1,
			0, 0, zNear*zFar*rangeInv*2, 0
		)
	}
}
