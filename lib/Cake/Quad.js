import { VertexAttribute, DataType } from '../GL/Helpers';
import { Mesh, IndexBuffer, VertexBuffer } from '../GL';
import { Vector2 } from '../Math';
class Vertex {
    constructor(position, texcoord) {
        this.position = new VertexAttribute(position, DataType.Float32, false);
        this.texcoord = new VertexAttribute(texcoord, DataType.Uint16, true);
    }
}
class Quad extends Mesh {
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
