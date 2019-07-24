import DataType from './DataType';
import Resource, { ResourceType } from '../../Helpers/Resource';
import VertexAttribute from './VertexAttribute';
import Vector2 from '../../Math/Vector2';
import Vector3 from '../../Math/Vector3';
var Token;
(function (Token) {
    Token["Vertex"] = "v";
    Token["Texcoord"] = "vt";
    Token["Normal"] = "vn";
    Token["Face"] = "f";
})(Token || (Token = {}));
export class Vertex {
    constructor(position, texcoord, normal) {
        this.position = new VertexAttribute(position);
        this.texcoord = new VertexAttribute(texcoord, DataType.Int8, true);
        this.normal = new VertexAttribute(normal, DataType.Uint16, true);
    }
}
class WavefrontParser {
    constructor() {
        this.raw = {
            [Token.Vertex]: [],
            [Token.Texcoord]: [],
            [Token.Normal]: [],
        };
        this.vertices = [];
        this.indices = [];
        this.hash = {};
        this.index = 0;
    }
    async load(path) {
        const reader = await Resource.load(path, ResourceType.OBJ);
        for (let line of reader) {
            const parts = line.split(' ');
            const token = parts.shift();
            switch (token) {
                case Token.Vertex:
                case Token.Texcoord:
                case Token.Normal:
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
            const normal = new Vector3(this.raw[Token.Normal][(vertex[2] * 3) + 0], this.raw[Token.Normal][(vertex[2] * 3) + 1], this.raw[Token.Normal][(vertex[2] * 3) + 2]);
            this.hash[face] = this.index;
            this.vertices.push(new Vertex(position, texcoord, normal));
            this.indices.push(this.index);
            this.index += 1;
        }
    }
}
export default WavefrontParser;
