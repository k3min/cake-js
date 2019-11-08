import { Indexable } from '../Core/Helpers';
import { PrimitiveType, vertexAttribute } from '../GL/Helpers';
import DataType from '../GL/Helpers/DataType';
import Mesh from '../GL/Mesh';
import VertexBuffer from '../GL/VertexBuffer';
import { Vector3 } from '../Math';

class Vertex implements Indexable<ArrayLike<number>> {
	@vertexAttribute({ location: 0, type: DataType.Float32, normalized: false })
	public readonly position: Vector3;

	public constructor(position: Vector3) {
		this.position = position;
	}

	readonly [index: string]: ArrayLike<number>;
}

class Line extends Mesh<Vertex> {
	public name: string = 'Line';

	public constructor(...points: Vector3[]) {
		super();

		this.vertexBuffer = new VertexBuffer<Vertex>(points.map((point: Vector3): Vertex => new Vertex(point.copy())));
	}

	public draw(type: PrimitiveType = PrimitiveType.Lines): void {
		super.draw(type);
	}
}

export default Line;