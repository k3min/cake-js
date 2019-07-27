import Vector3 from './Vector3';
import Vector4 from './Vector4';
declare class Matrix4x4 extends Float32Array {
    d00: number;
    d01: number;
    d02: number;
    d03: number;
    d04: number;
    d05: number;
    d06: number;
    d07: number;
    d08: number;
    d09: number;
    d10: number;
    d11: number;
    d12: number;
    d13: number;
    d14: number;
    d15: number;
    static readonly identity: Matrix4x4;
    constructor();
    static inverse(matrix: Matrix4x4, result: Matrix4x4): void;
    static multiply(a: Matrix4x4, b: Matrix4x4, result: Matrix4x4): void;
    static perspective(fov: number, aspect: number, near: number, far: number, result: Matrix4x4): Matrix4x4;
    static lookAt(position: Vector3, target: Vector3, result: Matrix4x4): Matrix4x4;
    setRow(i: number, v: Vector4): void;
}
export default Matrix4x4;
