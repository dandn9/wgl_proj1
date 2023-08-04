import { Geometry } from './Geometry'
import { Object3D } from './Object3D'

export class Primitive extends Object3D {
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
