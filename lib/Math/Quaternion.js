import Math from './Math';
import Vector4 from './Vector4';
class Quaternion extends Vector4 {
    static get identity() {
        return new Quaternion(0, 0, 0, 1);
    }
    static euler(euler, result) {
        const c1 = Math.cos(euler[0] * 0.5);
        const c2 = Math.cos(euler[1] * 0.5);
        const c3 = Math.cos(euler[2] * 0.5);
        const s1 = Math.sin(euler[0] * 0.5);
        const s2 = Math.sin(euler[1] * 0.5);
        const s3 = Math.sin(euler[2] * 0.5);
        result[0] = s1 * c2 * c3 + c1 * s2 * s3;
        result[1] = c1 * s2 * c3 - s1 * c2 * s3;
        result[2] = c1 * c2 * s3 + s1 * s2 * c3;
        result[3] = c1 * c2 * c3 - s1 * s2 * s3;
    }
    slerp(qb, t) {
        if (t === 0) {
            return this;
        }
        if (t === 1) {
            this[0] = qb[0];
            this[1] = qb[1];
            this[2] = qb[2];
            this[3] = qb[3];
            return this;
        }
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const w = this[3];
        let cosHalfTheta = (x * qb[0]) + (y * qb[1]) + (z * qb[2]) + (w * qb[3]);
        if (cosHalfTheta < 0) {
            this[0] = -qb[0];
            this[1] = -qb[1];
            this[2] = -qb[2];
            this[3] = -qb[3];
            cosHalfTheta = -cosHalfTheta;
        }
        else {
            this[0] = qb[0];
            this[1] = qb[1];
            this[2] = qb[2];
            this[3] = qb[3];
        }
        if (cosHalfTheta >= 1.0) {
            this[0] = x;
            this[1] = y;
            this[2] = z;
            this[3] = w;
            return this;
        }
        const sinHalfTheta2 = 1.0 - (cosHalfTheta * cosHalfTheta);
        if (sinHalfTheta2 < Number.EPSILON) {
            const s = 1 - t;
            this[0] = (s * x) + (t * this[0]);
            this[1] = (s * y) + (t * this[1]);
            this[2] = (s * z) + (t * this[2]);
            this[3] = (s * w) + (t * this[3]);
            this.normalize();
            return this;
        }
        const sinHalfTheta = Math.sqrt(sinHalfTheta2);
        const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
        const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this[0] = (x * ratioA) + (this[0] * ratioB);
        this[1] = (y * ratioA) + (this[1] * ratioB);
        this[2] = (z * ratioA) + (this[2] * ratioB);
        this[3] = (w * ratioA) + (this[3] * ratioB);
        return this;
    }
    normalize() {
        const length = this.magnitudeSq;
        if (length < Number.EPSILON) {
            return this.set(0, 0, 0, 1);
        }
        return this.mul(Math.rsqrt(length));
    }
    copy() {
        return new Quaternion(this[0], this[1], this[2], this[3]);
    }
}
export default Quaternion;
