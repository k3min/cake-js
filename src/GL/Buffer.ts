import Drawable from '../Helpers/Drawable';
import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';

abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
	protected readonly data: T;
	private readonly target: GLenum;
	public readonly length: number;

	public static get bound(): Null<Buffer<ArrayBuffer>> {
		return BindableGraphicsObject.map.get('buffer') as Null<Buffer<ArrayBuffer>>;
	}

	protected constructor(target: GLenum, data: T, length: number) {
		super(() => gl.createBuffer(), (handle) => gl.bindBuffer(target, handle), (handle) => gl.deleteBuffer(handle));

		this.target = target;
		this.data = data;
		this.length = length;

		this.apply();
		this.unbind();
	}

	public apply(): void {
		this.bind();

		gl.bufferData(this.target, this.data, gl.STATIC_DRAW);
	}

	public static unbind(type: GLenum): void {
		gl.bindBuffer(type, null);
	}

	public abstract draw(type: GLenum): void;
}

export default Buffer;