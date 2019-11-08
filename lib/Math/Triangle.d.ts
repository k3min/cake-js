import Ray, { Intersectable, RayHit } from './Ray';
import Vector3 from './Vector3';
declare class Triangle extends Array<Vector3> implements Intersectable {
    constructor(v0?: Vector3, v1?: Vector3, v2?: Vector3);
    intersect(ray: Ray): RayHit | false;
}
export default Triangle;
