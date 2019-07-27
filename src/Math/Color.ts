import Math from './Math';

class Color extends Float32Array {
	public constructor(r: number, g: number, b: number, a?: number) {
		super([r, g, b, a || 1]);
	}

	get hex() {
		const r = this[0] * 255;
		const g = this[1] * 255;
		const b = this[2] * 255;

		const int: number = (r << 16) | (g << 8) | b;
		const value: string = int.toString(16);

		return `#${ value.padStart(6, '00') }`;
	}

	get linear() {
		const r: number = Math.linear(this[0]);
		const g: number = Math.linear(this[1]);
		const b: number = Math.linear(this[2]);

		return new Color(r, g, b, this[3]);
	}

	get gamma() {
		const r: number = Math.gamma(this[0]);
		const g: number = Math.gamma(this[1]);
		const b: number = Math.gamma(this[2]);

		return new Color(r, g, b, this[3]);
	}

	public static fromHex(value: string): Color {
		if (value[0] === '#') {
			value = value.substr(1);
		}

		const int: number = parseInt(value.padEnd(6, 'ff'), 16);

		const r: number = int >> 16;
		const g: number = int >> 8;
		const b: number = int & 255;

		return new Color(r / 255, g / 255, b / 255);
	}
}

export default Color;