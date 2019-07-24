import { VertexAttribute } from '../GL/Helpers';
import { Indexable } from '../Helpers';
import { Vector2, Vector3 } from '../Math';
export declare class Vertex implements Indexable<VertexAttribute> {
    readonly position: VertexAttribute<Vector3>;
    readonly texcoord: VertexAttribute<Vector2>;
    readonly normal: VertexAttribute<Vector3>;
    constructor(position: Vector3, texcoord: Vector2, normal: Vector3);
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
