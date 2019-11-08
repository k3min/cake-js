import Ray, { Intersectable, RayHit } from './Ray';
import Vector3 from './Vector3';
declare class Bounds implements Intersectable {
    readonly center: Vector3;
    readonly extents: Vector3;
    size: Vector3;
    min: Vector3;
    max: Vector3;
    constructor(center: Vector3, size: Vector3);
    setMinMax(min: Vector3, max: Vector3): Bounds;
    encapsulate(point: Vector3): Bounds;
    intersect(ray: Ray): RayHit | false;
}
export default Bounds;
