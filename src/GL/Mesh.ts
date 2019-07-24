import { Drawable, PrimitiveType, VertexAttribute } from './Helpers';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import { BindableObject, Disposable, Indexable, Null } from '../Helpers';

class Mesh<T extends Indexable<VertexAttribute>> extends BindableObject<Mesh<T>> implements Drawable, Disposable {
	public name: string = 'Mesh';

	protected indexBuffer: Null<IndexBuffer> = null;
	protected vertexBuffer: Null<VertexBuffer<T>> = null;

	protected get identifier(): string {
		return 'Mesh';
	}

	protected onBind(): void {
		if (!this.vertexBuffer) {
			return;
		}

		this.vertexBuffer.bind();

		if (this.indexBuffer) {
			this.indexBuffer.bind();
		}
	}

	protected onUnbind(): void {
		if (this.vertexBuffer) {
			this.vertexBuffer.unbind();

			if (this.indexBuffer) {
				this.indexBuffer.unbind();
			}
		}
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		if (this.indexBuffer) {
			this.indexBuffer.draw(type);
		} else {
			if (!this.vertexBuffer) {
				throw new ReferenceError(`Model (${ this.name }): no vertices`);
			}

			this.vertexBuffer.draw(type);
		}
	}

	protected disposing(): void {
		if (this.vertexBuffer) {
			this.vertexBuffer.dispose();
		}

		if (this.indexBuffer) {
			this.indexBuffer.dispose();
		}
	}
}

export default Mesh;