import { Matrix4x4, Vector3 } from '../Math';
import Transform from './Transform';
/**
 * @todo Implement Bindable
 */
declare class Camera extends Transform {
    static main: Camera;
    name: string;
    fov: number;
    near: number;
    far: number;
    readonly position: Vector3;
    readonly target: Vector3;
    readonly projection: Matrix4x4;
    readonly invProjection: Matrix4x4;
    readonly viewProjection: Matrix4x4;
    readonly prevViewProjection: Matrix4x4;
    constructor();
    updating(): void;
    protected disposing(): void;
}
export default Camera;
