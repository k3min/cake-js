import Drawable from './Helpers/Drawable';
import PrimitiveType from './GL/Helpers/PrimitiveType';
import BindableObject from './Helpers/BindableObject';
import VertexBuffer from './GL/VertexBuffer';
import IndexBuffer from './GL/IndexBuffer';
import { Indexable } from './GL/Helpers/VertexArrayBuffer';
import Disposable from './Helpers/Disposable';

class Model<T extends Indexable> extends BindableObject<Model<T>> implements Drawable, Disposable {
	public name: string = 'Model';

	protected vertices?: VertexBuffer<T>;
	protected indices?: IndexBuffer;

	protected get identifier(): string {
		return 'model';
	}

	public afterBind(): void {
		if (!this.vertices) {
			return;
		}

		this.vertices.bind();

		if (this.indices) {
			this.indices.bind();
		}
	}

	public afterUnbind(): void {
		if (!this.vertices) {
			return;
		}

		this.vertices.unbind();

		if (this.indices) {
			this.indices.unbind();
		}
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		if (this.indices) {
			this.indices.draw(type);
		} else {
			if (!this.vertices) {
				console.warn(`Model (${ this.name }): \`this.vertices\` is undefined`);
				return;
			}

			this.vertices.draw(type);
		}
	}

	public dispose(): void {
		super.dispose();

		if (this.vertices) {
			this.vertices.dispose();
			this.vertices = undefined;
		}

		if (this.indices) {
			this.indices.dispose();
			this.indices = undefined;
		}
	}
}

export default Model;