interface MathEx extends Math {
    deg2Rad: number;
    rad2Deg: number;
    clamp(x: number, lower: number, upper: number): number;
    lerp(a: number, b: number, t: number): number;
    nextPowerOfTwo(x: number): number;
}
declare const _default: MathEx;
export default _default;
