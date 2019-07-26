import GL, { Shader } from '../GL';
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
	public readonly invP: Matrix4x4 = Matrix4x4.identity;
	public readonly viewProjection: Matrix4x4 = Matrix4x4.identity;

	public constructor() {
		super();

		Camera.main = this;
	}

	public update(): void {
		this.projection.perspective(this.fov, GL.drawingBufferWidth / GL.drawingBufferHeight, this.near, this.far);

		Matrix4x4.inverse(this.projection, this.invP);

		this.worldToLocal.lookAt(this.position, this.target);

		Matrix4x4.inverse(this.worldToLocal, this.localToWorld);

		Matrix4x4.multiply(this.projection, this.worldToLocal, this.viewProjection);

		Shader.setMatrix4x4('MATRIX_P', this.projection);
		Shader.setMatrix4x4('MATRIX_VP', this.viewProjection);
		Shader.setMatrix4x4('MATRIX_V', this.worldToLocal);

		Shader.setMatrix4x4('_CameraInvP', this.invP);
		Shader.setMatrix4x4('_Camera2World', this.localToWorld);
	}

	protected disposing(): void {
	}
}

export default Camera;