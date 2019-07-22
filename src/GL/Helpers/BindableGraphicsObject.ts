import BindableObject from '../../Helpers/BindableObject';
import Disposable from '../../Helpers/Disposable';
import Null from '../../Helpers/Null';

abstract class BindableGraphicsObject<T extends BindableGraphicsObject<T, GL>, GL extends WebGLObject> extends BindableObject<T> implements Disposable {
	public name: string = 'BindableGraphicsObject';

	public readonly handle: GL;

	private readonly bindFn: (handle: Null<GL>) => void;
	private readonly deleteFn: (handle: GL) => void;

	protected constructor(genFn: () => GL | null, bindFn: (handle: Null<GL>) => void, releaseFn: (handle: GL) => void) {
		super();

		this.handle = genFn() as GL;

		this.bindFn = bindFn;
		this.deleteFn = releaseFn;
	}

	protected onBind(): void {
		this.bindFn(this.handle);
	}

	protected onUnbind(): void {
		this.bindFn(null);
	}

	public dispose(): void {
		super.dispose();

		this.deleteFn(this.handle);
	}
}

export default BindableGraphicsObject;