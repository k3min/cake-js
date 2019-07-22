import { TextureFormat } from './Texture';
import Texture2D from './Texture2D';
const INF = 1.0e20;
const CHAR_OFFSET = '!'.charCodeAt(0);
const CHAR_COUNT = 94;
class Font extends Texture2D {
    constructor(fontSize = 24, buffer = 3, radius = 8, cutoff = 0.25, fontFamily = 'sans-serif', fontWeight = 'normal') {
        super(512, 512, TextureFormat.Alpha8);
        this.chars = new Array(CHAR_COUNT);
        for (let i = 0; i < CHAR_COUNT; i++) {
            this.chars[i] = String.fromCharCode(CHAR_OFFSET + i);
        }
        this.fontSize = fontSize;
        this.buffer = buffer;
        this.cutoff = cutoff;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.radius = radius;
        this.charSize = this.fontSize + (this.buffer * 2);
        this.charSize2 = this.charSize * this.charSize;
        this.middle = Math.round(this.charSize / 2);
        this.charContext = document.createElement('canvas').getContext('2d');
        this.charContext.canvas.width = this.charSize;
        this.charContext.canvas.height = this.charSize;
        this.charContext.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        this.charContext.textBaseline = 'middle';
        this.charContext.fillStyle = 'black';
        this.fontContext = document.createElement('canvas').getContext('2d');
        this.fontContext.canvas.width = this.width;
        this.fontContext.canvas.height = this.height;
        this.gridOuter = new Float64Array(this.charSize2);
        this.gridInner = new Float64Array(this.charSize2);
        this.f = new Float64Array(this.charSize);
        this.z = new Float64Array(this.charSize + 1);
        this.v = new Uint16Array(this.charSize);
        this.size = this.width * this.height;
        this.data = new Uint8Array(this.size);
        this.apply();
    }
    apply() {
        let char = 0;
        for (let y = 0; y + this.charSize <= this.height && char < this.chars.length; y += this.charSize) {
            for (let x = 0; x + this.charSize <= this.width && char < this.chars.length; x += this.charSize) {
                this.draw(this.chars[char++], x, y);
            }
        }
        const data = this.fontContext.getImageData(0, 0, this.width, this.height);
        for (let i = 0; i < this.size; i++) {
            this.data[i] = data.data[(i * 4) + 3];
        }
        super.apply();
    }
    edt(grid) {
        for (let x = 0; x < this.charSize; x++) {
            this.edt1d(grid, x, this.charSize);
        }
        for (let y = 0; y < this.charSize; y++) {
            this.edt1d(grid, y * this.charSize, 1);
        }
    }
    edt1d(grid, offset, stride) {
        let r;
        // noinspection JSJoinVariableDeclarationAndAssignment
        let k;
        this.v[0] = 0;
        this.z[0] = -INF;
        this.z[1] = +INF;
        for (let q = 0; q < this.charSize; q++) {
            this.f[q] = grid[offset + (q * stride)];
        }
        k = 0;
        for (let q = 1, s = 0; q < this.charSize; q++) {
            do {
                r = this.v[k];
                s = (this.f[q] - this.f[r] + q * q - r * r) / (q - r) / 2;
            } while (s <= this.z[k--]);
            k += 2;
            this.v[k] = q;
            this.z[k] = s;
            this.z[k + 1] = INF;
        }
        k = 0;
        for (let q = 0; q < this.charSize; q++) {
            while (this.z[k + 1] < q) {
                k++;
            }
            r = this.v[k];
            grid[offset + (q * stride)] = this.f[r] + (q - r) * (q - r);
        }
    }
    draw(char, x, y) {
        this.charContext.clearRect(0, 0, this.charSize, this.charSize);
        this.charContext.fillText(char, this.buffer, this.middle);
        const charImageData = this.charContext.getImageData(0, 0, this.charSize, this.charSize);
        for (let i = 0; i < this.charSize2; i++) {
            const a = charImageData.data[(i * 4) + 3] / 255;
            this.gridOuter[i] = (a === 1) ? 0.0 : ((a === 0) ? INF : (Math.max(0, 0.5 - a) ** 2));
            this.gridInner[i] = (a === 1) ? INF : ((a === 0) ? 0.0 : (Math.max(0, a - 0.5) ** 2));
        }
        this.edt(this.gridOuter);
        this.edt(this.gridInner);
        const fontImageData = this.fontContext.createImageData(this.charSize, this.charSize);
        for (let i = 0; i < this.charSize2; i++) {
            const outer = Math.sqrt(this.gridOuter[i]);
            const inner = Math.sqrt(this.gridInner[i]);
            const d = ((outer - inner) / this.radius) + this.cutoff;
            const a = Math.round(255 - (255 * d));
            fontImageData.data[(i * 4) + 3] = Math.max(0, Math.min(255, a));
        }
        this.fontContext.putImageData(fontImageData, x, y);
    }
}
export default Font;
