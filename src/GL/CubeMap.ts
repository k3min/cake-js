import GL from './GL';
import { Path, Exception } from '../Core';
import { DirectDrawSurfaceParser, CubeMapFlags } from '../Parsers';
import { pixelFormat, PixelFormat, pixelType, PixelType } from './Helpers';
import Texture, { Mipmap, TextureTarget } from './Texture';

class CubeMap extends Texture<WebGLTexture> {
	public name: string = 'CubeMap';

	private readonly pixelFormat: PixelFormat;
	private readonly pixelType: PixelType;

	public constructor(width: number, height: number, format: number) {
		super(width, height, format, TextureTarget.CubeMap, () => GL.createTexture(), (handle) => GL.bindTexture(TextureTarget.CubeMap, handle), (handle) => GL.deleteTexture(handle));

		this.pixelFormat = pixelFormat(format);
		this.pixelType = pixelType(format);
	}

	public static async load(url: string): Promise<CubeMap> {
		let dds: DirectDrawSurfaceParser;

		try {
			dds = await DirectDrawSurfaceParser.load(url);
		} catch (e) {
			throw new Exception(`CubeMap: failed to load DirectDrawSurface '${ url }'`, e);
		}

		if ((dds.ddsHeader.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
			throw new TypeError();
		}

		const result: CubeMap = new CubeMap(dds.width, dds.height, dds.textureFormat);

		result.name = Path.getFileName(url);

		result.parse(dds);

		return result;
	}

	private parse(dds: DirectDrawSurfaceParser): void {
		let offset: number = 0;

		offset += 4 + dds.ddsHeader.size;

		if (dds.isDX10) {
			offset += 20;
		}

		this.data = new Array<Mipmap[]>(6);

		for (let face = 0; face < this.data.length; face++) {
			let width: number = dds.width;
			let height: number = dds.height;

			this.data[face] = new Array<Mipmap>(dds.mipMapCount);

			for (let mipmap = 0; mipmap < this.data[face].length; mipmap++) {
				const length: number = width * height * 4;
				const data: Float32Array = new Float32Array(dds.reader.buffer, offset, length);

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

	public apply(): void {
		if (!this.data) {
			return;
		}

		this.bind();

		const datas: Mipmap[][] = this.data as Mipmap[][];

		for (let face = 0; face < datas.length; face++) {
			const data = datas[face] as Mipmap[];

			for (let mipmap = 0; mipmap < data.length; mipmap++) {
				let part = data[mipmap];

				GL.texImage2D(
					GL.TEXTURE_CUBE_MAP_POSITIVE_X + face,
					mipmap,
					this.pixelFormat,
					part.width,
					part.height,
					0,
					this.pixelFormat,
					this.pixelType,
					part.data,
				);
			}
		}
	}
}

export default CubeMap;