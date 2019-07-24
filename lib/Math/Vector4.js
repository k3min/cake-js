import Vector from './Vector';
class Vector4 extends Vector {
    constructor(x, y, z, w) {
        super(Vector4.LENGTH, x, y, z, w);
    }
    clone() {
        return new Vector4(this[0], this[1], this[2], this[3]);
    }
}
Vector4.LENGTH = 4;
export default Vector4;
