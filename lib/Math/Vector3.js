import Vector from './Vector';
class Vector3 extends Vector {
    constructor(x, y, z) {
        super(Vector3.LENGTH, x, y, z, 0);
    }
    static get zero() {
        return new Vector3(0, 0, 0);
    }
    static get one() {
        return new Vector3(1, 1, 1);
    }
    static get right() {
        return new Vector3(1, 0, 0);
    }
    static get left() {
        return new Vector3(-1, 0, 0);
    }
    static get up() {
        return new Vector3(0, 1, 0);
    }
    static get down() {
        return new Vector3(0, -1, 0);
    }
    static get forward() {
        return new Vector3(0, 0, 1);
    }
    static get backward() {
        return new Vector3(0, 0, -1);
    }
    static cross(a, b, result) {
        if (!result) {
            result = Vector3.zero;
        }
        result[0] = (a[1] * b[2]) - (a[2] * b[1]);
        result[1] = (a[2] * b[0]) - (a[0] * b[2]);
        result[2] = (a[0] * b[1]) - (a[1] * b[0]);
        return result;
    }
    copy() {
        return new Vector3(this[0], this[1], this[2]);
    }
}
Vector3.LENGTH = 3;
export default Vector3;
