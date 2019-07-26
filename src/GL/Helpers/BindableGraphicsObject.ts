import { Disposable } from '../../Core';
import { Null, BindableObject } from '../../Core/Helpers';

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

	protected binding(): void {
		this.bindFn(this.handle);
	}

	protected unbinding(): void {
		this.bindFn(null);
	}

	protected disposing(): void {
		this.deleteFn(this.handle);
	}
}

export default BindableGraphicsObject;