import Vector from './Vector';
class Vector2 extends Vector {
    constructor(x, y) {
        super(Vector2.LENGTH, x, y, 0, 0);
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
    }
    static get right() {
        return new Vector2(1, 0);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get up() {
        return new Vector2(0, 1);
    }
    static get down() {
        return new Vector2(0, -1);
    }
    clone() {
        return new Vector2(this);
    }
}
Vector2.LENGTH = 2;
export default Vector2;
