import DataType from '../GL/Helpers/DataType';
import VertexAttribute from '../GL/Helpers/VertexAttribute';
import IndexBuffer from '../GL/IndexBuffer';
import VertexBuffer from '../GL/VertexBuffer';
import Vector2 from '../Math/Vector2';
import Model from '../GL/Model';
class Vertex {
    constructor(position, texcoord) {
        this.position = new VertexAttribute(position, DataType.Float32, false);
        this.texcoord = new VertexAttribute(texcoord, DataType.Uint16, true);
    }
}
class Quad extends Model {
    constructor() {
        super();
        this.name = 'Quad';
        this.indexBuffer = new IndexBuffer([3, 2, 1, 3, 1, 0]);
        this.vertexBuffer = new VertexBuffer([
            new Vertex(new Vector2(-1.0, +1.0), new Vector2(0.0, 1.0)),
            new Vertex(new Vector2(-1.0, -1.0), new Vector2(0.0, 0.0)),
            new Vertex(new Vector2(+1.0, -1.0), new Vector2(1.0, 0.0)),
            new Vertex(new Vector2(+1.0, +1.0), new Vector2(1.0, 1.0)),
        ]);
    }
}
export default Quad;
