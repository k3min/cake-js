import { Updatable } from '../Core';
import { Matrix4x4, Vector3 } from '../Math';
import SceneObject from './SceneObject';
declare abstract class Transform extends SceneObject implements Updatable {
    readonly position: Vector3;
    readonly worldToLocal: Matrix4x4;
    readonly localToWorld: Matrix4x4;
    readonly forward: Vector3;
    readonly up: Vector3;
    readonly right: Vector3;
}
export default Transform;
