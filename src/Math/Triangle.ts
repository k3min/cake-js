import Ray, { Intersectable, RayHit } from './Ray';
import Vector3 from './Vector3';

class Triangle extends Array<Vector3> implements Intersectable {
	public constructor(v0: Vector3 = Vector3.zero, v1: Vector3 = Vector3.zero, v2: Vector3 = Vector3.zero) {
		super(3);

		this[0] = v0;
		this[1] = v1;
		this[2] = v2;
	}

	public intersect(ray: Ray): RayHit | false {
		const v0: Vector3 = this[0];
		const v1: Vector3 = this[1];
		const v2: Vector3 = this[2];

		let ab: Vector3 = (v1)['-'](v0);
		let ac: Vector3 = (v2)['-'](v0);

		let n: Vector3 = Vector3.cross(ab, ac);
		let d = Vector3.dot((ray.direction)['*'](-1), n);

		if (d <= 0.0) {
			return false;
		}

		let ap = (ray.origin)['-'](v0);
		let t = Vector3.dot(ap, n);

		if (t < 0.0) {
			return false;
		}

		let e = Vector3.cross((ray.direction)['*'](-1), ap);
		let v = Vector3.dot(ac, e);

		if (v < 0.0 || v > d) {
			return false;
		}

		let w = -Vector3.dot(ab, e);

		if (w < 0.0 || (v + w) > d) {
			return false;
		}

		t /= d;

		return {
			point: (ray.origin)['+']((ray.direction)['*'](t)),
			distance: t,
			normal: n.normalized,
			triangle: -1,
		};
	}
}

export default Triangle;