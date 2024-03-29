import { Camera, Renderer } from '../../Cake';
import { SceneRenderer } from './SceneFile';
declare class SceneParser {
    readonly camera: Camera;
    readonly renderers: Renderer[];
    add(object: SceneRenderer): Promise<void>;
    parse(uri: string): Promise<void>;
}
export default SceneParser;
