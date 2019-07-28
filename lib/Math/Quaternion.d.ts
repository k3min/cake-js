import Vector3 from './Vector3';
import Vector4 from './Vector4';
declare class Quaternion extends Vector4 {
    static readonly identity: Quaternion;
    static euler(euler: Vector3, result: Quaternion): void;
    slerp(qb: Quaternion, t: number): Quaternion;
    normalize(): Quaternion;
    copy(): Quaternion;
}
export default Quaternion;
