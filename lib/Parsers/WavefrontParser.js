var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Resource, ResourceType, Exception } from '../Core';
import { DataType, vertexAttribute } from '../GL/Helpers';
import { Vector2, Vector3, Vector4 } from '../Math';
export class Vertex {
    constructor(position, normal, texcoord) {
        this.position = position;
        this.normal = normal;
        this.texcoord = texcoord;
    }
}
__decorate([
    vertexAttribute({ location: 0, type: DataType.Float32, normalized: false }),
    __metadata("design:type", Vector3)
], Vertex.prototype, "position", void 0);
__decorate([
    vertexAttribute({ location: 1, type: DataType.Int8, normalized: true }),
    __metadata("design:type", Vector3)
], Vertex.prototype, "normal", void 0);
__decorate([
    vertexAttribute({ location: 2, type: DataType.Int16, normalized: false }),
    __metadata("design:type", Vector2)
], Vertex.prototype, "texcoord", void 0);
var Token;
(function (Token) {
    Token["Vertex"] = "v";
    Token["Normal"] = "vn";
    Token["Texcoord"] = "vt";
    Token["Face"] = "f";
})(Token || (Token = {}));
class WavefrontParser {
    constructor() {
        this.raw = {
            [Token.Vertex]: [],
            [Token.Normal]: [],
            [Token.Texcoord]: [],
        };
        this.vertices = [];
        this.indices = [];
        this.hash = {}; // @todo Make this (and possibly others) `HashSet`-like
        this.index = 0;
    }
    async load(path) {
        let reader;
        try {
            reader = await Resource.load(path, ResourceType.OBJ);
        }
        catch (e) {
            throw new Exception(`WavefrontParser: failed to load '${path}'`, e);
        }
        for (let line of reader) {
            if (line[0] === '#') {
                continue;
            }
            const parts = line.split(' ');
            const token = parts.shift();
            switch (token) {
                case Token.Vertex:
                case Token.Normal:
                case Token.Texcoord:
                    this.raw[token].push(...parts.map((part) => +part));
                    break;
                case Token.Face:
                    this.parse(parts);
                    break;
            }
        }
    }
    parse(parts) {
        for (let i = 0; i < 3; i++) {
            const face = parts[i];
            if (face in this.hash) {
                this.indices.push(this.hash[face]);
                continue;
            }
            const vertex = face.split('/').map((v) => ((+v) - 1));
            // noinspection PointlessArithmeticExpressionJS
            const position = new Vector3(this.raw[Token.Vertex][(vertex[0] * 3) + 0], this.raw[Token.Vertex][(vertex[0] * 3) + 1], this.raw[Token.Vertex][(vertex[0] * 3) + 2]);
            // noinspection PointlessArithmeticExpressionJS
            const texcoord = new Vector2(this.raw[Token.Texcoord][(vertex[1] * 2) + 0], this.raw[Token.Texcoord][(vertex[1] * 2) + 1]);
            // noinspection PointlessArithmeticExpressionJS
            const normal = new Vector4(this.raw[Token.Normal][(vertex[2] * 3) + 0], this.raw[Token.Normal][(vertex[2] * 3) + 1], this.raw[Token.Normal][(vertex[2] * 3) + 2], 0);
            this.hash[face] = this.index;
            this.vertices.push(new Vertex(position, normal, texcoord));
            this.indices.push(this.index);
            this.index += 1;
        }
    }
}
export default WavefrontParser;
