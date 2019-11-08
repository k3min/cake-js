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

class Ray {
	public readonly origin: Vector3;
	public readonly direction: Vector3;

	public constructor(origin: Vector3, direction: Vector3) {
		this.origin = origin;
		this.direction = direction;
	}

	public getPoint(distance: number): Vector3 {
		return (this.origin)['+']((this.direction)['*'](distance));
	}
}

export default Ray;