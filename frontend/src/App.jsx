import { useEffect, useRef, useState } from "react";

// App.jsx
// Youglish 스타일 영어 학습용 미니 비디오 플레이어
// 비디오 재생, 자막 클릭 이동, 구간 반복, 북마크 저장, 검색 기능 제공
// [Last Updated: 2025-04-26]

const App = () => {
  const videoRef = useRef(null); // 비디오 엘리먼트 참조
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 비디오 총 길이
  const [isMuted, setIsMuted] = useState(false); // 음소거 상태
  const [aPoint, setAPoint] = useState(null); // 구간 반복 A 지점
  const [bPoint, setBPoint] = useState(null); // 구간 반복 B 지점
  const [bookmarks, setBookmarks] = useState([]); // 북마크 리스트
  const [playbackRate, setPlaybackRate] = useState(1.0); // 재생 속도
  const [searchTerm, setSearchTerm] = useState(''); // 자막 검색어
  const subtitleRefs = useRef([]); // 자막 엘리먼트 참조

  // [Mock subtitles] - sample.mp4 기준 (5초 이내)
  const subtitles = [
    { start: 1, text: "Hello" },
    { start: 3, text: "How are you?" },
    { start: 4, text: "Goodbye" },
  ];

  // [Function] 비디오 재생
  const handlePlay = () => {
    videoRef.current?.play();
  };

  // [Function] 비디오 일시정지
  const handlePause = () => {
    videoRef.current?.pause();
  };

  // [Function] 비디오 처음으로 이동 후 정지
  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  // [Function] 5초 뒤로 이동
  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
    }
  };

  // [Function] 5초 앞으로 이동
  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, videoRef.current.duration);
    }
  };

  // [Function] 음소거/해제
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // [Function] 현재 재생 시간을 A 포인트로 저장
  const setStartPoint = () => {
    if (videoRef.current) {
      setAPoint(videoRef.current.currentTime);
    }
  };

  // [Function] 현재 재생 시간을 B 포인트로 저장
  const setEndPoint = () => {
    if (videoRef.current) {
      setBPoint(videoRef.current.currentTime);
    }
  };

  // [Function] 현재 재생 시간을 북마크로 추가 (LocalStorage 저장 포함)
  const addBookmark = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setBookmarks((prev) => {
        const updated = [...prev, time];
        localStorage.setItem("bookmarks", JSON.stringify(updated));
        return updated;
      });
    }
  };

  // [Function] 북마크 삭제
  const deleteBookmark = (index) => {
    setBookmarks((prev) => {
      const updated = [...prev.slice(0, index), ...prev.slice(index + 1)];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  // [Function] 재생 속도 변경
  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  // [Function] 비디오 진행 바 클릭 시 이동
  const handleProgressClick = (e) => {
    if (videoRef.current && duration) {
      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / rect.width;
      videoRef.current.currentTime = ratio * duration;
    }
  };

  // [Effect] 초기 로딩 시 북마크 복구
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(savedBookmarks);
  }, []);

  // [Effect] 재생 시간 체크 및 구간 반복 처리
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        setCurrentTime(current);
        setDuration(videoRef.current.duration);

        // [구간 반복] B를 넘으면 A로 이동
        if (aPoint !== null && bPoint !== null && current >= bPoint) {
          videoRef.current.currentTime = aPoint;
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, [aPoint, bPoint]);

  // [검색된 자막 리스트] 필터링
  const filteredSubtitles = subtitles.filter((subtitle) =>
    subtitle.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      {/* 비디오 컴포넌트 */}
      <video
        ref={videoRef}
        src="/sample.mp4"
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

      {/* 자막 검색 입력창 */}
      <input
        type="text"
        placeholder="Search subtitles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "640px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      {/* 자막 리스트 */}
      <div style={{
        width: "640px",
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        maxHeight: "300px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}>
        {filteredSubtitles.map((subtitle, index) => {
          const nextSubtitle = filteredSubtitles[index + 1];
          const nextStart = nextSubtitle ? nextSubtitle.start : duration;
          const isActive = currentTime >= subtitle.start && currentTime < nextStart;

          return (
            <div
              key={subtitle.start}
              onClick={() => handleSubtitleSelect(subtitle.start)}
              style={{
                cursor: "pointer",
                padding: "6px",
                backgroundColor: isActive ? "#00aaff" : "#fff",
                color: isActive ? "#fff" : "#000",
                borderRadius: "5px",
                fontSize: "14px",
                transition: "background-color 0.3s",
              }}
            >
              {subtitle.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;