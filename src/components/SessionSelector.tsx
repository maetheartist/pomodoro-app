import React from 'react';

interface SessionSelectorProps {
  currentSession: 'work' | 'shortBreak' | 'longBreak';
  setCurrentSession: React.Dispatch<React.SetStateAction<'work' | 'shortBreak' | 'longBreak'>>;
}

const SessionSelector: React.FC<SessionSelectorProps> = ({ currentSession, setCurrentSession }) => {
  return (
    <div className="flex space-x-4 border border-gray-950 p-5 rounded-sm">
      <button
        onClick={() => setCurrentSession('work')}
        className={`py-2 px-4 rounded-md ${currentSession === 'work' ? 'bg-blue-500' : 'bg-gray-700'}`}
      >
        Work
      </button>
      <button
        onClick={() => setCurrentSession('shortBreak')}
        className={`py-2 px-4 rounded-md ${currentSession === 'shortBreak' ? 'bg-blue-800' : 'bg-blue-900'}`}
      >
        Short Break
      </button>
      <button
        onClick={() => setCurrentSession('longBreak')}
        className={`py-2 px-4 rounded-md ${currentSession === 'longBreak' ? 'bg-blue-900' : 'bg-blue-700'}`}
      >
        Long Break
      </button>
    </div>
  );
};

export default SessionSelector;
