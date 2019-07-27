declare class Color extends Float32Array {
    constructor(r: number, g: number, b: number, a?: number);
    readonly hex: string;
    readonly linear: Color;
    readonly gamma: Color;
    static fromHex(value: string): Color;
}
export default Color;
