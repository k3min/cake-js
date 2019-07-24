import BindableObject from '../../Helpers/BindableObject';
class BindableGraphicsObject extends BindableObject {
    constructor(genFn, bindFn, releaseFn) {
        super();
        this.name = 'BindableGraphicsObject';
        this.handle = genFn();
        this.bindFn = bindFn;
        this.deleteFn = releaseFn;
    }
    onBind() {
        this.bindFn(this.handle);
    }
    onUnbind() {
        this.bindFn(null);
    }
    disposing() {
        this.deleteFn(this.handle);
    }
}
export default BindableGraphicsObject;
