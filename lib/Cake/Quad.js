import { VertexAttribute, DataType, PrimitiveType } from '../GL/Helpers';
import IndexBuffer from '../GL/IndexBuffer';
import VertexBuffer from '../GL/VertexBuffer';
import Mesh from '../GL/Mesh';
import { Vector2 } from '../Math';
class Vertex {
    constructor(position) {
        this.position = new VertexAttribute(position, DataType.Float32, false);
    }
}
class Quad extends Mesh {
    constructor() {
        super();
        this.name = 'Quad';
        this.indexBuffer = new IndexBuffer([3, 2, 1, 3, 1, 0]);
        this.vertexBuffer = new VertexBuffer([
            new Vertex(new Vector2(-1.0, +1.0)),
            new Vertex(new Vector2(-1.0, -1.0)),
            new Vertex(new Vector2(+1.0, -1.0)),
            new Vertex(new Vector2(+1.0, +1.0)),
        ]);
    }
    draw() {
        super.draw(PrimitiveType.Triangles);
    }
}
export default Quad;