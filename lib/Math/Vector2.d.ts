import Vector, { X } from './Vector';
declare class Vector2 extends Vector {
    static readonly LENGTH = 2;
    static readonly zero: Vector2;
    static readonly one: Vector2;
    static readonly right: Vector2;
    static readonly left: Vector2;
    static readonly up: Vector2;
    static readonly down: Vector2;
    constructor(x: Vector2 | X, y?: number);
    clone(): Vector2;
}
export default Vector2;
