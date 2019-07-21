import VertexAttribute from './GL/Helpers/VertexAttribute';
import Model from './Model';
import IndexBuffer from './GL/IndexBuffer';
import VertexBuffer from './GL/VertexBuffer';
import { Vector2 } from './Math';
class Vertex {
    constructor(position, texcoord) {
        this.position = new VertexAttribute(position);
        this.texcoord = new VertexAttribute(texcoord);
    }
}
class Quad extends Model {
    constructor() {
        super();
        this.name = 'Quad';
        this.indices = new IndexBuffer([3, 2, 1, 3, 1, 0]);
        this.vertices = new VertexBuffer([
            new Vertex(new Vector2(-1.0, +1.0), new Vector2(0.0, 1.0)),
            new Vertex(new Vector2(-1.0, -1.0), new Vector2(0.0, 0.0)),
            new Vertex(new Vector2(+1.0, -1.0), new Vector2(1.0, 0.0)),
            new Vertex(new Vector2(+1.0, +1.0), new Vector2(1.0, 1.0)),
        ]);
    }
}
export default Quad;
