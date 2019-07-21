import DirectDrawSurface, { CubeMapFlags } from './Helpers/DirectDrawSurface';
import FramebufferTarget from './Helpers/FramebufferTarget';
import Texture, { Mipmap } from './Texture';
import gl from './index';

export enum CubeMapFace {
	PosX = gl.TEXTURE_CUBE_MAP_POSITIVE_X,
	NegX = gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
	PosY = gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
	NegY = gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
	PosZ = gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
	NegZ = gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
	Count = 6
}

class CubeMap extends Texture<WebGLTexture> {
	public constructor(width: number, height: number, format: number) {
		super(width, height, format, FramebufferTarget.CubeMap, gl.createTexture, gl.bindTexture, gl.deleteTexture);
	}

	public static async load(url: string): Promise<CubeMap> {
		const dds: DirectDrawSurface = await DirectDrawSurface.load(url);

		if ((dds.header.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
			throw new Error();
		}

		const result: CubeMap = new CubeMap(dds.width, dds.height, dds.textureFormat);

		result.name = url;

		result.parse(dds);

		return result;
	}

	private parse(dds: DirectDrawSurface): void {
		let offset: number = 0;

		offset += 4 + dds.header.size;

		if (dds.dx10) {
			offset += 20;
		}

		this.data = new Array<Mipmap[]>(CubeMapFace.Count);

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

				gl.texImage2D(
					CubeMapFace.PosX + face,
					mipmap,
					this.pixelInternalFormat,
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