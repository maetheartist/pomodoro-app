import { useState } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import SessionSelector from './components/SessionSelector';
import './index.css'

export type SessionType = 'work' | 'short-break' | 'long-break';

const App = () => {
  const [durations, setDurations] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleComplete = () => {
    // Logic to handle session completion, such as updating the session type
    if (currentSession === 'work') {
      setCompletedSessions((prev) => prev + 1);

      // After every 4 work sessions, go to long break
      if ((completedSessions + 1) % 4 === 0) {
        setCurrentSession('longBreak');
      } else {
        setCurrentSession('shortBreak');
      }
    } else {
      setCurrentSession('work');
    }
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Pomodoro Timer</h1>
      <p className="mb-2 text-lg">
        Current session: <span className="capitalize">{currentSession.replace('-', ' ')}</span>
      </p>
    <div className=''>
    <Timer
        durations={durations}
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
        completedSessions={completedSessions}
        setCompletedSessions={setCompletedSessions}
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onComplete={handleComplete} 
      />

      {/* <Controls
        durations={durations}
        setDurations={setDurations}
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
      /> */}

      {/* <p className="mt-4">Completed Work Sessions: {completedSessions}</p> */}

      <SessionSelector currentSession={currentSession} setCurrentSession={setCurrentSession} />
    
    </div>
      </div>
  );
};

export default App;
