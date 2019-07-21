import Bindable from './Bindable';
import Base from './Base';
import Null from './Null';
import Storage from './Storage';

abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
	protected static map: Storage<Null<Bindable>> = new Storage<Null<Bindable>>();

	protected abstract get identifier(): string;

	public bind(): boolean {
		const bound: Null<BindableObject<T>> = BindableObject.map.get(this.identifier) as Null<BindableObject<T>>;

		if (bound === this) {
			return false;
		}

		if (bound) {
			//bound.unbind();
		}

		this.beforeBind(bound as Null<T>);

		BindableObject.map.set(this.identifier, this);

		this.afterBind();

		return true;
	}

	public unbind(): void {
		const bound: Null<BindableObject<T>> = BindableObject.map.get(this.identifier) as Null<BindableObject<T>>;

		if (!bound) {
			return;
		}

		this.beforeUnbind(bound as T);

		BindableObject.map.set(this.identifier, null);

		this.afterUnbind();
	}

	// @ts-ignore
	protected beforeBind(previous: Null<T>): void {
	}

	protected afterBind(): void {
	}

	// @ts-ignore
	protected beforeUnbind(previous: T): void {
	}

	protected afterUnbind(): void {
	}

	public dispose(): void {
		this.unbind();
	}
}

export default BindableObject;