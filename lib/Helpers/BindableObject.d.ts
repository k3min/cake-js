import Bindable from './Bindable';
import Base from './Base';
import Indexable from './Indexable';
import Null from './Null';
declare abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
    name: string;
    static map: Indexable<Null<Bindable>>;
    protected abstract readonly identifier: string;
    bind(): boolean;
    unbind(): boolean;
    protected abstract onBind(): void;
    protected abstract onUnbind(): void;
    dispose(): boolean;
}
export default BindableObject;
