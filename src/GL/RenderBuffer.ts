import Context from './Context';
import Texture, { TextureFormat, TextureTarget } from './Texture';

class RenderBuffer extends Texture<WebGLRenderbuffer> {
	public name: string = 'RenderBuffer';

	protected get identifier(): string {
		return 'RenderBuffer';
	}

	public constructor(width: number, height: number, format: TextureFormat) {
		super(width, height, format, TextureTarget.RenderBuffer, () => Context.createRenderbuffer(), (handle) => Context.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => Context.deleteRenderbuffer(handle));
	}

	public apply(): void {
		this.bind();

		Context.renderbufferStorage(this.target, this.format, this.width, this.height);
	}
}

export default RenderBuffer;