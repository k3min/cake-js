import { Vertex } from '../GL/Helpers/WavefrontParser';
import Model from '../GL/Model';
declare class Wavefront extends Model<Vertex> {
    private readonly parser;
    static load(url: string): Promise<Wavefront>;
}
export default Wavefront;
