import { Base } from '../Core';
class SceneObject extends Base {
    constructor() {
        super(...arguments);
        this.enabled = true;
        this.name = 'SceneObject';
    }
    update() {
        if (!this.enabled) {
            return;
        }
        this.updating();
    }
}
export default SceneObject;
