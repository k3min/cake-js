declare class Toggle<T = string> {
    private readonly enabled;
    get(item: T): boolean;
    set(item: T, value: boolean): boolean;
    toArray(): T[];
}
export default Toggle;
