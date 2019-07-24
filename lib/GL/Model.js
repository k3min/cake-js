import { PrimitiveType } from './Helpers/Drawable';
import BindableObject from '../Helpers/BindableObject';
class Model extends BindableObject {
    constructor() {
        super(...arguments);
        this.name = 'Model';
        this.indexBuffer = null;
        this.vertexBuffer = null;
    }
    get identifier() {
        return 'Model';
    }
    onBind() {
        if (!this.vertexBuffer) {
            return;
        }
        this.vertexBuffer.bind();
        if (this.indexBuffer) {
            this.indexBuffer.bind();
        }
    }
    onUnbind() {
        if (this.vertexBuffer) {
            this.vertexBuffer.unbind();
            if (this.indexBuffer) {
                this.indexBuffer.unbind();
            }
        }
    }
    draw(type = PrimitiveType.Triangles) {
        this.bind();
        if (this.indexBuffer) {
            this.indexBuffer.draw(type);
        }
        else {
            if (!this.vertexBuffer) {
                throw new ReferenceError(`Model (${this.name}): no vertices`);
            }
            this.vertexBuffer.draw(type);
        }
    }
    disposing() {
        if (this.vertexBuffer) {
            this.vertexBuffer.dispose();
        }
        if (this.indexBuffer) {
            this.indexBuffer.dispose();
        }
    }
}
export default Model;
