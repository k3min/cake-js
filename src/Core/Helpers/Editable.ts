import 'reflect-metadata';

export const editable = (x: any): void => new Proxy(x, {
	construct: (target: any, args: any) => {
		const instance = new target(...args);
		Editable.proxies.push(instance);
		return instance;
	},
});

class Editable {
	public static readonly proxies: ProxyConstructor[] = [];

	public static properties(target: any, key: string): any[] {
		return Reflect.getMetadataKeys(target, key);
	}
}

export default Editable;