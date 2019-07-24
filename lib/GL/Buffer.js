import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import GL from './GL';
export var BufferType;
(function (BufferType) {
    BufferType[BufferType["Array"] = 34962] = "Array";
    BufferType[BufferType["ElementArray"] = 34963] = "ElementArray";
})(BufferType || (BufferType = {}));
class Buffer extends BindableGraphicsObject {
    constructor(target, data, length) {
        super(() => GL.createBuffer(), (handle) => GL.bindBuffer(target, handle), (handle) => GL.deleteBuffer(handle));
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
        GL.bufferData(this.target, this.data, GL.STATIC_DRAW);
    }
}
export default Buffer;
