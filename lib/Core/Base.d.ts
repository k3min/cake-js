import Disposable from './Disposable';
declare abstract class Base implements Disposable {
    disposed: boolean;
    abstract name: string;
    dispose(): void;
    protected abstract disposing(): void;
}
export default Base;
