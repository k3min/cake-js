import Bindable from './Bindable';
import Base from './Base';
import Indexable from './Indexable';
import Null from './Null';

abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
	public name: string = 'BindableObject';

	public static map: Indexable<Null<Bindable>> = {};

	protected abstract get identifier(): string;

	public bind(): boolean {
		if (this.disposed) {
			throw new ReferenceError(`${ this.identifier } (${ this.name }): disposed`);
		}

		const previous: Bindable = BindableObject.map[this.identifier] as Bindable;

		if (previous === this) {
			return false;
		}

		if (previous) {
			//bound.unbind();
		}

		BindableObject.map[this.identifier] = this;

		this.onBind();

		return true;
	}

	public unbind(): boolean {
		const previous: Bindable = BindableObject.map[this.identifier] as Bindable;

		if (!previous) {
			return false;
		}

		this.onUnbind();

		BindableObject.map[this.identifier] = null;

		return true;
	}

	protected abstract onBind(): void;

	protected abstract onUnbind(): void;

	public dispose(): boolean {
		const disposed: boolean = super.dispose();

		if (!disposed) {
			this.unbind();
		}

		return disposed;
	}
}

export default BindableObject;