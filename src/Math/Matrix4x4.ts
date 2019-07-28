import Copyable from '../Core/Copyable';
import Math from './Math';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

/**
 *  0  1  2  3
 *  4  5  6  7
 *  8  9 10 11
 * 12 13 14 15
 */

class Matrix4x4 extends Float32Array implements Copyable<Matrix4x4> {
	public get d00(): number {
		return this[0];
	}

	public set d00(value: number) {
		this[0] = value;
	}

	public get d01(): number {
		return this[1];
	}

	public set d01(value: number) {
		this[1] = value;
	}

	public get d02(): number {
		return this[2];
	}

	public set d02(value: number) {
		this[2] = value;
	}

	public get d03(): number {
		return this[3];
	}

	public set d03(value: number) {
		this[3] = value;
	}

	public get d04(): number {
		return this[4];
	}

	public set d04(value: number) {
		this[4] = value;
	}

	public get d05(): number {
		return this[5];
	}

	public set d05(value: number) {
		this[5] = value;
	}

	public get d06(): number {
		return this[6];
	}

	public set d06(value: number) {
		this[6] = value;
	}

	public get d07(): number {
		return this[7];
	}

	public set d07(value: number) {
		this[7] = value;
	}

	public get d08(): number {
		return this[8];
	}

	public set d08(value: number) {
		this[8] = value;
	}

	public get d09(): number {
		return this[9];
	}

	public set d09(value: number) {
		this[9] = value;
	}

	public get d10(): number {
		return this[10];
	}

	public set d10(value: number) {
		this[10] = value;
	}

	public get d11(): number {
		return this[11];
	}

	public set d11(value: number) {
		this[11] = value;
	}

	public get d12(): number {
		return this[12];
	}

	public set d12(value: number) {
		this[12] = value;
	}

	public get d13(): number {
		return this[13];
	}

	public set d13(value: number) {
		this[13] = value;
	}

	public get d14(): number {
		return this[14];
	}

	public set d14(value: number) {
		this[14] = value;
	}

	public get d15(): number {
		return this[15];
	}

	public set d15(value: number) {
		this[15] = value;
	}

	public get right(): Vector3 {
		return new Vector3(this[0], this[4], this[8]);
	}

	public get up(): Vector3 {
		return new Vector3(this[1], this[5], this[9]);
	}

	public get forward(): Vector3 {
		return new Vector3(this[2], this[6], this[10]);
	}

	public get translation(): Vector3 {
		return new Vector3(this[12], this[13], this[14]);
	}

	public set translation(value: Vector3) {
		this[12] = value[0];
		this[13] = value[1];
		this[14] = value[2];
	}

	public set rotation(value: Quaternion) {
		const [x, y, z, w] = value;

		const x2 = x + x;
		const y2 = y + y;
		const z2 = z + z;

		const xx = x * x2;
		const xy = x * y2;
		const xz = x * z2;
		const yy = y * y2;
		const yz = y * z2;
		const zz = z * z2;
		const wx = w * x2;
		const wy = w * y2;
		const wz = w * z2;

		this[0] = 1 - (yy + zz);
		this[1] = xy + wz;
		this[2] = xz - wy;

		this[4] = xy - wz;
		this[5] = 1 - (xx + zz);
		this[6] = yz + wx;

		this[8] = xz + wy;
		this[9] = yz - wx;
		this[10] = 1 - (xx + yy);
	}

	public get scaling(): Vector3 {
		return new Vector3(this[0], this[5], this[10]);
	}

	public set scaling(value: Vector3) {
		this[0] = value[0];
		this[5] = value[1];
		this[10] = value[2];
	}

	public static get identity(): Matrix4x4 {
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

	public constructor() {
		super(16);
	}

	public copyTo(result: Matrix4x4): void {
		for (let i = 0; i < 16; i++) {
			result[i] = this[i];
		}
	}

	public copy(): Matrix4x4 {
		const result: Matrix4x4 = new Matrix4x4();

		this.copyTo(result);

		return result;
	}

	public static inverse(matrix: Matrix4x4, result: Matrix4x4): void {
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

	public static multiply(a: Matrix4x4, b: Matrix4x4, result: Matrix4x4): void {
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

	public static perspective(fov: number, aspect: number, near: number, far: number, result: Matrix4x4): Matrix4x4 {
		const top = near * Math.tan(fov * Math.deg2Rad * 0.5);
		const right = top * aspect;
		const left = -right;
		const bottom = -top;

		result[0] = (2 * near) / (right - left);
		result[1] = 0;
		result[2] = 0;
		result[3] = 0;

		result[4] = 0;
		result[5] = (2 * near) / (top - bottom);
		result[6] = 0;
		result[7] = 0;

		result[8] = (right + left) / (right - left);
		result[9] = (top + bottom) / (top - bottom);
		result[10] = -(far + near) / (far - near);
		result[11] = -1;

		result[12] = 0;
		result[13] = 0;
		result[14] = -(2 * far * near) / (far - near);
		result[15] = 0;

		return result;
	}

	public static lookAt(position: Vector3, target: Vector3, result: Matrix4x4): Matrix4x4 {
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

		let len2 = (z0 * z0) + (z1 * z1) + (z2 * z2);

		if (len2 < Number.EPSILON) {
			z0 = 0;
			z1 = 0;
			z2 = 0;
		} else {
			const lenInv = Math.rsqrt(len2);

			z0 *= lenInv;
			z1 *= lenInv;
			z2 *= lenInv;
		}

		let x0 = (yUp * z2) - (zUp * z1);
		let x1 = (zUp * z0) - (xUp * z2);
		let x2 = (xUp * z1) - (yUp * z0);

		len2 = (x0 * x0) + (x1 * x1) + (x2 * x2);

		if (len2 < Number.EPSILON) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		} else {
			const lenInv = Math.rsqrt(len2);

			x0 *= lenInv;
			x1 *= lenInv;
			x2 *= lenInv;
		}

		let y0 = (z1 * x2) - (z2 * x1);
		let y1 = (z2 * x0) - (z0 * x2);
		let y2 = (z0 * x1) - (z1 * x0);

		len2 = (y0 * y0) + (y1 * y1) + (y2 * y2);

		if (len2 < Number.EPSILON) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		} else {
			const lenInv = Math.rsqrt(len2);

			y0 *= lenInv;
			y1 *= lenInv;
			y2 *= lenInv;
		}

		let x3 = -((x0 * xPos) + (x1 * yPos) + (x2 * zPos));
		let y3 = -((y0 * xPos) + (y1 * yPos) + (y2 * zPos));
		let z3 = -((z0 * xPos) + (z1 * yPos) + (z2 * zPos));

		result[0] = x0;
		result[1] = y0;
		result[2] = z0;
		result[3] = 0;

		result[4] = x1;
		result[5] = y1;
		result[6] = z1;
		result[7] = 0;

		result[8] = x2;
		result[9] = y2;
		result[10] = z2;
		result[11] = 0;

		result[12] = x3;
		result[13] = y3;
		result[14] = z3;
		result[15] = 1;

		return result;
	}

	setRow(i: number, v: Vector4) {
		for (let j = 0; j < 4; j++) {
			this[(i * 4) + j] = v[j] || 0;
		}
	}
}

export default Matrix4x4;