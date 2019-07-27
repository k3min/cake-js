import { Path } from '../Core';
import { TextureFormat } from './Texture';
import Texture2D from './Texture2D';
class VideoTexture extends Texture2D {
    static async load(url) {
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.src = url;
        await video.play();
        const result = new VideoTexture(video.videoWidth, video.videoHeight, TextureFormat.RGBA32);
        result.name = Path.getFileName(url);
        result.data = video;
        result.apply();
        return result;
    }
    play() {
        return this.data.play();
    }
    pause() {
        this.data.pause();
    }
}
export default VideoTexture;
