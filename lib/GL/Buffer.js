import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
class Buffer extends BindableGraphicsObject {
    constructor(target, data, length) {
        super(gl.createBuffer, (handle) => gl.bindBuffer(target, handle), gl.deleteBuffer);
        this.target = target;
        this.data = data;
        this.length = length;
        this.apply();
        this.unbind();
    }
    static get bound() {
        return BindableGraphicsObject.map.get('buffer');
    }
    apply() {
        this.bind();
        gl.bufferData(this.target, this.data, gl.STATIC_DRAW);
    }
    static unbind(type) {
        gl.bindBuffer(type, null);
    }
}
export default Buffer;
