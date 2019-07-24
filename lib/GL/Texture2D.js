import { Path } from '../Helpers';
import { Vector4 } from '../Math';
import GL from './GL';
import Texture, { TextureTarget } from './Texture';
class Texture2D extends Texture {
    constructor(width, height, format) {
        super(width, height, format, TextureTarget.Texture2D, () => GL.createTexture(), (handle) => GL.bindTexture(TextureTarget.Texture2D, handle), (handle) => GL.deleteTexture(handle));
        this.name = 'Texture2D';
        this.texelSize = new Vector4(0, 0, 0, 0);
    }
    static async load(url, format) {
        return new Promise((resolve) => {
            const image = new Image();
            image.addEventListener('load', () => {
                const result = new Texture2D(image.width, image.height, format);
                result.name = Path.getFileName(url);
                result.data = image;
                result.apply();
                resolve(result);
            });
            image.src = url;
        });
    }
    apply() {
        this.bind();
        this.set(GL.TEXTURE_MIN_FILTER, GL.LINEAR);
        this.set(GL.TEXTURE_MAG_FILTER, GL.LINEAR);
        this.set(GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        this.set(GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        this.texelSize[0] = this.width;
        this.texelSize[1] = this.height;
        this.texelSize[2] = 1 / this.width;
        this.texelSize[3] = 1 / this.height;
        if (this.data !== null && this.data) {
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            GL.texImage2D(this.target, 0, this.pixelFormat, this.pixelFormat, this.pixelType, this.data);
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, false);
        }
        else {
            GL.texImage2D(this.target, 0, this.pixelFormat, this.width, this.height, 0, this.pixelFormat, this.pixelType, this.data);
        }
    }
}
export default Texture2D;
