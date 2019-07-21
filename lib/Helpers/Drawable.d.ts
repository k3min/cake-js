import PrimitiveType from '../GL/Helpers/PrimitiveType';
interface Drawable {
    draw(type: PrimitiveType): void;
}
export default Drawable;
