import { memo, useEffect, useRef } from 'react';
import Hls from 'hls.js';

type VideoPlayerProps = {
  src: string;
  className?: string;
};

const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (src.endsWith('.mp4')) {
      video.src = src;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (hls) {
          // Force highest quality (4K if available)
          hls.currentLevel = hls.levels.length - 1;
        }
      });
    }

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Ignore autoplay rejection and leave controls hidden.
      }
    };

    playVideo();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src.endsWith('.mp4') ? src : undefined}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
};

export default memo(VideoPlayer);