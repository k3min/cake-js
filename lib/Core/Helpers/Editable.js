import 'reflect-metadata';
export const editable = (x) => new Proxy(x, {
    construct: (target, args) => {
        const instance = new target(...args);
        Editable.proxies.push(instance);
        return instance;
    },
});
class Editable {
    static properties(target, key) {
        return Reflect.getMetadataKeys(target, key);
    }
}
Editable.proxies = [];
export default Editable;
