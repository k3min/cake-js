import { BindableObject } from '../../Core/Helpers';
class BindableGraphicsObject extends BindableObject {
    constructor(genFn, bindFn, releaseFn) {
        super();
        this.name = 'BindableGraphicsObject';
        this.handle = genFn();
        this.bindFn = bindFn;
        this.deleteFn = releaseFn;
    }
    binding() {
        this.bindFn(this.handle);
    }
    unbinding() {
        this.bindFn(null);
    }
    disposing() {
        this.deleteFn(this.handle);
    }
}
export default BindableGraphicsObject;
