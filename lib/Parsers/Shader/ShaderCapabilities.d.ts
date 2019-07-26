import BlendFunction from '../../GL/Helpers/BlendFunction';
import CompareFunction from '../../GL/Helpers/CompareFunction';
import CullingMode from '../../GL/Helpers/CullingMode';
export declare enum ShaderCapability {
    Blend = "blend",
    CullFace = "cull",
    DepthTest = "zTest",
    StencilTest = "stencil",
    DepthMask = "zWrite",
    ColorMask = "colorMask"
}
export declare enum ShaderBlendFunction {
    Off = "off",
    Zero = "zero",
    One = "one",
    SrcColor = "srcColor",
    OneMinusSrcColor = "oneMinusSrcColor",
    SrcAlpha = "srcAlpha",
    OneMinusSrcAlpha = "oneMinusSrcAlpha",
    DstAlpha = "dstAlpha",
    OneMinusDstAlpha = "oneMinusDstAlpha",
    DstColor = "dstColor",
    OneMinusDstColor = "oneMinusDstColor",
    SrcAlphaSaturate = "srcAlphaSaturate"
}
export declare enum ShaderCompareFunction {
    Never = "never",
    Less = "less",
    Equal = "equal",
    LessEqual = "lessEqual",
    Greater = "greater",
    NotEqual = "notEqual",
    GreaterEqual = "greaterEqual",
    Always = "always"
}
export declare enum ShaderCullingMode {
    Off = "off",
    Front = "front",
    Back = "back"
}
export declare enum ShaderDepthMask {
    On = "on",
    Off = "off"
}
export declare enum ShaderColorMask {
    R = "r",
    G = "g",
    B = "b",
    A = "a"
}
export interface Blend {
    src: BlendFunction;
    dst: BlendFunction;
}
export interface StencilTest {
    func: CompareFunction;
    ref: GLint;
    mask: GLuint;
}
export interface ColorMask {
    [ShaderColorMask.R]: boolean;
    [ShaderColorMask.G]: boolean;
    [ShaderColorMask.B]: boolean;
    [ShaderColorMask.A]: boolean;
    [c: string]: boolean;
}
export declare const blendFunction: (func: ShaderBlendFunction) => BlendFunction;
export declare const compareFunction: (func: ShaderCompareFunction) => CompareFunction;
export declare const cullingMode: (mode?: ShaderCullingMode | undefined) => boolean | CullingMode;
export declare type ShaderCapabilityValue = Blend | CullingMode | CompareFunction | StencilTest | ColorMask | boolean;
interface ShaderCapabilities {
    [ShaderCapability.Blend]: Blend | boolean;
    [ShaderCapability.CullFace]: CullingMode | boolean;
    [ShaderCapability.DepthTest]: CompareFunction;
    [ShaderCapability.StencilTest]: StencilTest | boolean;
    [ShaderCapability.DepthMask]: boolean;
    [ShaderCapability.ColorMask]: ColorMask;
    [key: string]: ShaderCapabilityValue;
}
export default ShaderCapabilities;
