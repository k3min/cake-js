import Context from './Context';
import Texture, { TextureTarget } from './Texture';

export enum RenderBufferFormat {
	RGBA4 = 0x8056, // GL_RGBA4
	RGB565 = 0x8d62, // GL_RGB565
	RGB5_A1 = 0x8057, // GL_RGB5_A1
	DEPTH_COMPONENT16 = 0x81a5, // GL_DEPTH_COMPONENT16
	STENCIL_INDEX8 = 0x8d48, // GL_STENCIL_INDEX8
	DEPTH_STENCIL = 0x84f9, // GL_DEPTH_STENCIL
	R8 = 0x8229, // GL_R8
	R8UI = 0x8232, // GL_R8UI
	R8I = 0x8231, // GL_R8I
	R16UI = 0x8234, // GL_R16UI
	R16I = 0x8233, // GL_R16I
	R32UI = 0x8236, // GL_R32UI
	R32I = 0x8235, // GL_R32I
	RG8 = 0x822b, // GL_RG8
	RG8UI = 0x8238, // GL_RG8UI
	RG8I = 0x8237, // GL_RG8I
	RG16UI = 0x823a, // GL_RG16UI
	RG16I = 0x8239, // GL_RG16I
	RG32UI = 0x823c, // GL_RG32UI
	RG32I = 0x823b, // GL_RG32I
	RGB8 = 0x8051, // GL_RGB8
	RGBA8 = 0x8058, // GL_RGBA8
	RGB10_A2 = 0x8059, // GL_RGB10_A2
	RGBA8UI = 0x8d7c, // GL_RGBA8UI
	RGBA8I = 0x8d8e, // GL_RGBA8I
	RGB10_A2UI = 0x906f, // GL_RGB10_A2UI
	RGBA16UI = 0x8d76, // GL_RGBA16UI
	RGBA16I = 0x8d88, // GL_RGBA16I
	RGBA32I = 0x8d82, // GL_RGBA32I
	RGBA32UI = 0x8d70, // GL_RGBA32UI
	DEPTH_COMPONENT24 = 0x81a6, // GL_DEPTH_COMPONENT24
	DEPTH_COMPONENT32F = 0x8cac, // GL_DEPTH_COMPONENT32F
	DEPTH24_STENCIL8 = 0x88f0, // GL_DEPTH24_STENCIL8
	DEPTH32F_STENCIL8 = 0x8cad, // GL_DEPTH32F_STENCIL8
	R16F = 0x822d, // GL_R16F
	RG16F = 0x822f, // GL_RG16F
	RGBA16F = 0x881a, // GL_RGBA16F
	R32F = 0x822e, // GL_R32F
	RG32F = 0x8230, // GL_RG32F
	RGBA32F = 0x8814, // GL_RGBA32F
	R11F_G11F_B10F = 0x8c3a, // GL_R11F_G11F_B10F
}

class RenderBuffer extends Texture<WebGLRenderbuffer> {
	public name: string = 'RenderBuffer';

	protected get identifier(): string {
		return 'RenderBuffer';
	}

	public constructor(width: number, height: number, format: RenderBufferFormat) {
		super(width, height, format as GLenum, TextureTarget.RenderBuffer, () => Context.createRenderbuffer(), (handle) => Context.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => Context.deleteRenderbuffer(handle));
	}

	public apply(): void {
		this.bind();

		Context.renderbufferStorage(this.target, this.format, this.width, this.height);
	}
}

export default RenderBuffer;