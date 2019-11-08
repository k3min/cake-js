import { Indexable } from '../Core/Helpers';
import Mesh from '../GL/Mesh';
import { Vector2 } from '../Math';
declare class Vertex implements Indexable<ArrayLike<number>> {
    readonly position: Vector2;
    constructor(x: number, y: number);
    readonly [index: string]: ArrayLike<number>;
}
declare class Quad extends Mesh<Vertex> {
    name: string;
    constructor();
}
export default Quad;
