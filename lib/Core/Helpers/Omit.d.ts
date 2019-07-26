declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export default Omit;
