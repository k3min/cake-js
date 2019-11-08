import Context from './Context';
import Texture, { TextureTarget } from './Texture';
class Texture2DArray extends Texture {
    constructor(width, height, depth, format) {
        super(width, height, format, TextureTarget.Texture2DArray, () => Context.createTexture(), (handle) => Context.bindTexture(TextureTarget.Texture2DArray, handle), (handle) => Context.deleteTexture(handle));
        this.name = 'Texture2DArray';
        this.length = depth;
    }
    apply() {
        super.apply();
        const { internalFormat, format, type } = this.pixel;
        Context.texImage3D(this.target, 0, internalFormat, this.width, this.height, this.length, 0, format, type, null);
    }
}
export default Texture2DArray;
