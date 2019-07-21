import { Indexable } from './GL/Helpers/VertexArrayBuffer';
import VertexAttribute from './GL/Helpers/VertexAttribute';
import Model from './Model';
import { Vector2 } from './Math';
declare class Vertex implements Indexable {
    readonly position: VertexAttribute<Vector2>;
    readonly texcoord: VertexAttribute<Vector2>;
    constructor(position: Vector2, texcoord: Vector2);
    [index: string]: VertexAttribute<ArrayLike<number>>;
}
declare class Quad extends Model<Vertex> {
    name: string;
    constructor();
}
export default Quad;
