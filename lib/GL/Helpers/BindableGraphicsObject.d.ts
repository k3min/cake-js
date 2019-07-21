import BindableObject from '../../Helpers/BindableObject';
import Disposable from '../../Helpers/Disposable';
import Null from '../../Helpers/Null';
declare abstract class BindableGraphicsObject<T extends BindableGraphicsObject<T, GL>, GL extends WebGLObject> extends BindableObject<T> implements Disposable {
    readonly handle: GL;
    private readonly bindFn;
    private readonly deleteFn;
    protected constructor(genFn: () => GL | null, bindFn: (handle: Null<GL>) => void, releaseFn: (handle: GL) => void);
    protected afterBind(): void;
    protected afterUnbind(): void;
    dispose(): void;
}
export default BindableGraphicsObject;
