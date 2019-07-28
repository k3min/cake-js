import { Exception, Path } from '../Core';
import { CubeMapFlags, DirectDrawSurfaceParser } from '../Parsers';
import Context from './Context';
import TextureFilterMode from './Helpers/TextureFilterMode';
import Texture, { CubeMapFace, Mipmap, TextureFormat, TextureTarget } from './Texture';

/**
 * @todo Set appropriate filter / wrap
 */
class CubeMap extends Texture<WebGLTexture> {
	public name: string = 'CubeMap';

	public constructor(width: number, height: number, format: TextureFormat) {
		super(width, height, format, TextureTarget.CubeMap, () => Context.createTexture(), (handle) => Context.bindTexture(TextureTarget.CubeMap, handle), (handle) => Context.deleteTexture(handle));
	}

	public static async load(uri: string): Promise<CubeMap> {
		const name: string = Path.getFileName(uri);

		let dds: DirectDrawSurfaceParser;

		try {
			dds = await DirectDrawSurfaceParser.load(uri);
		} catch (e) {
			throw new Exception(`CubeMap (${ name }): failed to load DirectDrawSurface '${ uri }'`, e);
		}

		if ((dds.ddsHeader.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
			throw new TypeError(`CubeMap (${ name }): loaded DirectDrawSurface is missing CubeMap flag`);
		}

		const result: CubeMap = new CubeMap(dds.width, dds.height, dds.textureFormat);

		result.name = name;
		result.mipmapCount = dds.mipmapCount;

		if (result.mipmapCount > 0) {
			result.filterMode = TextureFilterMode.Trilinear;
		}

		result.parse(dds);

		return result;
	}

	private parse(dds: DirectDrawSurfaceParser): void {
		let offset: number = 0;

		offset += 4 + dds.ddsHeader.size;

		if (dds.isDX10) {
			offset += 20;
		}

		this.data = new Array<CubeMapFace>(6);

		for (let face = 0; face < 6; face++) {
			let width: number = dds.width;
			let height: number = dds.height;

			this.data[face] = new Array<Mipmap>(this.mipmapCount);

			for (let level = 0; level < this.mipmapCount; level++) {
				const length: number = width * height * 4;
				const data: Float32Array = new Float32Array(dds.reader.buffer, offset, length);

				this.data[face][level] = { data, width, height };

				offset += length * Float32Array.BYTES_PER_ELEMENT;

				width >>= 1;
				height >>= 1;
			}
		}

		this.apply();
	}

	public apply(): void {
		super.apply();

		for (let face = 0; face < 6; face++) {
			const data: CubeMapFace = (this.data as CubeMapFace[])[face];

			for (let level = 0; level < this.mipmapCount; level++) {
				const mipmap: Mipmap = data[level];

				Context.texImage2D(
					Context.TEXTURE_CUBE_MAP_POSITIVE_X + face,
					level,
					this.pixelFormat,
					mipmap.width,
					mipmap.height,
					0,
					this.pixelFormat,
					this.pixelType,
					mipmap.data,
				);
			}
		}
	}
}

export default CubeMap;