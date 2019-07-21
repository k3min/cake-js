declare class Keywords {
    private readonly enabled;
    get(item: string): boolean;
    set(item: string, value: boolean): void;
    toArray(): string[];
}
export default Keywords;
