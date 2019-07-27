import { Resource, ResourceType, Exception } from '../Core';
import { VertexAttribute, DataType } from '../GL/Helpers';
import { Vector2, Vector3, Vector4 } from '../Math';
export class Vertex {
    constructor(position, normal, texcoord) {
        this.position = new VertexAttribute(position, DataType.Float32, false);
        this.normal = new VertexAttribute(normal, DataType.Int8, true);
        this.texcoord = new VertexAttribute(texcoord, DataType.Int16, false);
    }
}
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
