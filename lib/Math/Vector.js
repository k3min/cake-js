import { isArrayLike } from '../Core/Helpers';
import Math from './Math';
const bOrA = (a, b) => ((b !== undefined) ? b : a);
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
        return Math.sqrt(this.magnitudeSq);
    }
    get magnitudeSq() {
        return Vector.dot(this, this);
    }
    get normalized() {
        return this.copy().normalize();
    }
    get min() {
        return Math.min(...this);
    }
    get max() {
        return Math.max(...this);
    }
    constructor(components, x, y = 0, z = 0, w = 0) {
        if (x === undefined) {
            super(components);
        }
        else {
            if (isArrayLike(x)) {
                super(x);
            }
            else {
                super([x, y, z, w].slice(0, components));
            }
        }
    }
    normalize() {
        const length = this.magnitudeSq;
        if (length < Number.EPSILON) {
            return this.set(0, 0, 0, 0);
        }
        return this.div(Math.sqrt(length));
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
    set(x, y, z, w) {
        return this.op((_, b) => b, x, y, z, w);
    }
    static dot(a, b) {
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result += a[i] * b[i];
        }
        return result;
    }
    static lerp(a, b, t) {
        return a.copy().op((a, b) => Math.lerp(a, b, t), b);
    }
    static min(a, b) {
        return a.copy().op((a, b) => Math.min(a, b), b);
    }
    static max(a, b) {
        return a.copy().op((a, b) => Math.max(a, b), b);
    }
    static distance(a, b) {
        return Math.sqrt(Vector.distanceSq(a, b));
    }
    static distanceSq(a, b) {
        const result = (a)['-'](b);
        return Vector.dot(result, result);
    }
    '-'(x, y, z, w) {
        return this.copy().sub(x, y, z, w);
    }
    '/'(x, y, z, w) {
        return this.copy().div(x, y, z, w);
    }
    '*'(x, y, z, w) {
        return this.copy().mul(x, y, z, w);
    }
    '+'(x, y, z, w) {
        return this.copy().add(x, y, z, w);
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
    '='(x, y, z, w) {
        return this.set(x, y, z, w);
    }
    inverse() {
        for (let i = 0; i < this.length; i++) {
            if (this[i] < -Number.EPSILON || this[i] > Number.EPSILON) {
                this[i] = 1 / this[i];
            }
        }
        return this;
    }
}
export default Vector;
