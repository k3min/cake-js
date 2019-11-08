import 'reflect-metadata';
export declare const editable: (x: any) => void;
declare class Editable {
    static readonly proxies: ProxyConstructor[];
    static properties(target: any, key: string): any[];
}
export default Editable;
