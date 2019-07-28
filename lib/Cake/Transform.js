import { Base } from '../Core';
import { Matrix4x4, Vector3 } from '../Math';
class Transform extends Base {
    constructor() {
        super(...arguments);
        this.position = Vector3.zero;
        this.worldToLocal = Matrix4x4.identity;
        this.localToWorld = Matrix4x4.identity;
    }
    get forward() {
        return this.worldToLocal.forward;
    }
    get up() {
        return this.worldToLocal.up;
    }
    get right() {
        return this.worldToLocal.right;
    }
}
export default Transform;
