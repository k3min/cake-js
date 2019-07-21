import { Indexable } from './GL/Helpers/VertexArrayBuffer';
import VertexAttribute from './GL/Helpers/VertexAttribute';
import Model from './Model';
import IndexBuffer from './GL/IndexBuffer';
import VertexBuffer from './GL/VertexBuffer';
import { Vector2 } from './Math';

class Vertex implements Indexable {
	public readonly position: VertexAttribute<Vector2>;
	public readonly texcoord: VertexAttribute<Vector2>;

	public constructor(position: Vector2, texcoord: Vector2) {
		this.position = new VertexAttribute<Vector2>(position);
		this.texcoord = new VertexAttribute<Vector2>(texcoord);
	}

	[index: string]: VertexAttribute<ArrayLike<number>>;
}

class Quad extends Model<Vertex> {
	public name: string = 'Quad';

	public constructor() {
		super();

		this.indices = new IndexBuffer([3, 2, 1, 3, 1, 0]);

		this.vertices = new VertexBuffer<Vertex>([
			new Vertex(new Vector2(-1.0, +1.0), new Vector2(0.0, 1.0)),
			new Vertex(new Vector2(-1.0, -1.0), new Vector2(0.0, 0.0)),
			new Vertex(new Vector2(+1.0, -1.0), new Vector2(1.0, 0.0)),
			new Vertex(new Vector2(+1.0, +1.0), new Vector2(1.0, 1.0)),
		]);
	}
}

export default Quad;