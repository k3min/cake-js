import { Copyable } from '../Core';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Vector4 from './Vector4';
/**
 *  0  1  2  3
 *  4  5  6  7
 *  8  9 10 11
 * 12 13 14 15
 */
declare class Matrix4x4 extends Float32Array implements Copyable<Matrix4x4> {
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
    readonly right: Vector3;
    readonly up: Vector3;
    readonly forward: Vector3;
    translation: Vector3;
    rotation: Quaternion;
    scaling: Vector3;
    static readonly identity: Matrix4x4;
    constructor();
    copyTo(result: Matrix4x4): void;
    copy(): Matrix4x4;
    static inverse(matrix: Matrix4x4, result: Matrix4x4): void;
    static multiply(a: Matrix4x4, b: Matrix4x4, result: Matrix4x4): void;
    static perspective(fov: number, aspect: number, near: number, far: number, result: Matrix4x4): Matrix4x4;
    static ortho(left: number, right: number, top: number, bottom: number, near: number, far: number, result?: Matrix4x4): Matrix4x4;
    static lookAt(position: Vector3, target: Vector3, result: Matrix4x4): Matrix4x4;
    setRow(i: number, v: Vector4): void;
    multiplyPoint(v: Vector3, result?: Vector3): Vector3;
    multiplyVector(v: Vector3, result?: Vector3): Vector3;
}
export default Matrix4x4;
