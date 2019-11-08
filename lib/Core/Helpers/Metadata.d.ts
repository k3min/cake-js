interface Metadata {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
}
export default Metadata;
