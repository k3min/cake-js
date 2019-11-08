var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { vertexAttribute } from '../GL/Helpers';
import DataType from '../GL/Helpers/DataType';
import IndexBuffer from '../GL/IndexBuffer';
import Mesh from '../GL/Mesh';
import VertexBuffer from '../GL/VertexBuffer';
import { Vector2 } from '../Math';
class Vertex {
    constructor(x, y) {
        this.position = new Vector2(x, y);
    }
}
__decorate([
    vertexAttribute({ location: 0, type: DataType.Float32, normalized: false }),
    __metadata("design:type", Vector2)
], Vertex.prototype, "position", void 0);
class Quad extends Mesh {
    constructor() {
        super();
        this.name = 'Quad';
        this.indexBuffer = new IndexBuffer([3, 2, 1, 3, 1, 0]);
        this.vertexBuffer = new VertexBuffer([
            new Vertex(-1.0, +1.0),
            new Vertex(-1.0, -1.0),
            new Vertex(+1.0, -1.0),
            new Vertex(+1.0, +1.0),
        ]);
    }
}
export default Quad;
