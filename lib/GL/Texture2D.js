import Path from '../Helpers/Path';
import Vector4 from '../Math/Vector4';
import gl from './index';
import Texture from './Texture';
class Texture2D extends Texture {
    constructor(width, height, format) {
        super(width, height, format, gl.TEXTURE_2D, () => gl.createTexture(), (handle) => gl.bindTexture(gl.TEXTURE_2D, handle), (handle) => gl.deleteTexture(handle));
        this.name = 'Texture2D';
        this.texelSize = new Vector4(0, 0, 0, 0);
    }
    static async load(url, format) {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => {
                const result = new Texture2D(image.width, image.height, format);
                result.name = Path.getFileName(url);
                result.data = image;
                result.apply();
                resolve(result);
            };
            image.src = url;
        });
    }
    apply() {
        this.bind();
        this.set(gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        this.set(gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        this.set(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        this.set(gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.texelSize[0] = this.width;
        this.texelSize[1] = this.height;
        this.texelSize[2] = 1 / this.width;
        this.texelSize[3] = 1 / this.height;
        if (this.data !== null && this.data instanceof Image) {
            gl.texImage2D(this.target, 0, this.pixelInternalFormat, this.pixelFormat, this.pixelType, this.data);
        }
        else {
            gl.texImage2D(this.target, 0, this.pixelInternalFormat, this.width, this.height, 0, this.pixelFormat, this.pixelType, this.data);
        }
    }
}
export default Texture2D;
