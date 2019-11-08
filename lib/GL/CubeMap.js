import { Exception, Path } from '../Core';
import { CubeMapFlags, DirectDrawSurfaceParser } from '../Parsers';
import Context from './Context';
import TextureFilterMode from './Helpers/TextureFilterMode';
import Texture, { TextureTarget } from './Texture';
/**
 * @todo Set appropriate filter / wrap
 */
class CubeMap extends Texture {
    constructor(width, height, format) {
        super(width, height, format, TextureTarget.CubeMap, () => Context.createTexture(), (handle) => Context.bindTexture(TextureTarget.CubeMap, handle), (handle) => Context.deleteTexture(handle));
        this.name = 'CubeMap';
    }
    static async load(uri) {
        const name = Path.getFileName(uri);
        let dds;
        try {
            dds = await DirectDrawSurfaceParser.load(uri);
        }
        catch (e) {
            throw new Exception(`CubeMap (${name}): failed to load DirectDrawSurface '${uri}'`, e);
        }
        if ((dds.ddsHeader.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
            throw new TypeError(`CubeMap (${name}): loaded DirectDrawSurface is missing CubeMap flag`);
        }
        const result = new CubeMap(dds.width, dds.height, dds.textureFormat);
        result.name = name;
        result.mipmapCount = dds.mipmapCount;
        if (result.mipmapCount > 0) {
            result.filterMode = TextureFilterMode.Trilinear;
        }
        result.parse(dds);
        return result;
    }
    parse(dds) {
        let offset = 0;
        offset += 4 + dds.ddsHeader.size;
        if (dds.isDX10) {
            offset += 20;
        }
        this.data = new Array(6);
        for (let face = 0; face < 6; face++) {
            let width = dds.width;
            let height = dds.height;
            this.data[face] = new Array(this.mipmapCount);
            for (let level = 0; level < this.mipmapCount; level++) {
                const length = width * height * 4;
                const data = new Float32Array(dds.reader.buffer, offset, length);
                this.data[face][level] = { data, width, height };
                offset += length * Float32Array.BYTES_PER_ELEMENT;
                width >>= 1;
                height >>= 1;
            }
        }
        this.apply();
    }
    apply() {
        super.apply();
        const { internalFormat, format, type } = this.pixel;
        for (let face = 0; face < 6; face++) {
            const data = this.data[face];
            for (let level = 0; level < this.mipmapCount; level++) {
                const mipmap = data[level];
                Context.texImage2D(Context.TEXTURE_CUBE_MAP_POSITIVE_X + face, level, internalFormat, mipmap.width, mipmap.height, 0, format, type, mipmap.data);
            }
        }
    }
}
export default CubeMap;
