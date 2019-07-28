import { Base } from '../Core';

abstract class SceneObject extends Base {
	public enabled: boolean = true;
	public name: string = 'SceneObject';

	protected abstract disposing(): void;

	public update(): void {
		if (!this.enabled) {
			return;
		}

		this.updating();
	}

	public abstract updating(): void;
}

export default SceneObject;