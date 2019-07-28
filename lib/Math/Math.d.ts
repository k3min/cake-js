import { DataType } from '../GL/Helpers';
interface MathEx extends Math {
    readonly deg2Rad: number;
    readonly rad2Deg: number;
    clamp(x: number, lower?: number, upper?: number): number;
    lerp(a: number, b: number, t: number): number;
    nextPowerOfTwo(x: number): number;
    bytesPerElement(type: DataType): number;
    nextByteBoundary(x: number, align?: number): number;
    rsqrt(x: number): number;
    linear(x: number): number;
    gamma(x: number): number;
    exp2(x: number): number;
}
declare const _default: MathEx;
export default _default;
