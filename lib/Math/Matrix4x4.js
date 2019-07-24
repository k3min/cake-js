import Math from './Math';
class Matrix4x4 extends Float32Array {
    get d00() {
        return this[0];
    }
    set d00(value) {
        this[0] = value;
    }
    get d01() {
        return this[1];
    }
    set d01(value) {
        this[1] = value;
    }
    get d02() {
        return this[2];
    }
    set d02(value) {
        this[2] = value;
    }
    get d03() {
        return this[3];
    }
    set d03(value) {
        this[3] = value;
    }
    get d04() {
        return this[4];
    }
    set d04(value) {
        this[4] = value;
    }
    get d05() {
        return this[5];
    }
    set d05(value) {
        this[5] = value;
    }
    get d06() {
        return this[6];
    }
    set d06(value) {
        this[6] = value;
    }
    get d07() {
        return this[7];
    }
    set d07(value) {
        this[7] = value;
    }
    get d08() {
        return this[8];
    }
    set d08(value) {
        this[8] = value;
    }
    get d09() {
        return this[9];
    }
    set d09(value) {
        this[9] = value;
    }
    get d10() {
        return this[10];
    }
    set d10(value) {
        this[10] = value;
    }
    get d11() {
        return this[11];
    }
    set d11(value) {
        this[11] = value;
    }
    get d12() {
        return this[12];
    }
    set d12(value) {
        this[12] = value;
    }
    get d13() {
        return this[13];
    }
    set d13(value) {
        this[13] = value;
    }
    get d14() {
        return this[14];
    }
    set d14(value) {
        this[14] = value;
    }
    get d15() {
        return this[15];
    }
    set d15(value) {
        this[15] = value;
    }
    static get identity() {
        const result = new Matrix4x4();
        result[0] = 1;
        result[1] = 0;
        result[2] = 0;
        result[3] = 0;
        result[4] = 0;
        result[5] = 1;
        result[6] = 0;
        result[7] = 0;
        result[8] = 0;
        result[9] = 0;
        result[10] = 1;
        result[11] = 0;
        result[12] = 0;
        result[13] = 0;
        result[14] = 0;
        result[15] = 1;
        return result;
    }
    get transpose() {
        const result = new Matrix4x4();
        result[0] = this[0];
        result[1] = this[4];
        result[2] = this[8];
        result[3] = this[12];
        result[4] = this[1];
        result[5] = this[5];
        result[6] = this[9];
        result[7] = this[13];
        result[8] = this[2];
        result[9] = this[6];
        result[10] = this[10];
        result[11] = this[14];
        result[12] = this[3];
        result[13] = this[7];
        result[14] = this[11];
        result[15] = this[15];
        return result;
    }
    constructor() {
        super(16);
    }
    static inverse(matrix, result) {
        const a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
        const a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
        const a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
        const a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15];
        const b00 = (a00 * a11) - (a01 * a10);
        const b01 = (a00 * a12) - (a02 * a10);
        const b02 = (a00 * a13) - (a03 * a10);
        const b03 = (a01 * a12) - (a02 * a11);
        const b04 = (a01 * a13) - (a03 * a11);
        const b05 = (a02 * a13) - (a03 * a12);
        const b06 = (a20 * a31) - (a21 * a30);
        const b07 = (a20 * a32) - (a22 * a30);
        const b08 = (a20 * a33) - (a23 * a30);
        const b09 = (a21 * a32) - (a22 * a31);
        const b10 = (a21 * a33) - (a23 * a31);
        const b11 = (a22 * a33) - (a23 * a32);
        const det = 1 / ((b00 * b11) - (b01 * b10) + (b02 * b09) + (b03 * b08) - (b04 * b07) + (b05 * b06));
        result[0] = ((a11 * b11) - (a12 * b10) + (a13 * b09)) * det;
        result[1] = ((a02 * b10) - (a01 * b11) - (a03 * b09)) * det;
        result[2] = ((a31 * b05) - (a32 * b04) + (a33 * b03)) * det;
        result[3] = ((a22 * b04) - (a21 * b05) - (a23 * b03)) * det;
        result[4] = ((a12 * b08) - (a10 * b11) - (a13 * b07)) * det;
        result[5] = ((a00 * b11) - (a02 * b08) + (a03 * b07)) * det;
        result[6] = ((a32 * b02) - (a30 * b05) - (a33 * b01)) * det;
        result[7] = ((a20 * b05) - (a22 * b02) + (a23 * b01)) * det;
        result[8] = ((a10 * b10) - (a11 * b08) + (a13 * b06)) * det;
        result[9] = ((a01 * b08) - (a00 * b10) - (a03 * b06)) * det;
        result[10] = ((a30 * b04) - (a31 * b02) + (a33 * b00)) * det;
        result[11] = ((a21 * b02) - (a20 * b04) - (a23 * b00)) * det;
        result[12] = ((a11 * b07) - (a10 * b09) - (a12 * b06)) * det;
        result[13] = ((a00 * b09) - (a01 * b07) + (a02 * b06)) * det;
        result[14] = ((a31 * b01) - (a30 * b03) - (a32 * b00)) * det;
        result[15] = ((a20 * b03) - (a21 * b01) + (a22 * b00)) * det;
    }
    static multiply(a, b, result) {
        let b0, b1, b2, b3;
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        b0 = b[0];
        b1 = b[1];
        b2 = b[2];
        b3 = b[3];
        result[0] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
        result[1] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
        result[2] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
        result[3] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        result[4] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
        result[5] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
        result[6] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
        result[7] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        result[8] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
        result[9] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
        result[10] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
        result[11] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        result[12] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
        result[13] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
        result[14] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
        result[15] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);
    }
    static perspective(fov, aspect, near, far) {
        return (new Matrix4x4()).perspective(fov, aspect, near, far);
    }
    perspective(fov, aspect, near, far) {
        const top = near * Math.tan(fov * Math.deg2Rad * 0.5);
        const right = top * aspect;
        const left = -right;
        const bottom = -top;
        this[0] = (2 * near) / (right - left);
        this[5] = (2 * near) / (top - bottom);
        this[8] = (right + left) / (right - left);
        this[9] = (top + bottom) / (top - bottom);
        this[10] = -(far + near) / (far - near);
        this[11] = -1;
        this[14] = -(2 * far * near) / (far - near);
        return this;
    }
    static lookAt(position, target) {
        return (new Matrix4x4()).lookAt(position, target);
    }
    lookAt(position, target) {
        const xPos = position[0];
        const yPos = position[1];
        const zPos = position[2];
        const xTarget = target[0];
        const yTarget = target[1];
        const zTarget = target[2];
        const xUp = 0;
        const yUp = 1;
        const zUp = 0;
        let z0 = xPos - xTarget;
        let z1 = yPos - yTarget;
        let z2 = zPos - zTarget;
        let len = (z0 * z0) + (z1 * z1) + (z2 * z2);
        if (len < Number.EPSILON) {
            z0 = 0;
            z1 = 0;
            z2 = 0;
        }
        else {
            len = 1 / Math.sqrt(len);
            z0 *= len;
            z1 *= len;
            z2 *= len;
        }
        let x0 = (yUp * z2) - (zUp * z1);
        let x1 = (zUp * z0) - (xUp * z2);
        let x2 = (xUp * z1) - (yUp * z0);
        len = (x0 * x0) + (x1 * x1) + (x2 * x2);
        if (len < Number.EPSILON) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        }
        else {
            len = 1 / Math.sqrt(len);
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        let y0 = (z1 * x2) - (z2 * x1);
        let y1 = (z2 * x0) - (z0 * x2);
        let y2 = (z0 * x1) - (z1 * x0);
        len = (y0 * y0) + (y1 * y1) + (y2 * y2);
        if (len < Number.EPSILON) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        }
        else {
            len = 1 / Math.sqrt(len);
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        let x3 = -((x0 * xPos) + (x1 * yPos) + (x2 * zPos));
        let y3 = -((y0 * xPos) + (y1 * yPos) + (y2 * zPos));
        let z3 = -((z0 * xPos) + (z1 * yPos) + (z2 * zPos));
        this[0] = x0;
        this[1] = y0;
        this[2] = z0;
        this[3] = 0;
        this[4] = x1;
        this[5] = y1;
        this[6] = z1;
        this[7] = 0;
        this[8] = x2;
        this[9] = y2;
        this[10] = z2;
        this[11] = 0;
        this[12] = x3;
        this[13] = y3;
        this[14] = z3;
        this[15] = 1;
        return this;
    }
    setRow(i, v) {
        for (let j = 0; j < 4; j++) {
            this[(i * 4) + j] = v[j] || 0;
        }
    }
}
export default Matrix4x4;
