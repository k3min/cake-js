import { Matrix4x4 } from '../Math';
import Vector3 from '../Math/Vector3';
import Camera from './Camera';
import Transform from './Transform';
class Renderer extends Transform {
    constructor() {
        super(...arguments);
        this.name = 'Renderer';
        this.scale = Vector3.one;
        this.modelView = Matrix4x4.identity;
        this.modelViewProjection = Matrix4x4.identity;
        this.prevLocalToWorld = Matrix4x4.identity;
    }
    updating() {
        this.localToWorld.copyTo(this.prevLocalToWorld);
        this.localToWorld.translation = this.position;
        this.localToWorld.scaling = this.scale;
        Matrix4x4.inverse(this.localToWorld, this.worldToLocal);
        Matrix4x4.multiply(Camera.main.worldToLocal, this.localToWorld, this.modelView);
        Matrix4x4.multiply(Camera.main.viewProjection, this.localToWorld, this.modelViewProjection);
        this.material.setMatrix4x4('cake_PreviousM', this.prevLocalToWorld);
        this.material.setMatrix4x4('cake_ObjectToWorld', this.localToWorld);
        this.material.setMatrix4x4('cake_WorldToObject', this.worldToLocal);
        this.material.setMatrix4x4('cake_ModelView', this.modelView);
        this.material.setMatrix4x4('cake_ModelViewProjection', this.modelViewProjection);
    }
    draw() {
        if (!this.enabled) {
            return;
        }
        this.material.use();
        this.model.draw();
    }
    disposing() {
        this.model.dispose();
        this.material.dispose();
    }
}
export default Renderer;
