import Bindable from './Bindable';
import Base from './Base';
import Storage from './Storage';

abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
	public name: string = 'BindableObject';

	protected static map: Storage<Bindable> = new Storage<Bindable>();

	protected abstract get identifier(): string;

	public bind(): boolean {
		const previous: Bindable | undefined = BindableObject.map.get(this.identifier);

		if (previous === this) {
			return false;
		}

		if (previous) {
			//bound.unbind();
		}

		BindableObject.map.set(this.identifier, this);

		this.onBind();

		return true;
	}

	public unbind(): boolean {
		const previous: Bindable | undefined = BindableObject.map.get(this.identifier);

		if (!previous) {
			return false;
		}

		this.onUnbind();

		BindableObject.map.delete(this.identifier);

		return true;
	}

	protected abstract onBind(): void;

	protected abstract onUnbind(): void;

	public dispose(): void {
		this.unbind();
	}
}

export default BindableObject;