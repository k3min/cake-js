import GL from './GL';
import Texture, { TextureFormat, TextureTarget } from './Texture';

class RenderBuffer extends Texture<WebGLRenderbuffer> {
	public name: string = 'RenderBuffer';

	public readonly stencil: boolean;

	protected get identifier(): string {
		return 'RenderBuffer';
	}

	public constructor(width: number, height: number, format: TextureFormat, stencil: boolean) {
		super(width, height, format, TextureTarget.RenderBuffer, () => GL.createRenderbuffer(), (handle) => GL.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => GL.deleteRenderbuffer(handle));

		this.stencil = stencil;
	}

	public apply(): void {
		this.bind();

		GL.renderbufferStorage(this.target, this.format, this.width, this.height);
	}
}

export default RenderBuffer;