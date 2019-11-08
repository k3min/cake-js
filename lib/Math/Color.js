import Math from './Math';
class Color extends Float32Array {
    static get white() {
        return new Color(1, 1, 1, 1);
    }
    static get red() {
        return new Color(1, 0, 0, 1);
    }
    static get green() {
        return new Color(0, 1, 0, 1);
    }
    static get blue() {
        return new Color(0, 0, 1, 1);
    }
    static get black() {
        return new Color(0, 0, 0, 1);
    }
    static get none() {
        return new Color(0, 0, 0, 0);
    }
    constructor(r, g, b, a) {
        super([r, g, b, a || 1]);
    }
    get hex() {
        const r = this[0] * 255;
        const g = this[1] * 255;
        const b = this[2] * 255;
        const int = (r << 16) | (g << 8) | b;
        const value = int.toString(16);
        return `#${value.padStart(6, '00')}`;
    }
    get linear() {
        const r = Math.srgbToLinear(this[0]);
        const g = Math.srgbToLinear(this[1]);
        const b = Math.srgbToLinear(this[2]);
        return new Color(r, g, b, this[3]);
    }
    get srgb() {
        const r = Math.linearToSrgb(this[0]);
        const g = Math.linearToSrgb(this[1]);
        const b = Math.linearToSrgb(this[2]);
        return new Color(r, g, b, this[3]);
    }
    static fromHex(value) {
        if (value[0] === '#') {
            value = value.substr(1);
        }
        const int = parseInt(value.padEnd(6, 'ff'), 16);
        const r = int >> 16;
        const g = int >> 8;
        const b = int & 255;
        return new Color(r / 255, g / 255, b / 255);
    }
}
export default Color;
