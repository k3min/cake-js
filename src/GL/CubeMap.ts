import Path from '../Helpers/Path';
import DirectDrawSurface, { CubeMapFlags } from './Helpers/DirectDrawSurface';
import Texture, { Mipmap } from './Texture';
import gl from './index';

class CubeMap extends Texture<WebGLTexture> {
	public name: string = 'CubeMap';

	public constructor(width: number, height: number, format: number) {
		super(width, height, format, gl.TEXTURE_CUBE_MAP, () => gl.createTexture(), (handle) => gl.bindTexture(gl.TEXTURE_CUBE_MAP, handle), (handle) => gl.deleteTexture(handle));
	}

	public static async load(url: string): Promise<CubeMap> {
		const dds: DirectDrawSurface = await DirectDrawSurface.load(url);

		if ((dds.header.cubeMapFlags & CubeMapFlags.CubeMap) === 0) {
			throw new TypeError();
		}

		const result: CubeMap = new CubeMap(dds.width, dds.height, dds.textureFormat);

		result.name = Path.getFileName(url);

		result.parse(dds);

		return result;
	}

	private parse(dds: DirectDrawSurface): void {
		let offset: number = 0;

		offset += 4 + dds.header.size;

		if (dds.dx10) {
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

				gl.texImage2D(
					gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
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