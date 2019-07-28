import Vector, { X } from './Vector';

class Vector2 extends Vector {
	public static readonly LENGTH = 2;

	public static get zero(): Vector2 {
		return new Vector2(0, 0);
	}

	public static get one(): Vector2 {
		return new Vector2(1, 1);
	}

	public static get right(): Vector2 {
		return new Vector2(1, 0);
	}

	public static get left(): Vector2 {
		return new Vector2(-1, 0);
	}

	public static get up(): Vector2 {
		return new Vector2(0, 1);
	}

	public static get down(): Vector2 {
		return new Vector2(0, -1);
	}

	public constructor(x: Vector2 | X, y?: number) {
		super(Vector2.LENGTH, x, y, 0, 0);
	}

	public copy(): Vector2 {
		return new Vector2(this[0], this[1]);
	}
}

export default Vector2;