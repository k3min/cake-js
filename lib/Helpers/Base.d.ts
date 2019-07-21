import Disposable from './Disposable';
declare abstract class Base implements Disposable {
    name?: string;
    abstract dispose(): void;
}
export default Base;
