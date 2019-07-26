import Disposable from './Disposable';

abstract class Base implements Disposable {
	public abstract name: string;
	protected disposed: boolean = false;

	public dispose(): boolean {
		if (this.disposed) {
			return false;
		}

		this.disposing();

		this.disposed = true;

		return true;
	}

	protected abstract disposing(): void;
}

export default Base;