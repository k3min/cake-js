import Vector from './Vector';
class Vector4 extends Vector {
    constructor(x, y, z, w) {
        super(Vector4.LENGTH, x, y, z, w);
    }
    static get zero() {
        return new Vector4(0, 0, 0, 0);
    }
    static get one() {
        return new Vector4(1, 1, 1, 1);
    }
    copy() {
        return new Vector4(this[0], this[1], this[2], this[3]);
    }
}
Vector4.LENGTH = 4;
export default Vector4;
