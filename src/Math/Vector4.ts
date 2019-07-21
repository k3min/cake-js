import Vector, { X } from './Vector';

class Vector4 extends Vector {
	public static readonly LENGTH = 4;

	public constructor(x: Vector4 | X, y?: number, z?: number, w?: number) {
		super(Vector4.LENGTH, x, y, z, w);
	}

	public clone(): Vector4 {
		return new Vector4(this);
	}
}

export default Vector4;