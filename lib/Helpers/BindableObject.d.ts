import Bindable from './Bindable';
import Base from './Base';
import Null from './Null';
import Storage from './Storage';
declare abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
    protected static map: Storage<Null<Bindable>>;
    protected abstract readonly identifier: string;
    bind(): boolean;
    unbind(): void;
    protected beforeBind(previous: Null<T>): void;
    protected afterBind(): void;
    protected beforeUnbind(previous: T): void;
    protected afterUnbind(): void;
    dispose(): void;
}
export default BindableObject;
