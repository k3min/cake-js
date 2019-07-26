import { BindableGraphicsObject } from './Helpers';
import GL from './GL';
export var TextureTarget;
(function (TextureTarget) {
    TextureTarget[TextureTarget["Texture2D"] = 3553] = "Texture2D";
    TextureTarget[TextureTarget["CubeMap"] = 34067] = "CubeMap";
    TextureTarget[TextureTarget["RenderBuffer"] = 36161] = "RenderBuffer";
})(TextureTarget || (TextureTarget = {}));
class Texture extends BindableGraphicsObject {
    constructor(width, height, format, target, genFn, bindFn, releaseFn) {
        super(genFn, bindFn, releaseFn);
        this.name = 'Texture';
        this.parameters = {};
        this.data = null;
        this.width = width;
        this.height = height;
        this.format = format;
        this.target = target;
    }
    get identifier() {
        return 'Texture';
    }
    set(name, value) {
        if (this.parameters[name] === value) {
            return;
        }
        this.parameters[name] = value;
        GL.texParameteri(this.target, name, value);
    }
}
export default Texture;
