import { Camera, Material, Model, Renderer } from '../../Cake';
import { Shader, Texture2D, TextureFormat } from '../../GL';
import { Exception, Resource, ResourceType } from '../../Core';
import { Vector, Vector2, Vector3, Vector4 } from '../../Math';
import Color from '../../Math/Color';

import {
	SceneObject,
	SceneObjectType,
	SceneCamera,
	SceneRenderer,
	SceneMaterialProperty,
	SceneMaterialPropertyType,
} from './SceneFile';

const vector = (vector: number[]): Vector => {
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
	public readonly camera: Camera = new Camera();
	public readonly renderers: Renderer[] = [];

	public async add(object: SceneRenderer): Promise<void> {
		const {
			name,
			model,
			position,
			scale,
			material: { shader, properties },
		}: SceneRenderer = object;

		const renderer = new Renderer();

		renderer.name = name || 'Renderer';

		try {
			renderer.model = await Model.load(model);
		} catch (e) {
			throw new Exception(`SceneParser: failed to load model '${ model }'`, e);
		}

		renderer.position.set(position);
		renderer.scale.set(scale);

		try {
			renderer.material = new Material(await Shader.load(shader));
		} catch (e) {
			throw new Exception(`SceneParser: failed to load shader '${ shader }'`, e);
		}

		for (let i = 0; i < properties.length; i++) {
			const { type, name, value }: SceneMaterialProperty = properties[i];

			switch (type) {
				case SceneMaterialPropertyType.Texture: {
					try {
						renderer.material.setTexture(name, await Texture2D.load(value as string, TextureFormat.RGBA32));
					} catch (e) {
						throw new Exception(`SceneParser: failed to load texture '${ value }'`, e);
					}

					break;
				}

				case SceneMaterialPropertyType.Vector:
					renderer.material.setVector(name, vector(value as number[]));
					break;

				case SceneMaterialPropertyType.Int:
					renderer.material.setInt(name, value as number);
					break;

				case SceneMaterialPropertyType.Float:
					renderer.material.setFloat(name, value as number);
					break;

				case SceneMaterialPropertyType.Color:
					const [r, g, b, a] = value as number[];
					renderer.material.setColor(name, new Color(r, g, b, a));
					break;

				default:
					throw new RangeError(`SceneParser: unknown SceneMaterialPropertyType '${ type }'`);
			}
		}

		this.renderers.push(renderer);
	}

	public async parse(uri: string): Promise<void> {
		let data: SceneObject[];

		try {
			data = await Resource.load<SceneObject[]>(uri, ResourceType.JSON);
		} catch (e) {
			throw new Exception(`SceneParser: failed to load '${ uri }'`, e);
		}

		for (let i = 0; i < data.length; i++) {
			const object: SceneObject = data[i];

			const { type }: SceneObject = object;

			switch (type) {
				case SceneObjectType.Renderer: {
					try {
						await this.add(object as SceneRenderer);
					} catch (e) {
						throw new Exception(`SceneParser: failed to add '${ JSON.stringify(object) }'`, e);
					}

					break;
				}

				case SceneObjectType.Camera:
					const camera: SceneCamera = object as SceneCamera;

					this.camera.fov = camera.fov;
					this.camera.near = camera.near;
					this.camera.far = camera.far;

					this.camera.position.set(camera.position);
					this.camera.target.set(camera.target);

					break;

				default:
					throw new RangeError(`SceneParser: unknown SceneObjectType '${ type }'`);
			}
		}
	}
}

export default SceneParser;