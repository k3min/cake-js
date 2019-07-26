import Base from '../Base';
class BindableObject extends Base {
    constructor() {
        super(...arguments);
        this.name = 'BindableObject';
    }
    bind() {
        if (this.disposed) {
            throw new ReferenceError(`${this.identifier} (${this.name}): disposed`);
        }
        const previous = BindableObject.map[this.identifier];
        if (previous === this) {
            return false;
        }
        if (previous) {
            //bound.unbind();
        }
        BindableObject.map[this.identifier] = this;
        this.binding();
        return true;
    }
    unbind() {
        const previous = BindableObject.map[this.identifier];
        if (!previous) {
            return false;
        }
        this.unbinding();
        BindableObject.map[this.identifier] = null;
        return true;
    }
    dispose() {
        const disposed = super.dispose();
        if (!disposed) {
            this.unbind();
        }
        return disposed;
    }
}
BindableObject.map = {};
export default BindableObject;
