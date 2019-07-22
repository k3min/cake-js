import Path from '../Helpers/Path';
import Vector4 from '../Math/Vector4';
import gl from './index';
import Texture, { TextureFormat } from './Texture';

class Texture2D extends Texture<WebGLTexture> {
	public readonly texelSize: Vector4 = new Vector4(0, 0, 0, 0);

	public constructor(width: number, height: number, format: TextureFormat) {
		super(width, height, format, gl.TEXTURE_2D, () => gl.createTexture(), (target, handle) => gl.bindTexture(target, handle), (handle) => gl.deleteTexture(handle));
	}

	public static async load(url: string, format: TextureFormat): Promise<Texture2D> {
		return new Promise<Texture2D>((resolve) => {
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

	public apply(): void {
		this.bind();

		this.texelSize[0] = this.width;
		this.texelSize[1] = this.height;
		this.texelSize[2] = 1 / this.width;
		this.texelSize[3] = 1 / this.height;

		if (this.data !== null && this.data instanceof Image) {
			gl.texImage2D(
				this.target,
				0,
				this.pixelInternalFormat,
				this.pixelFormat,
				this.pixelType,
				this.data as TexImageSource,
			);
		} else {
			gl.texImage2D(
				this.target,
				0,
				this.pixelInternalFormat,
				this.width,
				this.height,
				0,
				this.pixelFormat,
				this.pixelType,
				this.data as ArrayBufferView,
			);
		}
	}
}

export default Texture2D;