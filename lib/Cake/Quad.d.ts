import { VertexAttribute } from '../GL/Helpers';
import Mesh from '../GL/Mesh';
import { Indexable } from '../Core/Helpers';
import { Vector2 } from '../Math';
declare class Vertex implements Indexable<VertexAttribute> {
    readonly position: VertexAttribute;
    constructor(position: Vector2);
    readonly [index: string]: VertexAttribute;
}
declare class Quad extends Mesh<Vertex> {
    name: string;
    constructor();
    draw(): void;
}
export default Quad;
