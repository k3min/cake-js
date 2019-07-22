import Texture2D from './Texture2D';
declare class Font extends Texture2D {
    private readonly charContext;
    private readonly fontContext;
    private readonly chars;
    private readonly fontSize;
    private readonly buffer;
    private readonly radius;
    private readonly cutoff;
    private readonly fontFamily;
    private readonly fontWeight;
    private readonly charSize;
    private readonly charSize2;
    private readonly middle;
    private readonly size;
    private readonly gridOuter;
    private readonly gridInner;
    private readonly f;
    private readonly z;
    private readonly v;
    constructor(fontSize?: number, buffer?: number, radius?: number, cutoff?: number, fontFamily?: string, fontWeight?: string);
    apply(): void;
    private edt;
    private edt1d;
    private draw;
}
export default Font;
