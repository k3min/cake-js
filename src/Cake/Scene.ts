import { Drawable } from '../GL/Helpers';
import { Indexable, Storage } from '../Core/Helpers';
import { Base, Path, Updatable } from '../Core';
import Exception from '../Core/Exception';
import { SceneParser } from '../Parsers';
import Camera from './Camera';
import Renderer from './Renderer';

class Scene extends Base implements Updatable, Drawable {
	public name: string = 'Scene';

	// @ts-ignore
	public camera: Camera;

	public readonly renderers: Storage<Renderer> = new Storage<Renderer>();

	private readonly parser: SceneParser = new SceneParser();

	public static async load(url: string): Promise<Scene> {
		const scene = new Scene();

		scene.name = Path.getFileName(url);

		try {
			await scene.parser.parse(url);
		} catch (e) {
			throw new Exception(`Scene: failed to parse '${ url }'`, e);
		}

		scene.camera = scene.parser.camera;

		scene.apply();

		return scene;
	}

	private apply(): void {
		const index: Indexable<number> = {};

		for (let i = 0; i < this.parser.renderers.length; i++) {
			const renderer: Renderer = this.parser.renderers[i];

			let name = renderer.name;

			if (name in index) {
				index[name] += 1;
			} else {
				index[name] = 1;
			}

			this.renderers.set(`${ name } (${ index[name] })`, renderer);
		}
	}

	public update(): void {
		this.camera.update();
		this.renderers.forEach((renderer: Renderer): void => renderer.update());
	}

	public draw(): void {
		this.renderers.forEach((renderer: Renderer): void => renderer.draw());
	}

	protected disposing(): void {
		this.camera.dispose();

		this.renderers.forEach((renderer: Renderer): boolean => renderer.dispose());
		this.renderers.clear();
	}
}

export default Scene;