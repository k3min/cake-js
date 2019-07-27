import { Camera, Material, Model, Renderer } from '../../Cake';
import { Shader, Texture2D, TextureFormat } from '../../GL';
import { Exception, Resource, ResourceType } from '../../Core';
import { Vector2, Vector3, Vector4 } from '../../Math';
import Color from '../../Math/Color';
import { SceneObjectType, SceneMaterialPropertyType, } from './SceneFile';
const vector = (vector) => {
    switch (vector.length) {
        case Vector2.LENGTH:
            return new Vector2(vector);
        case Vector3.LENGTH:
            return new Vector3(vector);
        case Vector4.LENGTH:
            return new Vector4(vector);
        default:
            throw new RangeError();
    }
};
class SceneParser {
    constructor() {
        this.camera = new Camera();
        this.renderers = [];
    }
    async add(object) {
        const { name, model, position, scale, material: { shader, properties }, } = object;
        const renderer = new Renderer();
        renderer.name = name || 'Renderer';
        try {
            renderer.model = await Model.load(model);
        }
        catch (e) {
            throw new Exception(`SceneParser: failed to load model '${model}'`, e);
        }
        renderer.position.set(position);
        renderer.scale.set(scale);
        try {
            renderer.material = new Material(await Shader.load(shader));
        }
        catch (e) {
            throw new Exception(`SceneParser: failed to load shader '${shader}'`, e);
        }
        for (let i = 0; i < properties.length; i++) {
            const { type, name, value } = properties[i];
            switch (type) {
                case SceneMaterialPropertyType.Texture: {
                    try {
                        renderer.material.setTexture(name, await Texture2D.load(value, TextureFormat.RGBA32));
                    }
                    catch (e) {
                        throw new Exception(`SceneParser: failed to load texture '${value}'`, e);
                    }
                    break;
                }
                case SceneMaterialPropertyType.Vector:
                    renderer.material.setVector(name, vector(value));
                    break;
                case SceneMaterialPropertyType.Int:
                    renderer.material.setInt(name, value);
                    break;
                case SceneMaterialPropertyType.Float:
                    renderer.material.setFloat(name, value);
                    break;
                case SceneMaterialPropertyType.Color:
                    const [r, g, b, a] = value;
                    renderer.material.setColor(name, new Color(r, g, b, a));
                    break;
                default:
                    throw new RangeError(`SceneParser: unknown SceneMaterialPropertyType '${type}'`);
            }
        }
        this.renderers.push(renderer);
    }
    async parse(uri) {
        let data;
        try {
            data = await Resource.load(uri, ResourceType.JSON);
        }
        catch (e) {
            throw new Exception(`SceneParser: failed to load '${uri}'`, e);
        }
        for (let i = 0; i < data.length; i++) {
            const object = data[i];
            const { type } = object;
            switch (type) {
                case SceneObjectType.Renderer: {
                    try {
                        await this.add(object);
                    }
                    catch (e) {
                        throw new Exception(`SceneParser: failed to add '${JSON.stringify(object)}'`, e);
                    }
                    break;
                }
                case SceneObjectType.Camera:
                    const camera = object;
                    this.camera.fov = camera.fov;
                    this.camera.near = camera.near;
                    this.camera.far = camera.far;
                    this.camera.position.set(camera.position);
                    this.camera.target.set(camera.target);
                    break;
                default:
                    throw new RangeError(`SceneParser: unknown SceneObjectType '${type}'`);
            }
        }
    }
}
export default SceneParser;
