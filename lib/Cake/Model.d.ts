import { WavefrontVertex } from '../Parsers';
import { Mesh } from '../GL';
declare class Model extends Mesh<WavefrontVertex> {
    private readonly parser;
    static load(url: string): Promise<Model>;
}
export default Model;
