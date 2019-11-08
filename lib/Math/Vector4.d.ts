import Vector, { X } from './Vector';
declare class Vector4 extends Vector {
    static readonly LENGTH = 4;
    static readonly zero: Vector4;
    static readonly one: Vector4;
    constructor(x: Vector4 | X, y?: number, z?: number, w?: number);
    copy(): Vector4;
}
export default Vector4;
