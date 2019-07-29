import { Log } from '../../Core';
import Context from '../../GL/Context';
import BlendFunction from '../../GL/Helpers/BlendFunction';
import CompareFunction from '../../GL/Helpers/CompareFunction';
import CullingMode from '../../GL/Helpers/CullingMode';
import StencilFunction from '../../GL/Helpers/StencilFunction';
export var ShaderCapability;
(function (ShaderCapability) {
    ShaderCapability["Blend"] = "blend";
    ShaderCapability["CullFace"] = "cull";
    ShaderCapability["DepthTest"] = "zTest";
    ShaderCapability["StencilTest"] = "stencil";
    ShaderCapability["StencilOp"] = "stencilOp";
    ShaderCapability["DepthMask"] = "zWrite";
    ShaderCapability["ColorMask"] = "colorMask";
})(ShaderCapability || (ShaderCapability = {}));
export var ShaderBlendFunction;
(function (ShaderBlendFunction) {
    ShaderBlendFunction["Off"] = "off";
    ShaderBlendFunction["Zero"] = "zero";
    ShaderBlendFunction["One"] = "one";
    ShaderBlendFunction["SrcColor"] = "srcColor";
    ShaderBlendFunction["OneMinusSrcColor"] = "oneMinusSrcColor";
    ShaderBlendFunction["SrcAlpha"] = "srcAlpha";
    ShaderBlendFunction["OneMinusSrcAlpha"] = "oneMinusSrcAlpha";
    ShaderBlendFunction["DstAlpha"] = "dstAlpha";
    ShaderBlendFunction["OneMinusDstAlpha"] = "oneMinusDstAlpha";
    ShaderBlendFunction["DstColor"] = "dstColor";
    ShaderBlendFunction["OneMinusDstColor"] = "oneMinusDstColor";
    ShaderBlendFunction["SrcAlphaSaturate"] = "srcAlphaSaturate";
})(ShaderBlendFunction || (ShaderBlendFunction = {}));
export var ShaderCompareFunction;
(function (ShaderCompareFunction) {
    ShaderCompareFunction["Never"] = "never";
    ShaderCompareFunction["Less"] = "less";
    ShaderCompareFunction["Equal"] = "equal";
    ShaderCompareFunction["LessEqual"] = "lessEqual";
    ShaderCompareFunction["Greater"] = "greater";
    ShaderCompareFunction["NotEqual"] = "notEqual";
    ShaderCompareFunction["GreaterEqual"] = "greaterEqual";
    ShaderCompareFunction["Always"] = "always";
})(ShaderCompareFunction || (ShaderCompareFunction = {}));
export var ShaderCullingMode;
(function (ShaderCullingMode) {
    ShaderCullingMode["Off"] = "off";
    ShaderCullingMode["Front"] = "front";
    ShaderCullingMode["Back"] = "back";
})(ShaderCullingMode || (ShaderCullingMode = {}));
export var ShaderDepthMask;
(function (ShaderDepthMask) {
    ShaderDepthMask["On"] = "on";
    ShaderDepthMask["Off"] = "off";
})(ShaderDepthMask || (ShaderDepthMask = {}));
export var ShaderColorMask;
(function (ShaderColorMask) {
    ShaderColorMask["R"] = "r";
    ShaderColorMask["G"] = "g";
    ShaderColorMask["B"] = "b";
    ShaderColorMask["A"] = "a";
})(ShaderColorMask || (ShaderColorMask = {}));
export var ShaderStencilFunction;
(function (ShaderStencilFunction) {
    ShaderStencilFunction["Keep"] = "keep";
    ShaderStencilFunction["Zero"] = "zero";
    ShaderStencilFunction["Replace"] = "replace";
    ShaderStencilFunction["Increment"] = "increment";
    ShaderStencilFunction["IncrementWrap"] = "incrementWrap";
    ShaderStencilFunction["Decrement"] = "decrement";
    ShaderStencilFunction["DecrementWrap"] = "decrementWrap";
    ShaderStencilFunction["Invert"] = "invert";
})(ShaderStencilFunction || (ShaderStencilFunction = {}));
const cast = (input, from, to) => {
    const keyIndex = Object.values(from).indexOf(input);
    if (keyIndex === -1) {
        throw new ReferenceError();
    }
    const key = Object.keys(from)[keyIndex];
    const valueIndex = Object.keys(to).indexOf(key);
    if (valueIndex === -1) {
        throw new ReferenceError();
    }
    const value = Object.values(to)[valueIndex];
    Log.debug(`ShaderCapability: '${input}' → ${Context.enumToString(value).join(' | ')} (${value})`);
    return value;
};
export const blendFunction = (func) => {
    return cast(func, ShaderBlendFunction, BlendFunction);
};
export const compareFunction = (func) => {
    return cast(func, ShaderCompareFunction, CompareFunction);
};
export const stencilFunction = (func) => {
    return cast(func, ShaderStencilFunction, StencilFunction);
};
export const cullingMode = (mode) => {
    switch (mode) {
        case ShaderCullingMode.Back:
            return CullingMode.Back;
        case ShaderCullingMode.Front:
            return CullingMode.Front;
        default:
            return false;
    }
};
