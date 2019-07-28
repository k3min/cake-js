import Vector, { X } from './Vector';

class Vector3 extends Vector {
	public static readonly LENGTH = 3;

	public static get zero(): Vector3 {
		return new Vector3(0, 0, 0);
	}

	public static get one(): Vector3 {
		return new Vector3(1, 1, 1);
	}

	public static get right(): Vector3 {
		return new Vector3(1, 0, 0);
	}

	public static get left(): Vector3 {
		return new Vector3(-1, 0, 0);
	}

	public static get up(): Vector3 {
		return new Vector3(0, 1, 0);
	}

	public static get down(): Vector3 {
		return new Vector3(0, -1, 0);
	}

	public static get forward(): Vector3 {
		return new Vector3(0, 0, 1);
	}

	public static get backward(): Vector3 {
		return new Vector3(0, 0, -1);
	}

	public constructor(x: Vector3 | X, y?: number, z?: number) {
		super(Vector3.LENGTH, x, y, z, 0);
	}

	public static cross(a: Vector3, b: Vector3, result: Vector3): void {
		result[0] = (a[1] * b[2]) - (a[2] * b[1]);
		result[1] = (a[2] * b[0]) - (a[0] * b[2]);
		result[2] = (a[0] * b[1]) - (a[1] * b[0]);
	}

	public copy(): Vector3 {
		return new Vector3(this[0], this[1], this[2]);
	}
}

export default Vector3;