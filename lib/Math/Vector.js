import Math from './Math';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Vector4 from './Vector4';
const bOrA = (a, b) => ((b !== undefined) ? b : a);
const isArrayLike = (array) => {
    return array.length !== undefined;
};
class Vector extends Float32Array {
    get x() {
        return this[0];
    }
    set x(value) {
        this[0] = value;
    }
    get y() {
        return this[1];
    }
    set y(value) {
        this[1] = value;
    }
    get z() {
        return this[2];
    }
    set z(value) {
        this[2] = value;
    }
    get w() {
        return this[3];
    }
    set w(value) {
        this[3] = value;
    }
    get magnitude() {
        return Math.sqrt(this.magnitude2);
    }
    get magnitude2() {
        return Vector.dot(this, this);
    }
    get normalized() {
        return this.clone().normalize();
    }
    constructor(components, x, y, z, w) {
        if (isArrayLike(x)) {
            super(x);
        }
        else if (x !== undefined && y !== undefined && z !== undefined && w !== undefined) {
            super([x, y, z, w].slice(0, components));
        }
        else {
            super(components);
        }
    }
    normalize() {
        return this.div(this.magnitude);
    }
    op(op, x, y, z, w) {
        const data = isArrayLike(x) ? x : [x, bOrA(x, y), bOrA(x, z), bOrA(x, w)];
        for (let i = 0; i < this.length; i++) {
            this[i] = op(this[i], data[i]);
        }
        return this;
    }
    sub(x, y, z, w) {
        return this.op((a, b) => (a - b), x, y, z, w);
    }
    div(x, y, z, w) {
        return this.op((a, b) => (a / b), x, y, z, w);
    }
    mul(x, y, z, w) {
        return this.op((a, b) => (a * b), x, y, z, w);
    }
    add(x, y, z, w) {
        return this.op((a, b) => (a + b), x, y, z, w);
    }
    static dot(a, b) {
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result += a[i] * b[i];
        }
        return result;
    }
    static lerp(a, b, t) {
        return a.clone().op((a, b) => Math.lerp(a, b, t), b);
    }
    static min(a, b) {
        return a.clone().op((a, b) => Math.min(a, b), b);
    }
    static max(a, b) {
        return a.clone().op((a, b) => Math.max(a, b), b);
    }
    '-'(x, y, z, w) {
        return this.clone().sub(x, y, z, w);
    }
    '/'(x, y, z, w) {
        return this.clone().div(x, y, z, w);
    }
    '*'(x, y, z, w) {
        return this.clone().mul(x, y, z, w);
    }
    '+'(x, y, z, w) {
        return this.clone().add(x, y, z, w);
    }
    '-='(x, y, z, w) {
        return this.sub(x, y, z, w);
    }
    '/='(x, y, z, w) {
        return this.div(x, y, z, w);
    }
    '*='(x, y, z, w) {
        return this.mul(x, y, z, w);
    }
    '+='(x, y, z, w) {
        return this.add(x, y, z, w);
    }
    set(x, y, z, w) {
        return this.op((_, b) => b, x, y, z, w);
    }
    static parse(value) {
        switch (value.length) {
            case Vector2.LENGTH:
                return new Vector2(value);
            case Vector3.LENGTH:
                return new Vector3(value);
            case Vector4.LENGTH:
                return new Vector4(value);
            default:
                throw new RangeError();
        }
    }
}
export default Vector;
