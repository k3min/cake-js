import Vector, { X } from './Vector';

class Vector4 extends Vector {
	public static readonly LENGTH = 4;

	public static get zero(): Vector4 {
		return new Vector4(0, 0, 0, 0);
	}

	public static get one(): Vector4 {
		return new Vector4(1, 1, 1, 1);
	}

	public constructor(x: Vector4 | X, y?: number, z?: number, w?: number) {
		super(Vector4.LENGTH, x, y, z, w);
	}

	public copy(): Vector4 {
		return new Vector4(this[0], this[1], this[2], this[3]);
	}
}

export default Vector4;