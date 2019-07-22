import BindableObject from './Helpers/BindableObject';
import { gl } from './index';
class Model extends BindableObject {
    constructor() {
        super(...arguments);
        this.name = 'Model';
        this.vertices = null;
        this.indices = null;
    }
    get identifier() {
        return 'model';
    }
    onBind() {
        if (!this.vertices) {
            return;
        }
        this.vertices.bind();
        if (this.indices) {
            this.indices.bind();
        }
    }
    onUnbind() {
        if (this.vertices) {
            this.vertices.unbind();
            if (this.indices) {
                this.indices.unbind();
            }
        }
    }
    draw(type) {
        this.bind();
        type = type || gl.TRIANGLES;
        if (this.indices) {
            this.indices.draw(type);
        }
        else {
            if (!this.vertices) {
                console.warn(`Model (${this.name}): no vertices`);
                return;
            }
            this.vertices.draw(type);
        }
    }
    dispose() {
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
