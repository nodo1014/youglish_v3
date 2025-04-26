import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoPlayer from './components/VideoPlayer';
import ControlBar from './components/ControlBar';
import SubtitleSnippet from './components/SubtitleSnippet';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('00:00:10');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const subtitles = [
    { text: 'This is a sample subtitle line 1.', time: '00:00:09' },
    { text: 'This is a sample subtitle line 2.', time: '00:00:10' },
    { text: 'This is a sample subtitle line 3.', time: '00:00:11' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Search query: ${query}`);
  };

  const toSeconds = (time: string) => {
    const [h, m, s] = time.split(':').map(Number);
    return h * 3600 + m * 60 + s;
  };

  const handleSelectSubtitle = (index: number) => {
    setSelectedIndex(index);
    const start = toSeconds(subtitles[Math.max(0, index - 1)].time);
    const end = toSeconds(subtitles[Math.min(subtitles.length - 1, index + 1)].time);

    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.play();

      const interval = setInterval(() => {
        if (videoRef.current && videoRef.current.currentTime >= end) {
          videoRef.current.currentTime = start;
        }
      }, 200);

      setTimeout(() => clearInterval(interval), (end - start + 5) * 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="col-span-1 lg:col-span-1">
          <VideoPlayer videoRef={videoRef} />
          <ControlBar />
        </div>
        <div className="col-span-1 lg:col-span-1">
          <SubtitleSnippet
            subtitles={subtitles}
            currentTime={currentTime}
            onSelect={handleSelectSubtitle}
            selectedIndex={selectedIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default App;