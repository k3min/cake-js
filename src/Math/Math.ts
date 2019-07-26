interface MathEx extends Math {
	deg2Rad: number;
	rad2Deg: number;

	clamp(x: number, lower: number, upper: number): number;

	lerp(a: number, b: number, t: number): number;

	nextPowerOfTwo(x: number): number;
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
});

export default Math as MathEx;