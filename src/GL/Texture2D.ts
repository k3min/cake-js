import { Path } from '../Core';
import { isArrayLike } from '../Core/Helpers';
import Math, { Vector4 } from '../Math';
import Context from './Context';
import Texture, { Mipmap, TextureFormat, TextureTarget } from './Texture';

/**
 * @todo Customizable filter / wrap
 */
class Texture2D extends Texture<WebGLTexture> {
	public name: string = 'Texture2D';

	public readonly texelSize: Vector4 = new Vector4(0, 0, 0, 0);

	public constructor(width: number, height: number, format: TextureFormat) {
		super(width, height, format, TextureTarget.Texture2D, () => Context.createTexture(), (handle) => Context.bindTexture(TextureTarget.Texture2D, handle), (handle) => Context.deleteTexture(handle));
	}

	public static async load(url: string, format: TextureFormat, mipChain: boolean = true): Promise<Texture2D> {
		return new Promise<Texture2D>((resolve) => {
			const image = new Image();

			image.addEventListener('load', () => {
				const result = new Texture2D(image.width, image.height, format);

				result.name = Path.getFileName(url);
				result.data = image;

				result.apply(mipChain);

				resolve(result);
			});

			image.src = url;
		});
	}

	public apply(updateMipmaps: boolean = true): void {
		super.apply();

		this.texelSize[0] = this.width;
		this.texelSize[1] = this.height;
		this.texelSize[2] = 1 / this.width;
		this.texelSize[3] = 1 / this.height;

		if (this.data === null) {
			Context.texImage2D(
				this.target,
				0,
				this.pixelFormat,
				this.width,
				this.height,
				0,
				this.pixelFormat,
				this.pixelType,
				null,
			);
		} else {
			if (this.data as TexImageSource) {
				Context.pixelStorei(Context.UNPACK_FLIP_Y_WEBGL, true);

				Context.texImage2D(
					this.target,
					0,
					this.pixelFormat,
					this.pixelFormat,
					this.pixelType,
					this.data as TexImageSource,
				);

				Context.pixelStorei(Context.UNPACK_FLIP_Y_WEBGL, false);
			} else if (ArrayBuffer.isView(this.data)) {
				Context.texImage2D(
					this.target,
					0,
					this.pixelFormat,
					this.width,
					this.height,
					0,
					this.pixelFormat,
					this.pixelType,
					this.data as ArrayBufferView,
				);
			} else if (isArrayLike(this.data)) {
				for (let level = 0; level < this.mipmapCount; level++) {
					const mipmap: Mipmap = (this.data as Mipmap[])[level];

					Context.texImage2D(
						this.target,
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

		if (updateMipmaps) {
			Context.generateMipmap(this.target);

			this.mipmapCount = 1 + Math.floor(Math.log2(Math.max(this.width, this.height)));
		}
	}
}

export default Texture2D;