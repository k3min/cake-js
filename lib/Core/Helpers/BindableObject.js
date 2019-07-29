import Base from '../Base';
import Storage from './Storage';
class BindableObject extends Base {
    constructor() {
        super(...arguments);
        this.name = 'BindableObject';
    }
    bind() {
        if (this.disposed) {
            throw new ReferenceError(`${this.identifier} (${this.name}): disposed`);
        }
        const previous = BindableObject.map.get(this.identifier);
        if (previous === this) {
            return false;
        }
        if (previous !== undefined) {
            //bound.unbind();
        }
        BindableObject.map.set(this.identifier, this);
        this.binding();
        return true;
    }
    unbind() {
        const previous = BindableObject.map.get(this.identifier);
        if (previous === undefined) {
            return false;
        }
        this.unbinding();
        BindableObject.map.delete(this.identifier);
        return true;
    }
    dispose() {
        this.unbind();
        super.dispose();
    }
}
BindableObject.map = new Storage();
export default BindableObject;
