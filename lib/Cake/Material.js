import Base from '../Helpers/Base';
import Storage from '../Helpers/Storage';
import Toggle from '../Helpers/Toggle';
class Material extends Base {
    constructor(shader) {
        super();
        this.name = 'Material';
        this.ints = new Storage();
        this.floats = new Storage();
        this.vectors = new Storage();
        this.matrices = new Storage();
        this.textures = new Storage();
        this.keywords = new Toggle();
        this.shader = shader;
        this.name = shader.name;
    }
    use() {
        this.shader.keywords = this.keywords.toArray();
        this.shader.bind();
        this.floats.forEach((value, name) => this.shader.setFloat(name, value));
        this.ints.forEach((value, name) => this.shader.setInt(name, value));
        this.vectors.forEach((value, name) => this.shader.setVector(name, value));
        this.textures.forEach((value, name) => this.shader.setTexture(name, value));
        this.matrices.forEach((value, name) => this.shader.setMatrix4x4(name, value));
    }
    setKeyword(name, value) {
        this.keywords.set(name, value);
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
    disposing() {
        //
    }
}
export default Material;
