import BlendFunction from '../../GL/Helpers/BlendFunction';
import CompareFunction from '../../GL/Helpers/CompareFunction';
import CullingMode from '../../GL/Helpers/CullingMode';
import StencilFunction from '../../GL/Helpers/StencilFunction';
export declare enum ShaderCapability {
    Blend = "blend",
    CullFace = "cull",
    DepthTest = "zTest",
    StencilTest = "stencil",
    StencilOp = "stencilOp",
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
export declare enum ShaderStencilFunction {
    Keep = "keep",
    Zero = "zero",
    Replace = "replace",
    Increment = "increment",
    IncrementWrap = "incrementWrap",
    Decrement = "decrement",
    DecrementWrap = "decrementWrap",
    Invert = "invert"
}
export interface Blend {
    srcRGB: BlendFunction;
    dstRGB: BlendFunction;
    srcA: BlendFunction | false;
    dstA: BlendFunction | false;
}
export interface StencilOp {
    fail: StencilFunction;
    zFail: StencilFunction;
    zPass: StencilFunction;
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
export declare const stencilFunction: (func: ShaderStencilFunction) => StencilFunction;
export declare const cullingMode: (mode?: ShaderCullingMode | undefined) => false | CullingMode;
export declare type ShaderCapabilityValue = Blend | CullingMode | CompareFunction | StencilTest | ColorMask | StencilOp | boolean;
interface ShaderCapabilities {
    [ShaderCapability.Blend]: Blend | false;
    [ShaderCapability.CullFace]: CullingMode | false;
    [ShaderCapability.DepthTest]: CompareFunction;
    [ShaderCapability.StencilTest]: StencilTest | false;
    [ShaderCapability.DepthMask]: boolean;
    [ShaderCapability.ColorMask]: ColorMask;
    [ShaderCapability.StencilOp]: StencilOp;
    [key: string]: ShaderCapabilityValue;
}
export default ShaderCapabilities;
