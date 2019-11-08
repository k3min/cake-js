class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    getPoint(distance) {
        return (this.origin)['+']((this.direction)['*'](distance));
    }
}
export default Ray;
