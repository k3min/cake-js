import { Path } from '../Helpers';
import { TextureFormat } from './Texture';
import Texture2D from './Texture2D';

class VideoTexture extends Texture2D {
	public static async load(url: string): Promise<VideoTexture> {
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

	public play(): Promise<void> {
		return (this.data as HTMLMediaElement).play();
	}

	public pause(): void {
		(this.data as HTMLMediaElement).pause();
	}
}

export default VideoTexture;