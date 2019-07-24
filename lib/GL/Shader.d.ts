import Texture from './Texture';
import { BindableObject, Disposable, Null, Storage } from '../Helpers';
import { Matrix4x4, Vector } from '../Math';
/**
 * @todo Implement blending, culling, etc.
 */
declare class Shader extends BindableObject<Shader> implements Disposable {
    name: string;
    private variants;
    private readonly parser;
    private textureIndices;
    private textureIndex;
    private variant;
    static floats: Storage<GLfloat>;
    static ints: Storage<GLint>;
    static vectors: Storage<Vector>;
    static matrices: Storage<Matrix4x4>;
    static textures: Storage<Texture>;
    private readonly log;
    readonly attributes: Storage<number>;
    readonly uniforms: Storage<WebGLUniformLocation>;
    keywords: Null<string[]>;
    protected readonly identifier: string;
    static load(url: string): Promise<Shader>;
    apply(): void;
    setFloat(name: string, value: GLfloat): void;
    setInt(name: string, value: GLint): void;
    setMatrix4x4(name: string, value: Matrix4x4): void;
    setVector(name: string, value: Vector): void;
    setTexture(name: string, texture: Texture): void;
    static setFloat(name: string, value: number): void;
    static setInt(name: string, value: number): void;
    static setVector(name: string, value: Vector): void;
    static setMatrix4x4(name: string, value: Matrix4x4): void;
    static setTexture(name: string, value: Texture): void;
    protected onUnbind(): void;
    protected onBind(): void;
    protected disposing(): void;
    private uniformNotFound;
}
export default Shader;
