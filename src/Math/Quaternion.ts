import Math from './Math';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

class Quaternion extends Vector4 {
	public static get identity(): Quaternion {
		return new Quaternion(0, 0, 0, 1);
	}

	public static euler(euler: Vector3, result: Quaternion): void {
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

	public slerp(qb: Quaternion, t: number): Quaternion {
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

		const x: number = this[0];
		const y: number = this[1];
		const z: number = this[2];
		const w: number = this[3];

		let cosHalfTheta: number = (x * qb[0]) + (y * qb[1]) + (z * qb[2]) + (w * qb[3]);

		if (cosHalfTheta < 0) {
			this[0] = -qb[0];
			this[1] = -qb[1];
			this[2] = -qb[2];
			this[3] = -qb[3];

			cosHalfTheta = -cosHalfTheta;
		} else {
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

		const sinHalfTheta2: number = 1.0 - (cosHalfTheta * cosHalfTheta);

		if (sinHalfTheta2 < Number.EPSILON) {
			const s: number = 1 - t;

			this[0] = (s * x) + (t * this[0]);
			this[1] = (s * y) + (t * this[1]);
			this[2] = (s * z) + (t * this[2]);
			this[3] = (s * w) + (t * this[3]);

			this.normalize();

			return this;
		}

		const sinHalfTheta: number = Math.sqrt(sinHalfTheta2);
		const halfTheta: number = Math.atan2(sinHalfTheta, cosHalfTheta);
		const ratioA: number = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
		const ratioB: number = Math.sin(t * halfTheta) / sinHalfTheta;

		this[0] = (x * ratioA) + (this[0] * ratioB);
		this[1] = (y * ratioA) + (this[1] * ratioB);
		this[2] = (z * ratioA) + (this[2] * ratioB);
		this[3] = (w * ratioA) + (this[3] * ratioB);

		return this;
	}

	public normalize(): Quaternion {
		const length = this.magnitudeSq;

		if (length < Number.EPSILON) {
			return this.set(0, 0, 0, 1) as Quaternion;
		}

		return this.mul(Math.rsqrt(length)) as Quaternion;
	}

	public copy(): Quaternion {
		return new Quaternion(this[0], this[1], this[2], this[3]);
	}
}

export default Quaternion;