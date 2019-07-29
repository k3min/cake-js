import { Base, Bindable } from '../Core';
import { Null, Storage } from '../Core/Helpers';
import { Color, Matrix4x4, Vector } from '../Math';
import ShaderProgram from './ShaderProgram';
import Texture from './Texture';
/**
 * @todo Unset uniforms without (valid) value
 * @todo Warn about wrong attribute type
 */
declare class Shader extends Base implements Bindable {
    name: string;
    private static _bound;
    private variants;
    private readonly parser;
    private textureIndices;
    private _variant;
    static floats: Storage<GLfloat>;
    static ints: Storage<GLint>;
    static vectors: Storage<Vector>;
    static matrices: Storage<Matrix4x4>;
    static textures: Storage<Texture>;
    static colors: Storage<Color>;
    private readonly log;
    static readonly bound: Null<Shader>;
    readonly attributes: Storage<number>;
    readonly uniforms: Storage<WebGLUniformLocation>;
    readonly variant: ShaderProgram;
    keywords: Null<string[]>;
    static load(uri: string): Promise<Shader>;
    private apply;
    private logUniformNotFound;
    private getUniform;
    setColor(name: string, value: Color, check?: boolean): void;
    setFloat(name: string, value: GLfloat, check?: boolean): void;
    setInt(name: string, value: GLint, check?: boolean): void;
    setMatrix4x4(name: string, value: Matrix4x4, check?: boolean): void;
    setVector(name: string, value: Vector, check?: boolean): void;
    setTexture(name: string, texture: Texture, check?: boolean): void;
    static setFloat(name: string, value: number): void;
    static setInt(name: string, value: number): void;
    static setVector(name: string, value: Vector): void;
    static setMatrix4x4(name: string, value: Matrix4x4): void;
    static setTexture(name: string, value: Texture): void;
    static setColor(name: string, value: Color): void;
    private setCap;
    unbind(): boolean;
    bind(): boolean;
    protected disposing(): void;
}
export default Shader;
