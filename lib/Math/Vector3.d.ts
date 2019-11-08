import Vector, { X } from './Vector';
declare class Vector3 extends Vector {
    static readonly LENGTH = 3;
    static readonly zero: Vector3;
    static readonly one: Vector3;
    static readonly right: Vector3;
    static readonly left: Vector3;
    static readonly up: Vector3;
    static readonly down: Vector3;
    static readonly forward: Vector3;
    static readonly backward: Vector3;
    constructor(x: Vector3 | X, y?: number, z?: number);
    static cross(a: Vector3, b: Vector3, result?: Vector3): Vector3;
    copy(): Vector3;
}
export default Vector3;
