import Disposable from './Disposable';

abstract class Base implements Disposable {
	public abstract name: string;
	protected _disposed: boolean = false;

	public get disposed(): boolean {
		return this._disposed;
	}

	public dispose(): void {
		if (this._disposed) {
			throw new ReferenceError(`Base ${ this.name }: already disposed`);
		}

		this.disposing();

		this._disposed = true;
	}

	protected abstract disposing(): void;
}

export default Base;