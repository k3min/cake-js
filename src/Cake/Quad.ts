import { Indexable } from '../Core/Helpers';
import { vertexAttribute } from '../GL/Helpers';
import DataType from '../GL/Helpers/DataType';
import IndexBuffer from '../GL/IndexBuffer';
import Mesh from '../GL/Mesh';
import VertexBuffer from '../GL/VertexBuffer';
import { Vector2 } from '../Math';

class Vertex implements Indexable<ArrayLike<number>> {
	@vertexAttribute({ location: 0, type: DataType.Float32, normalized: false })
	public readonly position: Vector2;

	public constructor(x: number, y: number) {
		this.position = new Vector2(x, y);
	}

	readonly [index: string]: ArrayLike<number>;
}

class Quad extends Mesh<Vertex> {
	public name: string = 'Quad';

	public constructor() {
		super();

		this.indexBuffer = new IndexBuffer([3, 2, 1, 3, 1, 0]);

		this.vertexBuffer = new VertexBuffer<Vertex>([
			new Vertex(-1.0, +1.0),
			new Vertex(-1.0, -1.0),
			new Vertex(+1.0, -1.0),
			new Vertex(+1.0, +1.0),
		]);
	}
}

export default Quad;