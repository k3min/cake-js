import { Disposable } from '../../Core';
import { Null, BindableObject } from '../../Core/Helpers';
declare abstract class BindableGraphicsObject<T extends BindableGraphicsObject<T, GL>, GL extends WebGLObject> extends BindableObject<T> implements Disposable {
    name: string;
    readonly handle: GL;
    private readonly bindFn;
    private readonly deleteFn;
    protected constructor(genFn: () => Null<GL>, bindFn: (handle: Null<GL>) => void, releaseFn: (handle: GL) => void);
    protected binding(): void;
    protected unbinding(): void;
    protected disposing(): void;
}
export default BindableGraphicsObject;
