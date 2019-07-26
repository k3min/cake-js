import { Indexable, Null } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import GL from './GL';

export interface Mipmap {
	data: ArrayBufferView;
	width: number;
	height: number;
}

export enum TextureTarget {
	Texture2D = 0x0DE1, // GL_TEXTURE_2D
	CubeMap = 0x8513, // GL_TEXTURE_CUBE_MAP
	RenderBuffer = 0x8D41, // GL_RENDERBUFFER
}

abstract class Texture<T extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<T>, T> {
	public name: string = 'Texture';

	public readonly target: TextureTarget;
	private readonly parameters: Indexable<GLenum> = {};

	protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null = null;

	public readonly format: GLenum;

	public width: number;
	public height: number;

	protected get identifier(): string {
		return 'Texture';
	}

	protected constructor(width: number, height: number, format: GLenum, target: TextureTarget, genFn: () => Null<T>, bindFn: (handle: Null<T>) => void, releaseFn: (handle: T) => void) {
		super(genFn, bindFn, releaseFn);

		this.width = width;
		this.height = height;
		this.format = format;
		this.target = target;
	}

	public set(name: GLenum, value: GLenum): void {
		if (this.parameters[name] === value) {
			return;
		}

		this.parameters[name] = value;

		GL.texParameteri(this.target, name, value);
	}

	public abstract apply(): void;
}

export default Texture;