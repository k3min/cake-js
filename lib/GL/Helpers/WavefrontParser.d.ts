import Indexable from '../../Helpers/Indexable';
import VertexAttribute from './VertexAttribute';
import Vector2 from '../../Math/Vector2';
import Vector3 from '../../Math/Vector3';
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
