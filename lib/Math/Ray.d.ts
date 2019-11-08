import Vector3 from './Vector3';
export interface Intersectable {
    intersect(ray: Ray): RayHit | false;
}
export interface RayHit {
    readonly point: Vector3;
    readonly distance: number;
    readonly normal: Vector3;
    readonly triangle: number;
}
declare class Ray {
    readonly origin: Vector3;
    readonly direction: Vector3;
    constructor(origin: Vector3, direction: Vector3);
    getPoint(distance: number): Vector3;
}
export default Ray;
