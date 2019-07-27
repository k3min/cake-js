import Context from './Context';
import { BindableGraphicsObject } from './Helpers';
export var BufferType;
(function (BufferType) {
    BufferType[BufferType["Array"] = 34962] = "Array";
    BufferType[BufferType["ElementArray"] = 34963] = "ElementArray";
})(BufferType || (BufferType = {}));
class Buffer extends BindableGraphicsObject {
    constructor(target, data, length) {
        super(() => Context.createBuffer(), (handle) => Context.bindBuffer(target, handle), (handle) => Context.deleteBuffer(handle));
        this.name = 'Buffer';
        this.target = target;
        this.data = data;
        this.length = length;
        this.apply();
    }
    get identifier() {
        return 'Buffer';
    }
    apply() {
        this.bind();
        Context.bufferData(this.target, this.data, Context.STATIC_DRAW);
    }
}
export default Buffer;
