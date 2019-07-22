import Disposable from './Disposable';
declare abstract class Base implements Disposable {
    abstract name: string;
    abstract dispose(): void;
}
export default Base;
