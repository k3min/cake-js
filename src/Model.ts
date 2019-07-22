import Drawable from './Helpers/Drawable';
import BindableObject from './Helpers/BindableObject';
import VertexBuffer from './GL/VertexBuffer';
import IndexBuffer from './GL/IndexBuffer';
import { Indexable } from './GL/Helpers/VertexArrayBuffer';
import Disposable from './Helpers/Disposable';
import Null from './Helpers/Null';
import { gl } from './index';

class Model<I extends Indexable> extends BindableObject<Model<I>> implements Drawable, Disposable {
	public name: string = 'Model';

	protected vertices: VertexBuffer<I> | null = null;
	protected indices: Null<IndexBuffer> = null;

	protected get identifier(): string {
		return 'model';
	}

	protected onBind(): void {
		if (!this.vertices) {
			return;
		}

		this.vertices.bind();

		if (this.indices) {
			this.indices.bind();
		}
	}

	protected onUnbind(): void {
		if (this.vertices) {
			this.vertices.unbind();

			if (this.indices) {
				this.indices.unbind();
			}
		}
	}

	public draw(type?: GLenum): void {
		this.bind();

		type = type || gl.TRIANGLES;

		if (this.indices) {
			this.indices.draw(type);
		} else {
			if (!this.vertices) {
				console.warn(`Model (${ this.name }): no vertices`);
				return;
			}

			this.vertices.draw(type);
		}
	}

	public dispose(): void {
		super.dispose();

		if (this.vertices) {
			this.vertices.dispose();
			this.vertices = null;
		}

		if (this.indices) {
			this.indices.dispose();
			this.indices = null;
		}
	}
}

export default Model;