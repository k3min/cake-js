import Math from './Math';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

const bOrA = (a: number, b?: number): number => ((b !== undefined) ? b : a);

const isArrayLike = (array: any): array is ArrayLike<number> => {
	return array.length !== undefined;
};

export type X = ArrayLike<number> | number;

abstract class Vector extends Float32Array {
	public get x(): number {
		return this[0];
	}

	public set x(value: number) {
		this[0] = value;
	}

	public get y(): number {
		return this[1];
	}

	public set y(value: number) {
		this[1] = value;
	}

	public get z(): number {
		return this[2];
	}

	public set z(value: number) {
		this[2] = value;
	}

	public get w(): number {
		return this[3];
	}

	public set w(value: number) {
		this[3] = value;
	}

	public get magnitude(): number {
		return Math.sqrt(this.magnitude2);
	}

	public get magnitude2(): number {
		return Vector.dot(this, this);
	}

	public get normalized(): Vector {
		return this.clone().normalize();
	}

	protected constructor(components: number, x?: X, y?: number, z?: number, w?: number) {
		if (isArrayLike(x)) {
			super(x);
		} else if (x !== undefined && y !== undefined && z !== undefined && w !== undefined) {
			super([x, y, z, w].slice(0, components));
		} else {
			super(components);
		}
	}

	public normalize(): Vector {
		return this.div(this.magnitude);
	}

	protected op(op: (a: number, b: number) => number, x: X, y?: number, z?: number, w?: number): Vector {
		const data = isArrayLike(x) ? x : [x, bOrA(x, y), bOrA(x, z), bOrA(x, w)];

		for (let i = 0; i < this.length; i++) {
			this[i] = op(this[i], data[i]);
		}

		return this;
	}

	public sub(x: X, y?: number, z?: number, w?: number): Vector {
		return this.op((a, b) => (a - b), x, y, z, w);
	}

	public div(x: X, y?: number, z?: number, w?: number): Vector {
		return this.op((a, b) => (a / b), x, y, z, w);
	}

	public mul(x: X, y?: number, z?: number, w?: number): Vector {
		return this.op((a, b) => (a * b), x, y, z, w);
	}

	public add(x: X, y?: number, z?: number, w?: number): Vector {
		return this.op((a, b) => (a + b), x, y, z, w);
	}

	public static dot(a: Vector, b: Vector): number {
		let result = 0;

		for (let i = 0; i < a.length; i++) {
			result += a[i] * b[i];
		}

		return result;
	}

	public static lerp(a: Vector, b: Vector, t: number): Vector {
		return a.clone().op((a, b) => Math.lerp(a, b, t), b);
	}

	public static min(a: Vector, b: Vector): Vector {
		return a.clone().op((a, b) => Math.min(a, b), b);
	}

	public static max(a: Vector, b: Vector): Vector {
		return a.clone().op((a, b) => Math.max(a, b), b);
	}

	public '-'(x: X, y?: number, z?: number, w?: number): Vector {
		return this.clone().sub(x, y, z, w);
	}

	public '/'(x: X, y?: number, z?: number, w?: number): Vector {
		return this.clone().div(x, y, z, w);
	}

	public '*'(x: X, y?: number, z?: number, w?: number): Vector {
		return this.clone().mul(x, y, z, w);
	}

	public '+'(x: X, y?: number, z?: number, w?: number): Vector {
		return this.clone().add(x, y, z, w);
	}

	public '-='(x: X, y?: number, z?: number, w?: number): Vector {
		return this.sub(x, y, z, w);
	}

	public '/='(x: X, y?: number, z?: number, w?: number): Vector {
		return this.div(x, y, z, w);
	}

	public '*='(x: X, y?: number, z?: number, w?: number): Vector {
		return this.mul(x, y, z, w);
	}

	public '+='(x: X, y?: number, z?: number, w?: number): Vector {
		return this.add(x, y, z, w);
	}

	public set(x: X, y?: number, z?: number, w?: number): Vector {
		return this.op((_, b) => b, x, y, z, w);
	}

	public static parse(value: number[]): Vector {
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

	public abstract clone(): Vector;
}

export default Vector;