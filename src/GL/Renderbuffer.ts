import BindableObject from '../Helpers/BindableObject';
import Null from '../Helpers/Null';
import gl from './index';
import Texture, { TextureFormat } from './Texture';

class Renderbuffer extends Texture<WebGLRenderbuffer> {
	public name: string = 'Renderbuffer';

	public readonly stencil: boolean;

	public static get bound(): Null<Renderbuffer> {
		return BindableObject.map.get('renderbuffer') as Null<Renderbuffer>;
	}

	protected get identifier(): string {
		return 'renderbuffer';
	}

	public constructor(width: number, height: number, format: TextureFormat, stencil: boolean) {
		super(width, height, format, gl.RENDERBUFFER, () => gl.createRenderbuffer(), (target, handle) => gl.bindRenderbuffer(target, handle), (handle) => gl.deleteRenderbuffer(handle));

		this.stencil = stencil;
	}

	public apply(): void {
		this.bind();

		gl.renderbufferStorage(this.target, this.format, this.width, this.height);
	}
}

export default Renderbuffer;