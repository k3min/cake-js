const clamp = (x: number, lower: number = 0, upper: number = 1): number => {
	return Math.max(lower, Math.min(upper, x));
};

const lerp = (a: number, b: number, t: number): number => {
	return a + t * (b - a);
};

export default {
	...Math,
	clamp,
	lerp,
};