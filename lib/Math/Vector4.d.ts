import Vector, { X } from './Vector';
declare class Vector4 extends Vector {
    static readonly LENGTH = 4;
    constructor(x: Vector4 | X, y?: number, z?: number, w?: number);
    copy(): Vector4;
}
export default Vector4;
