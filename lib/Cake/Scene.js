import { Storage } from '../Core/Helpers';
import { Base, Path } from '../Core';
import Exception from '../Core/Exception';
import { SceneParser } from '../Parsers';
class Scene extends Base {
    constructor() {
        super(...arguments);
        this.name = 'Scene';
        this.renderers = new Storage();
        this.parser = new SceneParser();
    }
    static async load(url) {
        const scene = new Scene();
        try {
            await scene.parser.parse(url);
        }
        catch (e) {
            throw new Exception(`Scene: failed to parse '${url}'`, e);
        }
        scene.name = Path.getFileName(url);
        scene.camera = scene.parser.camera;
        scene.apply();
        return scene;
    }
    apply() {
        const index = {};
        for (let i = 0; i < this.parser.renderers.length; i++) {
            const renderer = this.parser.renderers[i];
            let name = renderer.name;
            if (name in index) {
                index[name] += 1;
            }
            else {
                index[name] = 1;
            }
            this.renderers.set(`${name} (${index[name]})`, renderer);
        }
    }
    update() {
        this.camera.update();
        this.renderers.forEach((renderer) => renderer.update());
    }
    draw() {
        this.renderers.forEach((renderer) => renderer.draw());
    }
    disposing() {
        this.camera.dispose();
        this.renderers.forEach((renderer) => renderer.dispose());
        this.renderers.clear();
    }
}
export default Scene;
