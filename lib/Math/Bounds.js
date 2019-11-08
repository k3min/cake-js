import Vector3 from './Vector3';
class Bounds {
    get size() {
        return (this.extents)['*'](2);
    }
    set size(value) {
        (this.extents)['=']((value)['*'](0.5));
    }
    get min() {
        return (this.center)['-'](this.extents);
    }
    set min(value) {
        this.setMinMax(value, this.max);
    }
    get max() {
        return (this.center)['+'](this.extents);
    }
    set max(value) {
        this.setMinMax(this.min, value);
    }
    constructor(center, size) {
        this.center = center;
        this.extents = (size)['*'](0.5);
    }
    setMinMax(min, max) {
        (this.extents)['='](((max)['-'](min))['*'](0.5));
        (this.center)['=']((min)['+'](this.extents));
        return this;
    }
    encapsulate(point) {
        return this.setMinMax(Vector3.min(this.min, point), Vector3.max(this.max, point));
    }
    intersect(ray) {
        const dir = ray.direction.copy().inverse();
        const t1 = ((this.min)['-'](ray.origin))['*'](dir);
        const t2 = ((this.max)['-'](ray.origin))['*'](dir);
        const min = Vector3.min(t1, t2);
        const max = Vector3.max(t1, t2);
        const maxMin = Math.max(min[0], min[1], min[2]);
        const minMax = Math.min(max[0], max[1], max[2]);
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
