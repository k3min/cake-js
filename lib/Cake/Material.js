import { Base } from '../Core';
import { Storage } from '../Core/Helpers';
class Material extends Base {
    constructor(shader) {
        super();
        this.name = 'Material';
        this.ints = new Storage();
        this.floats = new Storage();
        this.vectors = new Storage();
        this.matrices = new Storage();
        this.textures = new Storage();
        this.colors = new Storage();
        this.keywords = [];
        this.shader = shader;
        this.name = shader.name;
    }
    use() {
        this.shader.keywords = this.keywords;
        this.shader.bind();
        this.floats.forEach((value, name) => this.shader.setFloat(name, value));
        this.ints.forEach((value, name) => this.shader.setInt(name, value));
        this.vectors.forEach((value, name) => this.shader.setVector(name, value));
        this.textures.forEach((value, name) => this.shader.setTexture(name, value));
        this.matrices.forEach((value, name) => this.shader.setMatrix4x4(name, value));
        this.colors.forEach((value, name) => this.shader.setColor(name, value));
    }
    enableKeyword(name) {
        if (!this.keywords.includes(name)) {
            this.keywords.push(name);
        }
    }
    disableKeyword(name) {
        const index = this.keywords.indexOf(name);
        if (index === -1) {
            return;
        }
        this.keywords.splice(index, 1);
    }
    setTexture(name, value) {
        this.textures.set(name, value);
    }
    setVector(name, value) {
        this.vectors.set(name, value);
    }
    setMatrix4x4(name, value) {
        this.matrices.set(name, value);
    }
    setInt(name, value) {
        this.ints.set(name, value);
    }
    setFloat(name, value) {
        this.floats.set(name, value);
    }
    setColor(name, value) {
        this.colors.set(name, value);
    }
    disposing() {
        this.shader.dispose();
    }
}
export default Material;
