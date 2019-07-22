import Disposable from './Disposable';

abstract class Base implements Disposable {
	public abstract name: string;

	public abstract dispose(): void;
}

export default Base;