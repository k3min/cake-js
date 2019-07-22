import Base from './Base';
import Storage from './Storage';
class BindableObject extends Base {
    constructor() {
        super(...arguments);
        this.name = 'BindableObject';
    }
    bind() {
        const previous = BindableObject.map.get(this.identifier);
        if (previous === this) {
            return false;
        }
        if (previous) {
            //bound.unbind();
        }
        BindableObject.map.set(this.identifier, this);
        this.onBind();
        return true;
    }
    unbind() {
        const previous = BindableObject.map.get(this.identifier);
        if (!previous) {
            return false;
        }
        this.onUnbind();
        BindableObject.map.delete(this.identifier);
        return true;
    }
    dispose() {
        this.unbind();
    }
}
BindableObject.map = new Storage();
export default BindableObject;
