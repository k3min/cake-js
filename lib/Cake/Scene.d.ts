import { Drawable } from '../GL/Helpers';
import { Storage } from '../Core/Helpers';
import { Base, Updatable } from '../Core';
import Camera from './Camera';
import Renderer from './Renderer';
declare class Scene extends Base implements Updatable, Drawable {
    name: string;
    camera: Camera;
    readonly renderers: Storage<Renderer>;
    private readonly parser;
    static load(url: string): Promise<Scene>;
    private apply;
    update(): void;
    draw(): void;
    protected disposing(): void;
}
export default Scene;
