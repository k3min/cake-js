import VertexAttribute from './GL/Helpers/VertexAttribute';
import { gl } from './index';
import Model from './Model';
import IndexBuffer from './GL/IndexBuffer';
import VertexBuffer from './GL/VertexBuffer';
import Vector2 from './Math/Vector2';
class Vertex {
    constructor(position, texcoord) {
        this.position = new VertexAttribute(position, gl.FLOAT, false, true);
        this.texcoord = new VertexAttribute(texcoord, gl.UNSIGNED_SHORT, true, true);
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
