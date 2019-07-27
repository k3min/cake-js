import { DataType } from '../GL/Helpers';

interface MathEx extends Math {
	readonly deg2Rad: number;
	readonly rad2Deg: number;

	clamp(x: number, lower?: number, upper?: number): number;

	lerp(a: number, b: number, t: number): number;

	nextPowerOfTwo(x: number): number;

	bytesPerElement(type: DataType): number;

	nextByteBoundary(x: number, align?: number): number;

	rsqrt(x: number): number;
}

Object.defineProperties(Math, {

	deg2Rad: { value: 0.0174532925 },
	rad2Deg: { value: 57.2957795 },

	clamp: {
		value: (x: number, lower: number = 0, upper: number = 1): number => Math.max(lower, Math.min(upper, x)),
	},

	lerp: {
		value: (a: number, b: number, t: number): number => a + t * (b - a),
	},

	nextPowerOfTwo: {
		value: (x: number): number => {
			x--;
			let p: number = 2;
			// noinspection AssignmentResultUsedJS
			while (x >>= 1) {
				p <<= 1;
			}
			return p;
		},
	},

	bytesPerElement: {
		value: (type: DataType): number => {
			switch (type) {
				case DataType.Int8:
				case DataType.Uint8:
					return 1;

				case DataType.Int16:
				case DataType.Uint16:
					return 2;

				case DataType.Int32:
				case DataType.Uint32:
				case DataType.Float32:
					return 4;

				default:
					throw new RangeError();
			}
		},
	},

	nextByteBoundary: {
		value: (x: number, pack: number = 4): number => {
			const offset: number = x % pack;

			if (offset !== 0) {
				x += pack - offset;
			}

			return x;
		},
	},

	rsqrt: {
		value: (x: number): number => {
			return 1 / Math.sqrt(x);
		},
	},
});

export default Math as MathEx;