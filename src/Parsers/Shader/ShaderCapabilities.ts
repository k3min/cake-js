import BlendFunction from '../../GL/Helpers/BlendFunction';
import CompareFunction from '../../GL/Helpers/CompareFunction';
import CullingMode from '../../GL/Helpers/CullingMode';

export enum ShaderCapability {
	Blend = 'blend',
	CullFace = 'cull',
	DepthTest = 'zTest',
	StencilTest = 'stencil',
	DepthMask = 'zWrite',
	ColorMask = 'colorMask'
}

export enum ShaderBlendFunction {
	Off = 'off',
	Zero = 'zero',
	One = 'one',
	SrcColor = 'srcColor',
	OneMinusSrcColor = 'oneMinusSrcColor',
	SrcAlpha = 'srcAlpha',
	OneMinusSrcAlpha = 'oneMinusSrcAlpha',
	DstAlpha = 'dstAlpha',
	OneMinusDstAlpha = 'oneMinusDstAlpha',
	DstColor = 'dstColor',
	OneMinusDstColor = 'oneMinusDstColor',
	SrcAlphaSaturate = 'srcAlphaSaturate'
}

export enum ShaderCompareFunction {
	Never = 'never',
	Less = 'less',
	Equal = 'equal',
	LessEqual = 'lessEqual',
	Greater = 'greater',
	NotEqual = 'notEqual',
	GreaterEqual = 'greaterEqual',
	Always = 'always',
}

export enum ShaderCullingMode {
	Off = 'off',
	Front = 'front',
	Back = 'back',
}

export enum ShaderDepthMask {
	On = 'on',
	Off = 'off',
}

export enum ShaderColorMask {
	R = 'r',
	G = 'g',
	B = 'b',
	A = 'a',
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

const cast = <From, To>(input: From, from: Object, to: Object): To => {
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

	console.debug(`ShaderCapability: ${ input } → ${ value }`);

	return value;
};

export const blendFunction = (func: ShaderBlendFunction): BlendFunction => {
	return cast(func, ShaderBlendFunction, BlendFunction);
};

export const compareFunction = (func: ShaderCompareFunction): CompareFunction => {
	return cast(func, ShaderCompareFunction, CompareFunction);
};

export const cullingMode = (mode?: ShaderCullingMode): CullingMode | boolean => {
	switch (mode) {
		case ShaderCullingMode.Back:
			return CullingMode.Back;

		case ShaderCullingMode.Front:
			return CullingMode.Front;

		default:
			return false;
	}
};

export type ShaderCapabilityValue = Blend | CullingMode | CompareFunction | StencilTest | ColorMask | boolean;

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