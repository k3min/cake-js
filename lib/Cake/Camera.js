import GL, { Shader } from '../GL';
import { Matrix4x4, Vector3 } from '../Math';
import Transform from './Transform';
/**
 * @todo Implement Bindable
 */
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
        this.invP = Matrix4x4.identity;
        this.viewProjection = Matrix4x4.identity;
        Camera.main = this;
    }
    update() {
        this.projection.perspective(this.fov, GL.drawingBufferWidth / GL.drawingBufferHeight, this.near, this.far);
        Matrix4x4.inverse(this.projection, this.invP);
        this.worldToLocal.lookAt(this.position, this.target);
        Matrix4x4.inverse(this.worldToLocal, this.localToWorld);
        Matrix4x4.multiply(this.projection, this.worldToLocal, this.viewProjection);
        Shader.setMatrix4x4('MATRIX_P', this.projection);
        Shader.setMatrix4x4('MATRIX_VP', this.viewProjection);
        Shader.setMatrix4x4('MATRIX_V', this.worldToLocal);
        Shader.setMatrix4x4('_CameraInvP', this.invP);
        Shader.setMatrix4x4('_Camera2World', this.localToWorld);
    }
    disposing() {
    }
}
export default Camera;
