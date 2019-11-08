declare class Color extends Float32Array {
    static readonly white: Color;
    static readonly red: Color;
    static readonly green: Color;
    static readonly blue: Color;
    static readonly black: Color;
    static readonly none: Color;
    constructor(r: number, g: number, b: number, a?: number);
    readonly hex: string;
    readonly linear: Color;
    readonly srgb: Color;
    static fromHex(value: string): Color;
}
export default Color;
