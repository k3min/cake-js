import { Indexable } from '../Core/Helpers';
import { PrimitiveType } from '../GL/Helpers';
import Mesh from '../GL/Mesh';
import { Vector3 } from '../Math';
declare class Vertex implements Indexable<ArrayLike<number>> {
    readonly position: Vector3;
    constructor(position: Vector3);
    readonly [index: string]: ArrayLike<number>;
}
declare class Line extends Mesh<Vertex> {
    name: string;
    constructor(...points: Vector3[]);
    draw(type?: PrimitiveType): void;
}
export default Line;
