import Context from './Context';
import { PrimitiveType, Drawable, BindableGraphicsObject } from './Helpers';

export enum BufferType {
	Array = 0x8892, // GL_ARRAY_BUFFER
	ElementArray = 0x8893, // GL_ELEMENT_ARRAY_BUFFER
}

/**
 * @todo Implement observable pattern
 */
abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
	public name: string = 'Buffer';

	protected readonly data: T;
	private readonly target: BufferType;
	public readonly length: number;

	protected get identifier(): string {
		return 'Buffer';
	}

	protected constructor(target: BufferType, data: T, length: number) {
		super(() => Context.createBuffer(), (handle) => Context.bindBuffer(target, handle), (handle) => Context.deleteBuffer(handle));

		this.target = target;
		this.data = data;
		this.length = length;

		this.apply();
	}

	/**
	 * @todo Context.DYNAMIC_DRAW
	 */
	public apply(): void {
		this.bind();

		Context.bufferData(this.target, this.data, Context.STATIC_DRAW);
	}

	public abstract draw(type: PrimitiveType): void;

	public abstract drawInstanced(type: PrimitiveType, count: number): void;
}

export default Buffer;