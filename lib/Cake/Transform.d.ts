import { Base, Updatable } from '../Helpers';
import { Matrix4x4, Vector3 } from '../Math';
declare abstract class Transform extends Base implements Updatable {
    readonly position: Vector3;
    readonly worldToLocal: Matrix4x4;
    readonly localToWorld: Matrix4x4;
    abstract update(): void;
}
export default Transform;
