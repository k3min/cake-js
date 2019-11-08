import Mesh from '../GL/Mesh';
import { Intersectable, Ray, RayHit } from '../Math';
import Bounds from '../Math/Bounds';
import Triangle from '../Math/Triangle';
import { WavefrontVertex } from '../Parsers';
declare class Model extends Mesh<WavefrontVertex> implements Intersectable {
    private readonly parser;
    readonly triangles: Triangle[];
    readonly bounds: Bounds;
    static load(uri: string): Promise<Model>;
    intersect(ray: Ray): RayHit | false;
}
export default Model;
