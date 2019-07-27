import { Base } from '../Core';
import { Texture, Shader } from '../GL';
import { Matrix4x4, Vector, Color } from '../Math';
declare class Material extends Base {
    name: string;
    private readonly ints;
    private readonly floats;
    private readonly vectors;
    private readonly matrices;
    private readonly textures;
    private readonly colors;
    private readonly keywords;
    readonly shader: Shader;
    constructor(shader: Shader);
    use(): void;
    setKeyword(name: string, value: boolean): void;
    setTexture(name: string, value: Texture): void;
    setVector(name: string, value: Vector): void;
    setMatrix4x4(name: string, value: Matrix4x4): void;
    setInt(name: string, value: GLint): void;
    setFloat(name: string, value: GLfloat): void;
    setColor(name: string, value: Color): void;
    protected disposing(): void;
}
export default Material;
