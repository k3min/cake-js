import Context from './Context';
import Texture, { TextureFormat, TextureTarget } from './Texture';

class Texture2DArray extends Texture<WebGLTexture> {
	public name: string = 'Texture2DArray';

	public length: number;

	public constructor(width: number, height: number, depth: number, format: TextureFormat) {
		super(width, height, format, TextureTarget.Texture2DArray, () => Context.createTexture(), (handle) => Context.bindTexture(TextureTarget.Texture2DArray, handle), (handle) => Context.deleteTexture(handle));

		this.length = depth;
	}

	public apply(): void {
		super.apply();

		const { internalFormat, format, type } = this.pixel;

		Context.texImage3D(
			this.target,
			0,
			internalFormat,
			this.width,
			this.height,
			this.length,
			0,
			format,
			type,
			null,
		);
	}
}

export default Texture2DArray;