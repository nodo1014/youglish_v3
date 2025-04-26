import React from "react";

interface SubtitleSnippetProps {
  onSelect: (startTime: number) => void;
  subtitles: { start: number; text: string }[];
}

const SubtitleSnippet: React.FC<SubtitleSnippetProps> = ({ onSelect, subtitles }) => {
  return (
    <div>
      {subtitles.map((subtitle) => (
        <div key={subtitle.start} onClick={() => onSelect(subtitle.start)}>
          {subtitle.text}
        </div>
      ))}
    </div>
  );
};

export default SubtitleSnippet;