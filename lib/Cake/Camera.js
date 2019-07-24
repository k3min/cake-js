import { Shader } from '../GL';
import { Matrix4x4, Vector3 } from '../Math';
import Transform from './Transform';
class Camera extends Transform {
    constructor() {
        super();
        this.name = 'Camera';
        this.fov = 70;
        this.near = 0.1;
        this.far = 100;
        this.position = new Vector3(0, 0, -10);
        this.target = Vector3.zero;
        this.projection = Matrix4x4.identity;
        this.viewProjection = Matrix4x4.identity;
        Camera.main = this;
    }
    update() {
        this.projection.perspective(this.fov, 1, this.near, this.far);
        this.worldToLocal.lookAt(this.position, this.target);
        Matrix4x4.inverse(this.worldToLocal, this.localToWorld);
        Matrix4x4.multiply(this.projection, this.worldToLocal, this.viewProjection);
        Shader.setMatrix4x4('MATRIX_P', this.projection);
        Shader.setMatrix4x4('MATRIX_VP', this.viewProjection);
        Shader.setMatrix4x4('MATRIX_V', this.worldToLocal);
    }
    disposing() {
    }
}
export default Camera;
