import gl from './index';
import Texture, { TextureFormat } from './Texture';

class RenderBuffer extends Texture<WebGLRenderbuffer> {
	public name: string = 'RenderBuffer';

	public readonly stencil: boolean;

	protected get identifier(): string {
		return 'renderbuffer';
	}

	public constructor(width: number, height: number, format: TextureFormat, stencil: boolean) {
		super(width, height, format, gl.RENDERBUFFER, () => gl.createRenderbuffer(), (handle) => gl.bindRenderbuffer(gl.RENDERBUFFER, handle), (handle) => gl.deleteRenderbuffer(handle));

		this.stencil = stencil;
	}

	public apply(): void {
		this.bind();

		gl.renderbufferStorage(this.target, this.format, this.width, this.height);
	}
}

export default RenderBuffer;