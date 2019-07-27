export enum SceneObjectType {
	Camera = 'camera',
	Renderer = 'renderer'
}

export interface SceneObject {
	readonly type: SceneObjectType;
	readonly position: number[];
	readonly scale: number[];
}

export interface SceneCamera extends SceneObject {
	readonly fov: number;
	readonly near: number;
	readonly far: number;
	readonly target: number[];
}

export interface SceneRenderer extends SceneObject {
	readonly name: string;
	readonly model: string;
	readonly material: SceneMaterial;
}

export interface SceneMaterial {
	readonly shader: string;
	readonly properties: SceneMaterialProperty[];
}

export enum SceneMaterialPropertyType {
	Float = 'float',
	Int = 'int',
	Vector = 'vector',
	Texture = 'texture',
}

export interface SceneMaterialProperty {
	readonly name: string;
	readonly type: SceneMaterialPropertyType;
	readonly value: any;
}