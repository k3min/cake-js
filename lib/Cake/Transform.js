import { Base } from '../Core';
import { Matrix4x4, Vector3 } from '../Math';
class Transform extends Base {
    constructor() {
        super(...arguments);
        this.position = Vector3.zero;
        this.worldToLocal = Matrix4x4.identity;
        this.localToWorld = Matrix4x4.identity;
    }
}
export default Transform;
