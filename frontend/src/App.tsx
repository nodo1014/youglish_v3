// =====================================
// App.tsx
// 메인 화면 컴포넌트
// - VideoPlayer를 렌더링하고 비디오를 관리한다.
// - 자막 검색 기능을 제공한다.
// - 자막 클릭 시 해당 시점으로 이동한다.
// - 현재 재생 중인 자막을 하이라이트하고 자동 스크롤한다.
// =====================================
import React, { useRef, useState, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";

interface Subtitle {
  start: number;
  text: string;
}

const sampleSubtitles: Subtitle[] = [
  { start: 1, text: "Hello, welcome to the video." },
  { start: 3, text: "Let's learn something new today." },
  { start: 4, text: "Thank you for watching!" },
];

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 엘리먼트를 참조하기 위한 ref
  const [searchTerm, setSearchTerm] = useState<string>(""); // 자막 검색어를 저장하는 상태
  const [currentTime, setCurrentTime] = useState<number>(0); // 현재 비디오 재생 시간을 저장하는 상태
  const activeSubtitleRef = useRef<HTMLDivElement>(null); // 현재 재생 중인 자막을 참조하기 위한 ref

  // 검색어에 따라 필터링된 자막 목록을 반환한다.
  const filteredSubtitles = sampleSubtitles.filter(sub =>
    sub.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 자막을 클릭했을 때 해당 시작 시간으로 비디오를 이동시킨다.
  const handleSubtitleSelect = (start: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.play();
    }
  };

  // 현재 재생 중인 자막을 화면 중앙으로 스크롤한다.
  useEffect(() => {
    if (activeSubtitleRef.current) {
      activeSubtitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTime]); // ✅ currentTime 변할 때마다 스크롤

  return (
    <div style={{ padding: "20px" }}>
      <VideoPlayer videoRef={videoRef} videoSrc="/sample.mp4" onTimeUpdate={setCurrentTime} />

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="자막 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "300px",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginTop: "10px", maxHeight: "300px", overflowY: "auto" }}>
        {filteredSubtitles.map((subtitle, index) => {
          const isActive =
            currentTime >= subtitle.start &&
            (index === filteredSubtitles.length - 1 || currentTime < filteredSubtitles[index + 1].start);

          return (
            <div
              key={index}
              ref={isActive ? activeSubtitleRef : null} // ✅ 현재 재생 자막만 ref 연결
              style={{
                marginBottom: "8px",
                cursor: "pointer",
                color: "#333",
                backgroundColor: isActive ? "#e0f7ff" : "transparent",
                fontWeight: isActive ? "bold" : "normal",
                padding: "6px 10px",
                borderRadius: "6px",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleSubtitleSelect(subtitle.start)}
            >
              [{subtitle.start.toFixed(2)}s] {subtitle.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;