import Path from '../Helpers/Path';
import Vector4 from '../Math/Vector4';
import GL from './GL';
import Texture, { TextureFormat, TextureTarget } from './Texture';

class Texture2D extends Texture<WebGLTexture> {
	public name: string = 'Texture2D';

	public readonly texelSize: Vector4 = new Vector4(0, 0, 0, 0);

	public constructor(width: number, height: number, format: TextureFormat) {
		super(width, height, format, TextureTarget.Texture2D, () => GL.createTexture(), (handle) => GL.bindTexture(TextureTarget.Texture2D, handle), (handle) => GL.deleteTexture(handle));
	}

	public static async load(url: string, format: TextureFormat): Promise<Texture2D> {
		return new Promise<Texture2D>((resolve) => {
			const image = new Image();

			image.addEventListener('load', () => {
				const result = new Texture2D(image.width, image.height, format);

				result.name = Path.getFileName(url);
				result.data = image;

				result.apply();

				resolve(result);
			});

			image.src = url;
		});
	}

	public apply(): void {
		this.bind();

		this.set(GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		this.set(GL.TEXTURE_MAG_FILTER, GL.LINEAR);

		this.set(GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
		this.set(GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

		this.texelSize[0] = this.width;
		this.texelSize[1] = this.height;
		this.texelSize[2] = 1 / this.width;
		this.texelSize[3] = 1 / this.height;

		if (this.data !== null && this.data as TexImageSource) {
			GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);

			GL.texImage2D(
				this.target,
				0,
				this.pixelFormat,
				this.pixelFormat,
				this.pixelType,
				this.data as TexImageSource,
			);

			GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, false);
		} else {
			GL.texImage2D(
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
		}
	}
}

export default Texture2D;