import { Indexable } from '../Core/Helpers';
import { Vector2, Vector3, Vector4 } from '../Math';
export declare class Vertex implements Indexable<ArrayLike<number>> {
    readonly position: Vector3;
    readonly normal: Vector3;
    readonly texcoord: Vector2;
    constructor(position: Vector3, normal: Vector4, texcoord: Vector2);
    readonly [index: string]: ArrayLike<number>;
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
