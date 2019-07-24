import { Camera, Material, Model, Renderer } from '../../Cake';
import { Shader, Texture2D, TextureFormat } from '../../GL';
import { Resource, ResourceType } from '../../Helpers';
import { Vector } from '../../Math';

import {
	SceneObject,
	SceneObjectType,
	SceneCamera,
	SceneRenderer,
	SceneMaterialProperty,
	SceneMaterialPropertyType,
} from './SceneFile';

class SceneParser {
	public readonly camera: Camera = new Camera();
	public readonly renderers: Renderer[] = [];

	public async add(object: SceneRenderer): Promise<void> {
		const {
			name,
			model,
			position,
			material: { shader, properties },
		}: SceneRenderer = object;

		const renderer = new Renderer();

		renderer.name = name || 'Transform';

		renderer.model = await Model.load(model);

		renderer.position.set(position);

		renderer.material = new Material(await Shader.load(shader));

		for (let i = 0; i < properties.length; i++) {
			const { type, name, value }: SceneMaterialProperty = properties[i];

			switch (type) {
				case SceneMaterialPropertyType.Texture2D:
					renderer.material.setTexture(name, await Texture2D.load(value as string, TextureFormat.RGBA32));
					break;

				case SceneMaterialPropertyType.Vector:
					renderer.material.setVector(name, Vector.parse(value as number[]));
					break;

				case SceneMaterialPropertyType.Int:
					renderer.material.setInt(name, value as number);
					break;

				case SceneMaterialPropertyType.Float:
					renderer.material.setFloat(name, value as number);
					break;

				default:
					throw new RangeError();
			}
		}

		this.renderers.push(renderer);
	}

	public async parse(url: string): Promise<void> {
		const data: SceneObject[] = await Resource.load<SceneObject[]>(url, ResourceType.JSON);

		for (let i = 0; i < data.length; i++) {
			const object: SceneObject = data[i];

			switch (object.type) {
				case SceneObjectType.Renderer:
					await this.add(object as SceneRenderer);
					break;

				case SceneObjectType.Camera:
					const camera: SceneCamera = object as SceneCamera;

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