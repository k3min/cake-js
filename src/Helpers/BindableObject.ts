import Bindable from './Bindable';
import Base from './Base';
import Null from './Null';
import Storage from './Storage';

abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
	public name: string = 'BindableObject';

	protected static map: Storage<Null<Bindable>> = new Storage<Null<Bindable>>();

	protected abstract get identifier(): string;

	public bind(): boolean {
		const previous: Null<BindableObject<T>> = BindableObject.map.get(this.identifier) as Null<BindableObject<T>>;

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
		const previous: Null<BindableObject<T>> = BindableObject.map.get(this.identifier) as Null<BindableObject<T>>;

		if (!previous) {
			return false;
		}

		this.onUnbind();

		BindableObject.map.set(this.identifier, null);

		return true;
	}

	protected abstract onBind(): void;

	protected abstract onUnbind(): void;

	public dispose(): void {
		this.unbind();
	}
}

export default BindableObject;