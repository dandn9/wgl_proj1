import { Geometry } from './Geometry'
import { M4 } from './M4'
import { Primitive } from './Primitive'

export class Plane extends Primitive {
	m4: M4
	declare geometry: Geometry
	declare normals: Geometry
	declare vertexData: Geometry
	vertexCount: number
	width: number
	height: number

	constructor(width: number = 5, height: number = 5) {
		super(
			Plane.defaultPlaneGeometry(width, height),
			Plane.defaultPlaneNormals(),
			Plane.defaultVertexData(),
			6
		)
		this.m4 = M4.identity()
		this.width = width
		this.height = height
		this.vertexCount = 6
	}

	private static defaultPlaneNormals() {
		return new Geometry([
			0, 1, 0, 0, 1, 0, 0, 1, 0,

			0, 1, 0, 0, 1, 0, 0, 1, 0,
		])
	}
	private static defaultVertexData() {
		// prettier-ignore
		return new Geometry([
            0.4,0.4,0.4,
            0.4,0.4,0.4,
            0.4,0.4,0.4,

            0.4,0.4,0.4,
            0.4,0.4,0.4,
            0.4,0.4,0.4,
        ])
	}
	private static defaultPlaneGeometry(width: number, height: number) {
		const hWidth = width / 2
		const hHeight = height / 2

		// prettier-ignore
		return new Geometry(
            [
                -hWidth, 0, hHeight,
                hWidth, 0, hHeight,
                -hWidth, 0, -hHeight,

                -hWidth, 0, -hHeight,
                hWidth, 0, hHeight,
                hWidth, 0, -hHeight

            ]
        )
	}
}
