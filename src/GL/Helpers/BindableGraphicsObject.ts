import { Null, Disposable, BindableObject } from '../../Helpers';

abstract class BindableGraphicsObject<T extends BindableGraphicsObject<T, GL>, GL extends WebGLObject> extends BindableObject<T> implements Disposable {
	public name: string = 'BindableGraphicsObject';

	public readonly handle: GL;

	private readonly bindFn: (handle: Null<GL>) => void;
	private readonly deleteFn: (handle: GL) => void;

	protected constructor(genFn: () => Null<GL>, bindFn: (handle: Null<GL>) => void, releaseFn: (handle: GL) => void) {
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

	protected disposing(): void {
		this.deleteFn(this.handle);
	}
}

export default BindableGraphicsObject;