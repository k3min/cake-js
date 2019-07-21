import { FramebufferTarget } from './Framebuffer';
import DirectDrawSurface, { CubeMapFlags } from './Helpers/DirectDrawSurface';
import Texture from './Texture';
import gl from './index';
export var CubeMapFace;
(function (CubeMapFace) {
    CubeMapFace[CubeMapFace["PosX"] = gl.TEXTURE_CUBE_MAP_POSITIVE_X] = "PosX";
    CubeMapFace[CubeMapFace["NegX"] = gl.TEXTURE_CUBE_MAP_NEGATIVE_X] = "NegX";
    CubeMapFace[CubeMapFace["PosY"] = gl.TEXTURE_CUBE_MAP_POSITIVE_Y] = "PosY";
    CubeMapFace[CubeMapFace["NegY"] = gl.TEXTURE_CUBE_MAP_NEGATIVE_Y] = "NegY";
    CubeMapFace[CubeMapFace["PosZ"] = gl.TEXTURE_CUBE_MAP_POSITIVE_Z] = "PosZ";
    CubeMapFace[CubeMapFace["NegZ"] = gl.TEXTURE_CUBE_MAP_NEGATIVE_Z] = "NegZ";
    CubeMapFace[CubeMapFace["Count"] = 6] = "Count";
})(CubeMapFace || (CubeMapFace = {}));
class CubeMap extends Texture {
    constructor(width, height, format) {
        super(width, height, format, FramebufferTarget.CubeMap, gl.createTexture, gl.bindTexture, gl.deleteTexture);
    }
    static async load(url) {
        const dds = await DirectDrawSurface.load(url);
        if ((dds.header.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
            throw new Error();
        }
        const result = new CubeMap(dds.width, dds.height, dds.textureFormat);
        result.name = url;
        result.parse(dds);
        return result;
    }
    parse(dds) {
        let offset = 0;
        offset += 4 + dds.header.size;
        if (dds.dx10) {
            offset += 20;
        }
        this.data = new Array(CubeMapFace.Count);
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
                gl.texImage2D(CubeMapFace.PosX + face, mipmap, this.pixelInternalFormat, part.width, part.height, 0, this.pixelFormat, this.pixelType, part.data);
            }
        }
    }
}
export default CubeMap;
