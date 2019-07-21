import BindableObject from '../../Helpers/BindableObject';
class BindableGraphicsObject extends BindableObject {
    constructor(genFn, bindFn, releaseFn) {
        super();
        this.handle = genFn();
        this.bindFn = bindFn;
        this.deleteFn = releaseFn;
    }
    afterBind() {
        this.bindFn(this.handle);
    }
    afterUnbind() {
        this.bindFn(null);
    }
    dispose() {
        super.dispose();
        this.deleteFn(this.handle);
    }
}
export default BindableGraphicsObject;
