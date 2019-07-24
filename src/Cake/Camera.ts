import { Shader } from '../GL';
import { Matrix4x4, Vector3 } from '../Math';
import Transform from './Transform';

class Camera extends Transform {
	public static main: Camera;

	public name: string = 'Camera';

	public fov: number = 70;
	public near: number = 0.1;
	public far: number = 100;

	public readonly position: Vector3 = new Vector3(0, 0, -10);
	public readonly target: Vector3 = Vector3.zero;

	public readonly projection: Matrix4x4 = Matrix4x4.identity;
	public readonly viewProjection: Matrix4x4 = Matrix4x4.identity;

	public constructor() {
		super();

		Camera.main = this;
	}

	public update(): void {
		this.projection.perspective(this.fov, 1, this.near, this.far);

		this.worldToLocal.lookAt(this.position, this.target);

		Matrix4x4.inverse(this.worldToLocal, this.localToWorld);

		Matrix4x4.multiply(this.projection, this.worldToLocal, this.viewProjection);

		Shader.setMatrix4x4('MATRIX_P', this.projection);
		Shader.setMatrix4x4('MATRIX_VP', this.viewProjection);
		Shader.setMatrix4x4('MATRIX_V', this.worldToLocal);
	}

	protected disposing(): void {
	}
}

export default Camera;