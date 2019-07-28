import Context, { Shader } from '../GL';
import { Matrix4x4, Vector3 } from '../Math';
import Transform from './Transform';

/**
 * @todo Implement Bindable
 */
class Camera extends Transform {
	public static main: Camera;

	public name: string = 'Camera';

	public fov: number = 70;
	public near: number = 0.1;
	public far: number = 100;

	public readonly position: Vector3 = new Vector3(0, 0, -10);
	public readonly target: Vector3 = Vector3.zero;

	public readonly projection: Matrix4x4 = Matrix4x4.identity;
	public readonly invProjection: Matrix4x4 = Matrix4x4.identity;
	public readonly viewProjection: Matrix4x4 = Matrix4x4.identity;

	public readonly prevViewProjection: Matrix4x4 = Matrix4x4.identity;

	public constructor() {
		super();

		Camera.main = this;
	}

	public update(): void {
		this.viewProjection.copyTo(this.prevViewProjection);

		Matrix4x4.lookAt(this.position, this.target, this.worldToLocal);
		Matrix4x4.inverse(this.worldToLocal, this.localToWorld);

		Matrix4x4.perspective(this.fov, Context.drawingBufferWidth / Context.drawingBufferHeight, this.near, this.far, this.projection);
		Matrix4x4.multiply(this.projection, this.worldToLocal, this.viewProjection);
		Matrix4x4.inverse(this.projection, this.invProjection);

		Shader.setMatrix4x4('cake_PreviousVP', this.prevViewProjection);

		Shader.setMatrix4x4('cake_CameraViewProjection', this.viewProjection);
		Shader.setMatrix4x4('cake_CameraProjection', this.projection);
		Shader.setMatrix4x4('cake_CameraInvProjection', this.invProjection);

		Shader.setMatrix4x4('cake_WorldToCamera', this.worldToLocal);
		Shader.setMatrix4x4('cake_CameraToWorld', this.localToWorld);

		Shader.setVector('cake_WorldSpaceCameraPos', this.position);
	}

	protected disposing(): void {
	}
}

export default Camera;