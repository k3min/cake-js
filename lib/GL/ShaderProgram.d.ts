import Null from '../Helpers/Null';
import Storage from '../Helpers/Storage';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
export declare type ShaderAttribute = number | undefined;
export declare type ShaderUniform = Null<WebGLUniformLocation>;
declare class ShaderProgram extends BindableGraphicsObject<ShaderProgram, WebGLProgram> {
    name: string;
    attributes: Storage<ShaderAttribute>;
    uniforms: Storage<ShaderUniform>;
    private vertex;
    private fragment;
    vertexSource: string;
    fragmentSource: string;
    protected readonly identifier: string;
    constructor();
    apply(): void;
    attach(type: GLenum, sources: string[]): void;
    dispose(): void;
}
export default ShaderProgram;
