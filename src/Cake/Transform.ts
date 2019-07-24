import { Base, Updatable } from '../Helpers';
import { Matrix4x4, Vector3 } from '../Math';

abstract class Transform extends Base implements Updatable {
	public readonly position: Vector3 = Vector3.zero;

	public readonly worldToLocal: Matrix4x4 = Matrix4x4.identity;
	public readonly localToWorld: Matrix4x4 = Matrix4x4.identity;

	public abstract update(): void;
}

export default Transform;