import { VertexAttribute } from '../GL/Helpers';
import { Indexable } from '../Core/Helpers';
import { Vector2, Vector3 } from '../Math';
import Vector4 from '../Math/Vector4';
export declare class Vertex implements Indexable<VertexAttribute> {
    readonly vertex: VertexAttribute<Vector3>;
    readonly normal: VertexAttribute<Vector3>;
    readonly texcoord: VertexAttribute<Vector2>;
    constructor(vertex: Vector3, normal: Vector4, texcoord: Vector2);
    readonly [index: string]: VertexAttribute;
}
declare class WavefrontParser {
    private readonly raw;
    readonly vertices: Vertex[];
    readonly indices: number[];
    private readonly hash;
    private index;
    load(path: string): Promise<void>;
    private parse;
}
export default WavefrontParser;
