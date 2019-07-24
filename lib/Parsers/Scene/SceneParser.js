import { Camera, Material, Model, Renderer } from '../../Cake';
import { Shader, Texture2D, TextureFormat } from '../../GL';
import { Resource, ResourceType } from '../../Helpers';
import { Vector } from '../../Math';
import { SceneObjectType, SceneMaterialPropertyType, } from './SceneFile';
class SceneParser {
    constructor() {
        this.camera = new Camera();
        this.renderers = [];
    }
    async add(object) {
        const { name, model, position, material: { shader, properties }, } = object;
        const renderer = new Renderer();
        renderer.name = name || 'Transform';
        renderer.model = await Model.load(model);
        renderer.position.set(position);
        renderer.material = new Material(await Shader.load(shader));
        for (let i = 0; i < properties.length; i++) {
            const { type, name, value } = properties[i];
            switch (type) {
                case SceneMaterialPropertyType.Texture2D:
                    renderer.material.setTexture(name, await Texture2D.load(value, TextureFormat.RGBA32));
                    break;
                case SceneMaterialPropertyType.Vector:
                    renderer.material.setVector(name, Vector.parse(value));
                    break;
                case SceneMaterialPropertyType.Int:
                    renderer.material.setInt(name, value);
                    break;
                case SceneMaterialPropertyType.Float:
                    renderer.material.setFloat(name, value);
                    break;
                default:
                    throw new RangeError();
            }
        }
        this.renderers.push(renderer);
    }
    async parse(url) {
        const data = await Resource.load(url, ResourceType.JSON);
        for (let i = 0; i < data.length; i++) {
            const object = data[i];
            switch (object.type) {
                case SceneObjectType.Renderer:
                    await this.add(object);
                    break;
                case SceneObjectType.Camera:
                    const camera = object;
                    this.camera.fov = camera.fov;
                    this.camera.near = camera.near;
                    this.camera.far = camera.far;
                    this.camera.position.set(camera.position);
                    this.camera.target.set(camera.target);
                    break;
                default:
                    throw new RangeError();
            }
        }
    }
}
export default SceneParser;
