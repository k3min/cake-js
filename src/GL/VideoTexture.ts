import { Path } from '../Core';
import { version } from '../Core/Helpers';
import { TextureFormat } from './Texture';
import Texture2D from './Texture2D';

class VideoTexture extends Texture2D {
	public static async load(uri: string): Promise<VideoTexture> {
		const video = document.createElement('video');

		video.autoplay = true;
		video.muted = true;
		video.loop = true;

		video.src = version(uri);

		await video.play();

		const result = new VideoTexture(video.videoWidth, video.videoHeight, TextureFormat.ARGB32);

		result.name = Path.getFileName(uri);
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