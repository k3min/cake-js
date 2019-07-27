import Context, { Shader } from '../GL';
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
        Matrix4x4.lookAt(this.position, this.target, this.worldToLocal);
        Matrix4x4.inverse(this.worldToLocal, this.localToWorld);
        Matrix4x4.perspective(this.fov, Context.drawingBufferWidth / Context.drawingBufferHeight, this.near, this.far, this.projection);
        Matrix4x4.multiply(this.projection, this.worldToLocal, this.viewProjection);
        Matrix4x4.inverse(this.projection, this.invP);
        Shader.setMatrix4x4('MATRIX_P', this.projection);
        Shader.setMatrix4x4('MATRIX_VP', this.viewProjection);
        Shader.setMatrix4x4('MATRIX_V', this.worldToLocal);
        Shader.setMatrix4x4('_CameraInvP', this.invP);
        Shader.setMatrix4x4('_Camera2World', this.localToWorld);
        Shader.setVector('_WorldSpaceCameraPos', this.position);
    }
    disposing() {
    }
}
export default Camera;
