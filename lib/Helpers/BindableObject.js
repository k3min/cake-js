import Base from './Base';
import Storage from './Storage';
class BindableObject extends Base {
    bind() {
        const bound = BindableObject.map.get(this.identifier);
        if (bound === this) {
            return false;
        }
        if (bound) {
            //bound.unbind();
        }
        this.beforeBind(bound);
        BindableObject.map.set(this.identifier, this);
        this.afterBind();
        return true;
    }
    unbind() {
        const bound = BindableObject.map.get(this.identifier);
        if (!bound) {
            return;
        }
        this.beforeUnbind(bound);
        BindableObject.map.set(this.identifier, null);
        this.afterUnbind();
    }
    // @ts-ignore
    beforeBind(previous) {
    }
    afterBind() {
    }
    // @ts-ignore
    beforeUnbind(previous) {
    }
    afterUnbind() {
    }
    dispose() {
        this.unbind();
    }
}
BindableObject.map = new Storage();
export default BindableObject;
