import React from "react";

interface VideoPlayerProps {
  videoSrc: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, videoRef }) => {
  return (
    <video
      ref={videoRef}
      src={videoSrc}
      controls
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};

export default VideoPlayer;