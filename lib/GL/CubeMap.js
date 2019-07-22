import Path from '../Helpers/Path';
import DirectDrawSurface, { CubeMapFlags } from './Helpers/DirectDrawSurface';
import Texture from './Texture';
import gl from './index';
class CubeMap extends Texture {
    constructor(width, height, format) {
        super(width, height, format, gl.TEXTURE_CUBE_MAP, () => gl.createTexture(), (handle) => gl.bindTexture(gl.TEXTURE_CUBE_MAP, handle), (handle) => gl.deleteTexture(handle));
        this.name = 'CubeMap';
    }
    static async load(url) {
        const dds = await DirectDrawSurface.load(url);
        if ((dds.header.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
            throw new TypeError();
        }
        const result = new CubeMap(dds.width, dds.height, dds.textureFormat);
        result.name = Path.getFileName(url);
        result.parse(dds);
        return result;
    }
    parse(dds) {
        let offset = 0;
        offset += 4 + dds.header.size;
        if (dds.dx10) {
            offset += 20;
        }
        this.data = new Array(6);
        for (let face = 0; face < this.data.length; face++) {
            let width = dds.width;
            let height = dds.height;
            this.data[face] = new Array(dds.mipMapCount);
            for (let mipmap = 0; mipmap < this.data[face].length; mipmap++) {
                const length = width * height * 4;
                const data = new Float32Array(dds.reader.buffer, offset, length);
                this.data[face][mipmap] = { data, width, height };
                offset += length * Float32Array.BYTES_PER_ELEMENT;
                width >>= 1;
                height >>= 1;
            }
        }
        if (dds.mipMapCount) {
            //this.mipmap = true;
            //this.filter = TextureFilter.trilinear;
        }
        this.apply();
    }
    apply() {
        if (!this.data) {
            return;
        }
        this.bind();
        const datas = this.data;
        for (let face = 0; face < datas.length; face++) {
            const data = datas[face];
            for (let mipmap = 0; mipmap < data.length; mipmap++) {
                let part = data[mipmap];
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, mipmap, this.pixelInternalFormat, part.width, part.height, 0, this.pixelFormat, this.pixelType, part.data);
            }
        }
    }
}
export default CubeMap;
