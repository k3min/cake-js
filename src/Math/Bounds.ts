import Ray, { Intersectable, RayHit } from './Ray';
import Vector3 from './Vector3';

class Bounds implements Intersectable {
	public readonly center: Vector3;
	public readonly extents: Vector3;

	public get size(): Vector3 {
		return (this.extents)['*'](2);
	}

	public set size(value: Vector3) {
		(this.extents)['=']((value)['*'](0.5));
	}

	public get min(): Vector3 {
		return (this.center)['-'](this.extents);
	}

	public set min(value: Vector3) {
		this.setMinMax(value, this.max);
	}

	public get max(): Vector3 {
		return (this.center)['+'](this.extents);
	}

	public set max(value: Vector3) {
		this.setMinMax(this.min, value);
	}

	public constructor(center: Vector3, size: Vector3) {
		this.center = center;
		this.extents = (size)['*'](0.5);
	}

	public setMinMax(min: Vector3, max: Vector3): Bounds {
		(this.extents)['='](((max)['-'](min))['*'](0.5));
		(this.center)['=']((min)['+'](this.extents));

		return this;
	}

	public encapsulate(point: Vector3): Bounds {
		return this.setMinMax(Vector3.min(this.min, point), Vector3.max(this.max, point));
	}

	public intersect(ray: Ray): RayHit | false {
		const dir: Vector3 = ray.direction.copy().inverse();

		const t1: Vector3 = ((this.min)['-'](ray.origin))['*'](dir);
		const t2: Vector3 = ((this.max)['-'](ray.origin))['*'](dir);

		const min: Vector3 = Vector3.min(t1, t2);
		const max: Vector3 = Vector3.max(t1, t2);

		const maxMin: number = Math.max(min[0], min[1], min[2]);
		const minMax: number = Math.min(max[0], max[1], max[2]);

		if (minMax < maxMin || maxMin < 0) {
			return false;
		}

		return {
			distance: maxMin,
			point: ray.getPoint(maxMin),
			normal: Vector3.zero,
			triangle: -1,
		};
	}
}

export default Bounds;