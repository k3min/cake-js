import { DataType } from '../GL/Helpers';
interface MathEx extends Math {
    readonly deg2Rad: number;
    readonly rad2Deg: number;
    readonly TWO_PI: number;
    clamp(x: number, lower?: number, upper?: number): number;
    lerp(a: number, b: number, t: number): number;
    fmod(x: number, n: number): number;
    nextPowerOfTwo(x: number): number;
    bytesPerElement(type: DataType): number;
    nextByteBoundary(x: number, align?: number): number;
    rsqrt(x: number): number;
    srgbToLinear(x: number): number;
    linearToSrgb(x: number): number;
    gamma(x: number): number;
    exp2(x: number): number;
    isZero(x: number): boolean;
}
declare const _default: MathEx;
export default _default;
