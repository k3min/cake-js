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

	protected readonly prevLocalToWorld: Matrix4x4 = Matrix4x4.identity;

	public update(): void {
		this.localToWorld.copyTo(this.prevLocalToWorld);

		this.localToWorld.translation = this.position;
		this.localToWorld.scaling = this.scale;

		Matrix4x4.inverse(this.localToWorld, this.worldToLocal);

		Matrix4x4.multiply(Camera.main.worldToLocal, this.localToWorld, this.modelView);
		Matrix4x4.multiply(Camera.main.viewProjection, this.localToWorld, this.modelViewProjection);

		this.material.setMatrix4x4('cake_PreviousM', this.prevLocalToWorld);

		this.material.setMatrix4x4('cake_ObjectToWorld', this.localToWorld);
		this.material.setMatrix4x4('cake_WorldToObject', this.worldToLocal);

		this.material.setMatrix4x4('cake_ModelView', this.modelView);
		this.material.setMatrix4x4('cake_ModelViewProjection', this.modelViewProjection);
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