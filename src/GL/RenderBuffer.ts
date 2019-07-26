import GL from './GL';
import Texture, { TextureTarget } from './Texture';

export enum RenderBufferFormat {
	RGBA32 = 0x8056, // GL_RGBA4
	R5G5B5A1 = 0x8057, // GL_RGB5_A1
	R5G6B5 = 0x8D62, // GL_RGB565
	Depth = 0x81A5, // GL_DEPTH_COMPONENT16
	Stencil = 0x8D48, // GL_STENCIL_INDEX8
	DepthStencil = 0x84F9, // GL_DEPTH_STENCIL
}

class RenderBuffer extends Texture<WebGLRenderbuffer> {
	public name: string = 'RenderBuffer';

	protected get identifier(): string {
		return 'RenderBuffer';
	}

	public constructor(width: number, height: number, format: RenderBufferFormat) {
		super(width, height, format, TextureTarget.RenderBuffer, () => GL.createRenderbuffer(), (handle) => GL.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => GL.deleteRenderbuffer(handle));
	}

	public apply(): void {
		this.bind();

		GL.renderbufferStorage(this.target, this.format, this.width, this.height);
	}
}

export default RenderBuffer;