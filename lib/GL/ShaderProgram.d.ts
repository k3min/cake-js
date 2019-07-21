import Null from '../Helpers/Null';
import Storage from '../Helpers/Storage';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
export declare type ShaderAttribute = number | undefined;
export declare type ShaderUniform = Null<WebGLUniformLocation>;
export declare enum ShaderType {
    Vertex,
    Fragment
}
declare class ShaderProgram extends BindableGraphicsObject<ShaderProgram, WebGLProgram> {
    attributes: Storage<ShaderAttribute>;
    uniforms: Storage<ShaderUniform>;
    private vertex;
    private fragment;
    vertexSource: string;
    fragmentSource: string;
    protected readonly identifier: string;
    constructor();
    apply(): void;
    attach(type: ShaderType, sources: string[]): void;
    dispose(): void;
}
export default ShaderProgram;
