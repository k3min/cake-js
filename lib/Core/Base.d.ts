import Disposable from './Disposable';
declare abstract class Base implements Disposable {
    abstract name: string;
    protected disposed: boolean;
    dispose(): boolean;
    protected abstract disposing(): void;
}
export default Base;
