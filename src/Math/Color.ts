import Math from './Math';

class Color extends Float32Array {
	public static get white(): Color {
		return new Color(1, 1, 1, 1);
	}

	public static get red(): Color {
		return new Color(1, 0, 0, 1);
	}

	public static get green(): Color {
		return new Color(0, 1, 0, 1);
	}

	public static get blue(): Color {
		return new Color(0, 0, 1, 1);
	}

	public static get black(): Color {
		return new Color(0, 0, 0, 1);
	}

	public static get none(): Color {
		return new Color(0, 0, 0, 0);
	}

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
		const r: number = Math.srgbToLinear(this[0]);
		const g: number = Math.srgbToLinear(this[1]);
		const b: number = Math.srgbToLinear(this[2]);

		return new Color(r, g, b, this[3]);
	}

	get srgb() {
		const r: number = Math.linearToSrgb(this[0]);
		const g: number = Math.linearToSrgb(this[1]);
		const b: number = Math.linearToSrgb(this[2]);

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