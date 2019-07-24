import Texture2D from './Texture2D';
declare class VideoTexture extends Texture2D {
    static load(url: string): Promise<VideoTexture>;
    play(): Promise<void>;
    pause(): void;
}
export default VideoTexture;
