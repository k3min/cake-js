import { Drawable } from '../GL/Helpers';
import { Matrix4x4 } from '../Math';
import Vector3 from '../Math/Vector3';
import Camera from './Camera';
import Material from './Material';
import Model from './Model';
import Transform from './Transform';

class Renderer extends Transform implements Drawable {
	public name: string = 'Renderer';

	// @ts-ignore
	public model: Model;

	// @ts-ignore
	public material: Material;

	public readonly scale: Vector3 = Vector3.one;

	protected readonly modelView: Matrix4x4 = Matrix4x4.identity;
	protected readonly modelViewProjection: Matrix4x4 = Matrix4x4.identity;

	public update(): void {
		this.localToWorld[0] = this.scale[0];
		this.localToWorld[5] = this.scale[1];
		this.localToWorld[10] = this.scale[2];

		this.localToWorld[12] = this.position[0];
		this.localToWorld[13] = this.position[1];
		this.localToWorld[14] = this.position[2];

		Matrix4x4.inverse(this.localToWorld, this.worldToLocal);

		Matrix4x4.multiply(Camera.main.worldToLocal, this.localToWorld, this.modelView);
		Matrix4x4.multiply(Camera.main.viewProjection, this.localToWorld, this.modelViewProjection);

		this.material.setMatrix4x4('_Object2World', this.localToWorld);
		this.material.setMatrix4x4('_World2Object', this.worldToLocal);

		this.material.setMatrix4x4('MATRIX_MV', this.modelView);
		this.material.setMatrix4x4('MATRIX_MVP', this.modelViewProjection);
	}

	public draw(): void {
		this.material.use();
		this.model.draw();
	}

	protected disposing(): void {
		this.model.dispose();
		this.material.dispose();
	}
}

export default Renderer;