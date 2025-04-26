// =====================================
// VideoPlayer.tsx
// 비디오 플레이어 컴포넌트
// - 비디오 재생, 일시정지, 초기화 기능 제공
// - 3초 앞으로/뒤로 이동 기능 제공
// - A-B 구간 반복 기능 제공
// - 북마크 추가 및 북마크 클릭 이동 기능 제공
// - 커스텀 재생바 구현 (재생 위치, 북마크, A/B 지점 표시)
// - 재생 시간 업데이트 시 onTimeUpdate 콜백으로 상위 컴포넌트에 현재 시간을 전달
// =====================================

import React, { useState, useEffect } from "react";
import { handlePlay, handlePause, handleReset, handleRewind, handleForward, toggleMute, handleSetAPoint, handleSetBPoint, handleAddBookmark, handleBookmarkClick, formatTime } from './videoUtils';

interface VideoPlayerProps {
  videoSrc: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTimeUpdate?: (time: number) => void; // ✅ 추가
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, videoRef, onTimeUpdate }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [aPoint, setAPoint] = useState<number | null>(null);
  const [bPoint, setBPoint] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // [Effect] 재생 시간 업데이트 및 A-B 반복 재생 관리
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime); // ✅ 추가
      }
      if (aPoint !== null && bPoint !== null && video.currentTime >= bPoint) {
        video.currentTime = aPoint;
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef, aPoint, bPoint, onTimeUpdate]);

  // [Function] 재생바 클릭 시 해당 위치로 이동한다.
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / rect.width;
      videoRef.current.currentTime = ratio * videoRef.current.duration;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        style={{
          width: "640px",
          maxWidth: "100%",
          height: "auto",
          background: "#000",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
        }}
      />
      <div
        onClick={handleProgressClick}
        style={{
          width: "640px",
          height: "10px",
          backgroundColor: "#ccc",
          cursor: "pointer",
          marginTop: "10px",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "10px",
            backgroundColor: "#007bff",
            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            borderRadius: "5px",
          }}
        />
        {aPoint !== null && (
          <div style={{
            position: "absolute",
            top: 0,
            left: `${(aPoint / duration) * 100}%`,
            width: "4px",
            height: "10px",
            backgroundColor: "red"
          }} />
        )}
        {bPoint !== null && (
          <div style={{
            position: "absolute",
            top: 0,
            left: `${(bPoint / duration) * 100}%`,
            width: "4px",
            height: "10px",
            backgroundColor: "green"
          }} />
        )}
      </div>

      {/* 컨트롤 버튼 그룹 */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <button onClick={() => handlePlay(videoRef)}>▶️ 재생</button>
        <button onClick={() => handlePause(videoRef)}>⏸️ 일시정지</button>
        <button onClick={() => handleReset(videoRef)}>⏮️ 처음으로</button>
        <button onClick={() => handleRewind(videoRef)}>⏪ 3초 뒤로</button>
        <button onClick={() => handleForward(videoRef)}>⏩ 3초 앞으로</button>
        <button onClick={() => toggleMute(videoRef)}>🔇 음소거/해제</button>
        <button onClick={() => handleSetAPoint(videoRef, setAPoint, bPoint, setBPoint)}>A 설정</button>
        <button onClick={() => handleSetBPoint(videoRef, aPoint, setBPoint)}>B 설정</button>
        <button onClick={() => handleAddBookmark(videoRef, setBookmarks)}>북마크 추가</button>
      </div>

      {/* 북마크 리스트 */}
      {bookmarks.length > 0 && (
        <div style={{ marginTop: "10px", width: "640px", maxWidth: "100%" }}>
          <strong>북마크 목록:</strong>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {bookmarks.map((time, index) => (
              <li
                key={index}
                style={{ cursor: "pointer", color: "blue", textDecoration: "underline", marginBottom: "5px" }}
                onClick={() => handleBookmarkClick(videoRef, time)}
              >
                {formatTime(time)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;