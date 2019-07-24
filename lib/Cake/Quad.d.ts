import { VertexAttribute } from '../GL/Helpers';
import { Mesh } from '../GL';
import { Indexable } from '../Helpers';
import { Vector2 } from '../Math';
declare class Vertex implements Indexable<VertexAttribute> {
    readonly position: VertexAttribute;
    readonly texcoord: VertexAttribute;
    constructor(position: Vector2, texcoord: Vector2);
    readonly [index: string]: VertexAttribute;
}
declare class Quad extends Mesh<Vertex> {
    name: string;
    constructor();
}
export default Quad;
