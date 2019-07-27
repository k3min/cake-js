import Mesh from '../GL/Mesh';
import { WavefrontVertex } from '../Parsers';
declare class Model extends Mesh<WavefrontVertex> {
    private readonly parser;
    static load(url: string): Promise<Model>;
}
export default Model;