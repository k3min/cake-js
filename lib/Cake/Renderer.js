import { Matrix4x4 } from '../Math';
import Vector3 from '../Math/Vector3';
import Camera from './Camera';
import Transform from './Transform';
class Renderer extends Transform {
    constructor() {
        super(...arguments);
        this.name = 'Renderer';
        this.scale = Vector3.one;
        this.mv = Matrix4x4.identity;
        this.mvp = Matrix4x4.identity;
    }
    update() {
        this.localToWorld[0] = this.scale[0];
        this.localToWorld[5] = this.scale[1];
        this.localToWorld[10] = this.scale[2];
        this.localToWorld[12] = this.position[0];
        this.localToWorld[13] = this.position[1];
        this.localToWorld[14] = this.position[2];
        Matrix4x4.inverse(this.localToWorld, this.worldToLocal);
        Matrix4x4.multiply(Camera.main.worldToLocal, this.localToWorld, this.mv);
        Matrix4x4.multiply(Camera.main.viewProjection, this.localToWorld, this.mvp);
        this.material.setMatrix4x4('_Object2World', this.localToWorld);
        this.material.setMatrix4x4('_World2Object', this.worldToLocal);
        this.material.setMatrix4x4('MATRIX_MV', this.mv);
        this.material.setMatrix4x4('MATRIX_MVP', this.mvp);
    }
    draw() {
        this.material.use();
        this.model.draw();
    }
    disposing() {
        this.model.dispose();
        this.material.dispose();
    }
}
export default Renderer;
