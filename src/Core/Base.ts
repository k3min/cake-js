import Disposable from './Disposable';

abstract class Base implements Disposable {
	public disposed: boolean = false;
	public abstract name: string;

	public dispose(): void {
		if (this.disposed) {
			throw new ReferenceError(`Base ${ this.name }: already disposed`);
		}

		this.disposing();

		this.disposed = true;
	}

	protected abstract disposing(): void;
}

export default Base;