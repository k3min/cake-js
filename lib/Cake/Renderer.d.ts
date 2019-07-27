import { Drawable } from '../GL/Helpers';
import { Matrix4x4 } from '../Math';
import Vector3 from '../Math/Vector3';
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
    update(): void;
    draw(): void;
    protected disposing(): void;
}
export default Renderer;
