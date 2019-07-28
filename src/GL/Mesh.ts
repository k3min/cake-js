import { Disposable } from '../Core';
import { Drawable, PrimitiveType, VertexAttribute } from './Helpers';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import { BindableObject, Indexable, Null } from '../Core/Helpers';

class Mesh<T extends Indexable<VertexAttribute>> extends BindableObject<Mesh<T>> implements Drawable, Disposable {
	public name: string = 'Mesh';

	protected indexBuffer: Null<IndexBuffer> = null;
	protected vertexBuffer: Null<VertexBuffer<T>> = null;

	protected get identifier(): string {
		return 'Mesh';
	}

	protected binding(): void {
		if (this.vertexBuffer === null) {
			throw new ReferenceError(`Mesh (${ this.name }): invalid vertex buffer`);
		}

		this.vertexBuffer.bind();

		if (this.indexBuffer !== null) {
			this.indexBuffer.bind();
		}
	}

	protected unbinding(): void {
		if (this.vertexBuffer === null) {
			return;
		}

		this.vertexBuffer.unbind();

		if (this.indexBuffer !== null) {
			this.indexBuffer.unbind();
		}
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		if (this.indexBuffer === null) {
			if (this.vertexBuffer === null) {
				throw new ReferenceError(`Model (${ this.name }): no vertices`);
			}

			this.vertexBuffer.draw(type);
		} else {
			this.indexBuffer.draw(type);
		}
	}

	protected disposing(): void {
		if (this.vertexBuffer !== null) {
			this.vertexBuffer.dispose();
		}

		if (this.indexBuffer !== null) {
			this.indexBuffer.dispose();
		}
	}
}

export default Mesh;