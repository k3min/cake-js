import VertexAttribute from '../GL/Helpers/VertexAttribute';
import Indexable from '../Helpers/Indexable';
import Vector2 from '../Math/Vector2';
import Model from '../GL/Model';
declare class Vertex implements Indexable<VertexAttribute> {
    readonly position: VertexAttribute;
    readonly texcoord: VertexAttribute;
    constructor(position: Vector2, texcoord: Vector2);
    readonly [index: string]: VertexAttribute;
}
declare class Quad extends Model<Vertex> {
    name: string;
    constructor();
}
export default Quad;
