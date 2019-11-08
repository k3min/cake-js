var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrimitiveType, vertexAttribute } from '../GL/Helpers';
import DataType from '../GL/Helpers/DataType';
import Mesh from '../GL/Mesh';
import VertexBuffer from '../GL/VertexBuffer';
import { Vector3 } from '../Math';
class Vertex {
    constructor(position) {
        this.position = position;
    }
}
__decorate([
    vertexAttribute({ location: 0, type: DataType.Float32, normalized: false }),
    __metadata("design:type", Vector3)
], Vertex.prototype, "position", void 0);
class Line extends Mesh {
    constructor(...points) {
        super();
        this.name = 'Line';
        this.vertexBuffer = new VertexBuffer(points.map((point) => new Vertex(point.copy())));
    }
    draw(type = PrimitiveType.Lines) {
        super.draw(type);
    }
}
export default Line;
