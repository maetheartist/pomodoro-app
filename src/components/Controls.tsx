import React from 'react';

interface ControlsProps {
    durations: {
      work: number;
      shortBreak: number;
      longBreak: number;
    };
    setDurations: React.Dispatch<React.SetStateAction<{
      work: number;
      shortBreak: number;
      longBreak: number;
    }>>;
  }


interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onResume,
}) => {
  return (
    <div className="flex gap-4 justify-center mt-6 shadow-lg  rounded-lg">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="bg-green-500 text-white px-6 py-2 rounded-2xl shadow hover:bg-green-600 transition"
        >
          Start
        </button>
      ) : (
        <>
          <button
            onClick={onPause}
            className="bg-yellow-500 text-white px-6 py-2 rounded-2xl shadow hover:bg-yellow-600 transition"
          >
            Pause
          </button>
          <button
            onClick={onResume}
            className="bg-blue-500 text-white px-6 py-2 rounded-2xl shadow hover:bg-blue-600 transition"
          >
            Resume
          </button>
        </>
      )}
    </div>
  );
};

export default Controls;
