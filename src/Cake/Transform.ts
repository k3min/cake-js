import { Updatable } from '../Core';
import { Matrix4x4, Vector3 } from '../Math';
import SceneObject from './SceneObject';

abstract class Transform extends SceneObject implements Updatable {
	public readonly position: Vector3 = Vector3.zero;

	public readonly worldToLocal: Matrix4x4 = Matrix4x4.identity;
	public readonly localToWorld: Matrix4x4 = Matrix4x4.identity;

	public get forward(): Vector3 {
		return this.worldToLocal.forward;
	}

	public get up(): Vector3 {
		return this.worldToLocal.up;
	}

	public get right(): Vector3 {
		return this.worldToLocal.right;
	}
}

export default Transform;