import BindableObject from './Helpers/BindableObject';
import { gl } from './index';
class Model extends BindableObject {
    constructor() {
        super(...arguments);
        this.name = 'Model';
    }
    get identifier() {
        return 'model';
    }
    afterBind() {
        if (!this.vertices) {
            return;
        }
        this.vertices.bind();
        if (this.indices) {
            this.indices.bind();
        }
    }
    afterUnbind() {
        if (!this.vertices) {
            return;
        }
        this.vertices.unbind();
        if (this.indices) {
            this.indices.unbind();
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
                console.warn(`Model (${this.name}): \`this.vertices\` is undefined`);
                return;
            }
            this.vertices.draw(type);
        }
    }
    dispose() {
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
