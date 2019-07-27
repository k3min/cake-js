declare class Quaternion extends Float32Array {
    constructor();
    static euler(euler: ArrayLike<number>, result: Quaternion): Quaternion;
}
export default Quaternion;
