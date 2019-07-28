import { Storage } from '../Core/Helpers';
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
    readonly id: string;
    readonly keywords: string[];
    protected readonly identifier: string;
    constructor(keywords: string[]);
    apply(): void;
    attach(type: ShaderType, sources: string[]): boolean;
    private logCompileStatus;
    protected disposing(): void;
}
export default ShaderProgram;
