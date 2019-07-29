import Bindable from '../Bindable';
import Base from '../Base';
import Storage from './Storage';

abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
	public name: string = 'BindableObject';

	public static map: Storage<Bindable> = new Storage<Bindable>();

	protected abstract get identifier(): string;

	public bind(): boolean {
		if (this.disposed) {
			throw new ReferenceError(`${ this.identifier } (${ this.name }): disposed`);
		}

		const previous: Bindable = BindableObject.map.get(this.identifier) as Bindable;

		if (previous === this) {
			return false;
		}

		if (previous !== undefined) {
			//bound.unbind();
		}

		BindableObject.map.set(this.identifier, this);

		this.binding();

		return true;
	}

	public unbind(): boolean {
		const previous: Bindable = BindableObject.map.get(this.identifier) as Bindable;

		if (previous === undefined) {
			return false;
		}

		this.unbinding();

		BindableObject.map.delete(this.identifier);

		return true;
	}

	protected abstract binding(): void;

	protected abstract unbinding(): void;

	public dispose(): void {
		this.unbind();
		super.dispose();
	}
}

export default BindableObject;