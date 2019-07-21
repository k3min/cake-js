export { default as Vector }from './Vector';
export { default as Vector2 }from './Vector2';
export { default as Vector3 }from './Vector3';
export { default as Vector4 }from './Vector4';
export { default as Matrix4x4 }from './Matrix4x4';

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