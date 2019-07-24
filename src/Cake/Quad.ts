import DataType from '../GL/Helpers/DataType';
import VertexAttribute from '../GL/Helpers/VertexAttribute';
import IndexBuffer from '../GL/IndexBuffer';
import VertexBuffer from '../GL/VertexBuffer';
import Indexable from '../Helpers/Indexable';
import Vector2 from '../Math/Vector2';
import Model from '../GL/Model';

class Vertex implements Indexable<VertexAttribute> {
	public readonly position: VertexAttribute;
	public readonly texcoord: VertexAttribute;

	public constructor(position: Vector2, texcoord: Vector2) {
		this.position = new VertexAttribute(position, DataType.Float32, false);
		this.texcoord = new VertexAttribute(texcoord, DataType.Uint16, true);
	}

	readonly [index: string]: VertexAttribute;
}

class Quad extends Model<Vertex> {
	public name: string = 'Quad';

	public constructor() {
		super();

		this.indexBuffer = new IndexBuffer([3, 2, 1, 3, 1, 0]);

		this.vertexBuffer = new VertexBuffer<Vertex>([
			new Vertex(new Vector2(-1.0, +1.0), new Vector2(0.0, 1.0)),
			new Vertex(new Vector2(-1.0, -1.0), new Vector2(0.0, 0.0)),
			new Vertex(new Vector2(+1.0, -1.0), new Vector2(1.0, 0.0)),
			new Vertex(new Vector2(+1.0, +1.0), new Vector2(1.0, 1.0)),
		]);
	}
}

export default Quad;