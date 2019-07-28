import Disposable from './Disposable';
declare abstract class Base implements Disposable {
    abstract name: string;
    protected _disposed: boolean;
    readonly disposed: boolean;
    dispose(): void;
    protected abstract disposing(): void;
}
export default Base;
