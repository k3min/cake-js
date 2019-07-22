import Bindable from './Bindable';
import Base from './Base';
import Null from './Null';
import Storage from './Storage';
declare abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
    name: string;
    protected static map: Storage<Null<Bindable>>;
    protected abstract readonly identifier: string;
    bind(): boolean;
    unbind(): boolean;
    protected abstract onBind(): void;
    protected abstract onUnbind(): void;
    dispose(): void;
}
export default BindableObject;
