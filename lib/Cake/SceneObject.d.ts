import { Base } from '../Core';
declare abstract class SceneObject extends Base {
    enabled: boolean;
    name: string;
    protected abstract disposing(): void;
    update(): void;
    abstract updating(): void;
}
export default SceneObject;
