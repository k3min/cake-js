import { VertexAttribute, DataType, PrimitiveType } from '../GL/Helpers';
import IndexBuffer from '../GL/IndexBuffer';
import VertexBuffer from '../GL/VertexBuffer';
import Mesh from '../GL/Mesh';
import { Indexable } from '../Core/Helpers';
import { Vector2 } from '../Math';

class Vertex implements Indexable<VertexAttribute> {
	public readonly position: VertexAttribute;

	public constructor(position: Vector2) {
		this.position = new VertexAttribute(position, DataType.Float32, false);
	}

	readonly [index: string]: VertexAttribute;
}

class Quad extends Mesh<Vertex> {
	public name: string = 'Quad';

	public constructor() {
		super();

		this.indexBuffer = new IndexBuffer([3, 2, 1, 3, 1, 0]);

		this.vertexBuffer = new VertexBuffer<Vertex>([
			new Vertex(new Vector2(-1.0, +1.0)),
			new Vertex(new Vector2(-1.0, -1.0)),
			new Vertex(new Vector2(+1.0, -1.0)),
			new Vertex(new Vector2(+1.0, +1.0)),
		]);
	}

	public draw(): void {
		super.draw(PrimitiveType.Triangles);
	}
}

export default Quad;