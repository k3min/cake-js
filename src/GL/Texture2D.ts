import { Exception, Path } from '../Core';
import { isArrayLike, version } from '../Core/Helpers';
import Math from '../Math';
import { DirectDrawSurfaceParser } from '../Parsers';
import Context from './Context';
import Texture, { Mipmap, TextureFormat, TextureTarget } from './Texture';

/**
 * @todo Customizable filter / wrap
 */
class Texture2D extends Texture<WebGLTexture> {
	public name: string = 'Texture2D';

	public constructor(width: number, height: number, format: TextureFormat) {
		super(width, height, format, TextureTarget.Texture2D, () => Context.createTexture(), (handle) => Context.bindTexture(TextureTarget.Texture2D, handle), (handle) => Context.deleteTexture(handle));
	}

	/**
	 * @todo Make this more generic
	 */
	public static async loadRaw(uri: string, mipChain: boolean = false): Promise<Texture2D> {
		const name: string = Path.getFileName(uri);

		let raw: DirectDrawSurfaceParser;

		try {
			raw = await DirectDrawSurfaceParser.load(uri);
		} catch (e) {
			throw new Exception(`Texture2D (${ name }): failed to load DirectDrawSurface '${ uri }'`, e);
		}

		const result: Texture2D = new Texture2D(raw.width, raw.height, raw.textureFormat);

		result.data = new Float32Array(raw.reader.buffer, 4 + raw.ddsHeader.size, raw.width * raw.height * 4);
		result.apply(mipChain);

		return result;
	}

	public static async load(uri: string, format: TextureFormat = TextureFormat.ARGB32, mipChain: boolean = true): Promise<Texture2D> {
		return new Promise<Texture2D>((resolve) => {
			const image = new Image();

			image.addEventListener('load', () => {
				const result = new Texture2D(image.width, image.height, format);

				result.name = Path.getFileName(uri);
				result.data = image;

				result.apply(mipChain);

				resolve(result);
			});

			image.src = version(uri);
		});
	}

	public apply(updateMipmaps: boolean = false): void {
		super.apply();

		const { internalFormat, format, type } = this.pixel;

		if (this.data === null) {
			Context.texImage2D(
				this.target,
				0,
				internalFormat,
				this.width,
				this.height,
				0,
				format,
				type,
				null,
			);
		} else {
			if (ArrayBuffer.isView(this.data)) {
				Context.texImage2D(
					this.target,
					0,
					internalFormat,
					this.width,
					this.height,
					0,
					format,
					type,
					this.data as ArrayBufferView,
				);
			} else if (isArrayLike(this.data)) {
				for (let level = 0; level < this.mipmapCount; level++) {
					const mipmap: Mipmap = (this.data as Mipmap[])[level];

					Context.texImage2D(
						this.target,
						level,
						internalFormat,
						mipmap.width,
						mipmap.height,
						0,
						format,
						type,
						mipmap.data,
					);
				}
			} else {
				Context.pixelStorei(Context.UNPACK_FLIP_Y_WEBGL, true);
				Context.texImage2D(
					this.target,
					0,
					internalFormat,
					format,
					type,
					this.data as TexImageSource,
				);
				Context.pixelStorei(Context.UNPACK_FLIP_Y_WEBGL, false);
			}
		}

		if (updateMipmaps) {
			Context.generateMipmap(this.target);

			this.mipmapCount = 1 + Math.floor(Math.log2(Math.max(this.width, this.height)));
		}
	}
}

export default Texture2D;