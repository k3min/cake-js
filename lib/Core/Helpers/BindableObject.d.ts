import Bindable from '../Bindable';
import Base from '../Base';
import Storage from './Storage';
declare abstract class BindableObject<T extends BindableObject<T>> extends Base implements Bindable {
    name: string;
    static map: Storage<Bindable>;
    protected abstract readonly identifier: string;
    bind(): boolean;
    unbind(): boolean;
    protected abstract binding(): void;
    protected abstract unbinding(): void;
    dispose(): void;
}
export default BindableObject;
