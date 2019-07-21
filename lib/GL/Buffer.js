import BindableObject from '../Helpers/BindableObject';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
export var BufferTarget;
(function (BufferTarget) {
    BufferTarget[BufferTarget["ElementArray"] = gl.ELEMENT_ARRAY_BUFFER] = "ElementArray";
    BufferTarget[BufferTarget["Array"] = gl.ARRAY_BUFFER] = "Array";
})(BufferTarget || (BufferTarget = {}));
export var BufferUsage;
(function (BufferUsage) {
    BufferUsage[BufferUsage["Static"] = gl.STATIC_DRAW] = "Static";
    BufferUsage[BufferUsage["Dynamic"] = gl.DYNAMIC_DRAW] = "Dynamic";
})(BufferUsage || (BufferUsage = {}));
class Buffer extends BindableGraphicsObject {
    constructor(target, data, length, usage = BufferUsage.Static) {
        super(gl.createBuffer, (handle) => gl.bindBuffer(target, handle), gl.deleteBuffer);
        this.target = target;
        this.data = data;
        this.length = length;
        this.usage = usage;
        this.apply();
        this.unbind();
    }
    static get bound() {
        return BindableObject.map.get('buffer');
    }
    apply() {
        this.bind();
        gl.bufferData(this.target, this.data, this.usage);
    }
    static unbind(type) {
        gl.bindBuffer(type, null);
    }
}
export default Buffer;
