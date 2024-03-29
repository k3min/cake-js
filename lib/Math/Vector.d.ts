import { Copyable } from '../Core';
export declare type X = ArrayLike<number> | number;
declare abstract class Vector extends Float32Array implements Copyable<Vector> {
    x: number;
    y: number;
    z: number;
    w: number;
    readonly magnitude: number;
    readonly magnitudeSq: number;
    readonly normalized: Vector;
    readonly min: number;
    readonly max: number;
    protected constructor(components: number, x?: X, y?: number, z?: number, w?: number);
    normalize(): Vector;
    protected op(op: (a: number, b: number) => number, x: X, y?: number, z?: number, w?: number): Vector;
    sub(x: X, y?: number, z?: number, w?: number): Vector;
    div(x: X, y?: number, z?: number, w?: number): Vector;
    mul(x: X, y?: number, z?: number, w?: number): Vector;
    add(x: X, y?: number, z?: number, w?: number): Vector;
    set(x: X, y?: number, z?: number, w?: number): Vector;
    static dot(a: Vector, b: Vector): number;
    static lerp(a: Vector, b: Vector, t: number): Vector;
    static min(a: Vector, b: Vector): Vector;
    static max(a: Vector, b: Vector): Vector;
    static distance(a: Vector, b: Vector): number;
    static distanceSq(a: Vector, b: Vector): number;
    '-'(x: X, y?: number, z?: number, w?: number): Vector;
    '/'(x: X, y?: number, z?: number, w?: number): Vector;
    '*'(x: X, y?: number, z?: number, w?: number): Vector;
    '+'(x: X, y?: number, z?: number, w?: number): Vector;
    '-='(x: X, y?: number, z?: number, w?: number): Vector;
    '/='(x: X, y?: number, z?: number, w?: number): Vector;
    '*='(x: X, y?: number, z?: number, w?: number): Vector;
    '+='(x: X, y?: number, z?: number, w?: number): Vector;
    '='(x: X, y?: number, z?: number, w?: number): Vector;
    inverse(): Vector;
    abstract copy(): Vector;
}
export default Vector;
