import React, { useEffect, useState, useRef } from 'react';

export interface TimerProps {
  durations: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  currentSession: 'work' | 'shortBreak' | 'longBreak';
  setCurrentSession: React.Dispatch<React.SetStateAction<'work' | 'shortBreak' | 'longBreak'>>;
  completedSessions: number;
  setCompletedSessions: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({
  durations,
  currentSession,
  setCurrentSession,
  completedSessions,
  setCompletedSessions,

}) => {
  const [timeLeft, setTimeLeft] = useState(durations[currentSession] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    setTimeLeft(durations[currentSession] * 60);
  }, [currentSession, durations]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            audioRef.current?.play();

            if (currentSession === 'work') {
              setCompletedSessions((prev) => prev + 1);

              if ((completedSessions + 1) % 4 === 0) {
                setCurrentSession('longBreak');
              } else {
                setCurrentSession('shortBreak');
              }
            } else {
              setCurrentSession('work');
            }

            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, currentSession]);

  const handleStart = () => {
    setIsRunning(true);
   
  };

  const handlePause = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current!);
    setTimeLeft(durations[currentSession] * 60);
    setIsRunning(false);
  };

  return (
    <div className=" p-10 my-10 border border-blue-950 rounded-[100%] h-96 w-96 relative flex flex-col items-center justify-center ">
     <div className={`absolute w-full h-full left-0 top-0 border-6 border-yellow-300 rounded-full border-t-0 ${isRunning && 'animate-spin'} p-5 delay-700`}></div>
     <div className='text-white text-center space-y-4 relative'>
     <h2 className="text-2xl capitalize">{currentSession} session</h2>
      <h1 className="text-6xl font-bold">{formatTime(timeLeft)}</h1>

      <div className="flex justify-center gap-4 mt-4">
        {!isRunning ? (
          <button onClick={handleStart} className="bg-yellow-600 px-6 py-2 rounded-lg">
            Start
          </button>
        ) : (
          <button onClick={handlePause} className="bg-yellow-500 px-6 py-2 rounded-lg">
            Pause
          </button>
        )}
        <button onClick={handleReset} className="bg-red-500 px-6 py-2 rounded-lg">
          Reset
        </button>
      </div>

      <p className="mt-2 text-sm">
        Completed Work Sessions: {completedSessions}
      </p>

      <audio ref={audioRef} src="../ping.mp3" />
       
      
     </div>
    </div>
  );
};

export default Timer;
