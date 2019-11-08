import { Drawable } from '../GL/Helpers';
import { Matrix4x4, Vector3 } from '../Math';
import Material from './Material';
import Model from './Model';
import Transform from './Transform';
declare class Renderer extends Transform implements Drawable {
    name: string;
    model: Model;
    material: Material;
    readonly scale: Vector3;
    protected readonly modelView: Matrix4x4;
    protected readonly modelViewProjection: Matrix4x4;
    protected readonly prevLocalToWorld: Matrix4x4;
    updating(): void;
    draw(): void;
    protected disposing(): void;
}
export default Renderer;
