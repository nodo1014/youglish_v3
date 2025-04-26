// videoUtils.ts
// 비디오 제어 유틸리티 함수 모음

// [Function] 비디오를 재생한다.
export const handlePlay = (videoRef: React.RefObject<HTMLVideoElement>) => {
  videoRef.current?.play();
};

// [Function] 비디오를 일시정지한다.
export const handlePause = (videoRef: React.RefObject<HTMLVideoElement>) => {
  videoRef.current?.pause();
};

// [Function] 비디오를 처음으로 리셋하고 일시정지한다.
export const handleReset = (videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
  }
};

// [Function] 현재 재생 시간을 기준으로 3초 뒤로 이동한다.
export const handleRewind = (videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 3, 0);
  }
};

// [Function] 현재 재생 시간을 기준으로 3초 앞으로 이동한다.
export const handleForward = (videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 3, videoRef.current.duration);
  }
};

// [Function] 비디오 음소거/해제를 토글한다.
export const toggleMute = (videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    videoRef.current.muted = !videoRef.current.muted;
  }
};

// [Function] 현재 재생 시간을 A 지점으로 설정한다.
export const handleSetAPoint = (videoRef: React.RefObject<HTMLVideoElement>, setAPoint: React.Dispatch<React.SetStateAction<number | null>>, bPoint: number | null) => {
  if (videoRef.current) {
    setAPoint(videoRef.current.currentTime);
    if (bPoint !== null && videoRef.current.currentTime > bPoint) {
      setAPoint(null);
    }
  }
};

// [Function] 현재 재생 시간을 B 지점으로 설정한다.
export const handleSetBPoint = (videoRef: React.RefObject<HTMLVideoElement>, aPoint: number | null, setBPoint: React.Dispatch<React.SetStateAction<number | null>>) => {
  if (videoRef.current) {
    const currentTime = videoRef.current.currentTime;
    if (aPoint !== null && currentTime > aPoint) {
      setBPoint(currentTime);
    }
  }
};

// [Function] 현재 재생 시간을 북마크로 추가한다. (중복 방지)
export const handleAddBookmark = (videoRef: React.RefObject<HTMLVideoElement>, setBookmarks: React.Dispatch<React.SetStateAction<number[]>>) => {
  if (videoRef.current) {
    const currentTime = videoRef.current.currentTime;
    setBookmarks((prev) => {
      if (!prev.includes(currentTime)) {
        return [...prev, currentTime].sort((a, b) => a - b);
      }
      return prev;
    });
  }
};

// [Function] 클릭한 북마크로 이동하여 재생한다.
export const handleBookmarkClick = (videoRef: React.RefObject<HTMLVideoElement>, time: number) => {
  if (videoRef.current) {
    videoRef.current.currentTime = time;
    videoRef.current.play();
  }
};

// [Function] 재생바 클릭 시 해당 위치로 이동한다.
export const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>, videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  }
};

// [Function] 초 단위 시간을 "분:초" 형식 문자열로 포맷팅한다.
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}; 