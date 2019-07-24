import { Storage } from '../Helpers';
import { BindableGraphicsObject } from './Helpers';
export declare enum ShaderType {
    Fragment = 35632,
    Vertex = 35633
}
declare class ShaderProgram extends BindableGraphicsObject<ShaderProgram, WebGLProgram> {
    name: string;
    readonly attributes: Storage<number>;
    readonly uniforms: Storage<WebGLUniformLocation>;
    private vertex;
    private fragment;
    vertexSource: string;
    fragmentSource: string;
    protected readonly identifier: string;
    constructor();
    apply(): void;
    attach(type: ShaderType, sources: string[]): boolean;
    protected disposing(): void;
}
export default ShaderProgram;
