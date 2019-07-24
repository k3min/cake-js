import Null from '../Helpers/Null';
import Drawable, { PrimitiveType } from './Helpers/Drawable';
import VertexAttribute from './Helpers/VertexAttribute';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import BindableObject from '../Helpers/BindableObject';
import Disposable from '../Helpers/Disposable';
import Indexable from '../Helpers/Indexable';

class Model<T extends Indexable<VertexAttribute>> extends BindableObject<Model<T>> implements Drawable, Disposable {
	public name: string = 'Model';

	protected indexBuffer: Null<IndexBuffer> = null;
	protected vertexBuffer: Null<VertexBuffer<T>> = null;

	protected get identifier(): string {
		return 'Model';
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

export default Model;