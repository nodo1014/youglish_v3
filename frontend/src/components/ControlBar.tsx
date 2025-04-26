import React from 'react';
import { FaPlay, FaPause, FaBackward, FaForward, FaStepForward } from 'react-icons/fa';

interface ControlBarProps {
  onPlay: () => void;
  onPause: () => void;
  onReverse: () => void;
  onForward: () => void;
  onNextClip: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ onPlay, onPause, onReverse, onForward, onNextClip }) => {
  return (
    <div className="control-bar flex justify-around items-center gap-4 p-4 bg-gray-800 text-white">
      <button className="p-2 rounded hover:bg-gray-600" onClick={onReverse}>
        <FaBackward />
      </button>
      <button className="p-2 rounded hover:bg-gray-600" onClick={onPlay}>
        <FaPlay />
      </button>
      <button className="p-2 rounded hover:bg-gray-600" onClick={onPause}>
        <FaPause />
      </button>
      <button className="p-2 rounded hover:bg-gray-600" onClick={onForward}>
        <FaForward />
      </button>
      <button className="p-2 rounded hover:bg-gray-600" onClick={onNextClip}>
        <FaStepForward />
      </button>
    </div>
  );
};

export default ControlBar; 