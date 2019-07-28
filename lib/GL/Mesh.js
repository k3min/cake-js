import { PrimitiveType } from './Helpers';
import { BindableObject } from '../Core/Helpers';
class Mesh extends BindableObject {
    constructor() {
        super(...arguments);
        this.name = 'Mesh';
        this.indexBuffer = null;
        this.vertexBuffer = null;
    }
    get identifier() {
        return 'Mesh';
    }
    binding() {
        if (this.vertexBuffer === null) {
            throw new ReferenceError(`Mesh (${this.name}): invalid vertex buffer`);
        }
        this.vertexBuffer.bind();
        if (this.indexBuffer !== null) {
            this.indexBuffer.bind();
        }
    }
    unbinding() {
        if (this.vertexBuffer === null) {
            return;
        }
        this.vertexBuffer.unbind();
        if (this.indexBuffer !== null) {
            this.indexBuffer.unbind();
        }
    }
    draw(type = PrimitiveType.Triangles) {
        this.bind();
        if (this.indexBuffer === null) {
            if (this.vertexBuffer === null) {
                throw new ReferenceError(`Model (${this.name}): no vertices`);
            }
            this.vertexBuffer.draw(type);
        }
        else {
            this.indexBuffer.draw(type);
        }
    }
    disposing() {
        if (this.vertexBuffer !== null) {
            this.vertexBuffer.dispose();
        }
        if (this.indexBuffer !== null) {
            this.indexBuffer.dispose();
        }
    }
}
export default Mesh;
