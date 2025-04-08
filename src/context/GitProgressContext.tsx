import React, { createContext, useState, useEffect, useContext } from 'react';

type GitProgressContextType = {
  completedCommands: Set<string>;
  markCommandAsCompleted: (commandName: string, completed?: boolean) => void;
  resetProgress: () => void;
  lastVisitedTutorial: number;
  setLastVisitedTutorial: (tutorialId: number) => void;
};

const GitProgressContext = createContext<GitProgressContextType | undefined>(undefined);

export const useGitProgress = () => {
  const context = useContext(GitProgressContext);
  if (!context) {
    throw new Error('useGitProgress must be used within a GitProgressProvider');
  }
  return context;
};

export const GitProgressProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [completedCommands, setCompletedCommands] = useState<Set<string>>(
    () => {
      const saved = localStorage.getItem('git-fit-completed-commands');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    }
  );

  const [lastVisitedTutorial, setLastVisitedTutorial] = useState<number>(
    () => {
      const saved = localStorage.getItem('git-fit-last-tutorial');
      return saved ? parseInt(saved, 10) : 0;
    }
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('git-fit-completed-commands', JSON.stringify([...completedCommands]));
  }, [completedCommands]);

  useEffect(() => {
    localStorage.setItem('git-fit-last-tutorial', lastVisitedTutorial.toString());
  }, [lastVisitedTutorial]);

  const markCommandAsCompleted = (commandName: string, completed: boolean = true) => {
    setCompletedCommands(prev => {
      // If we're marking as completed and it's not already in the set
      if (completed && !prev.has(commandName)) {
        return new Set([...prev, commandName]);
      } 
      // If we're marking as not completed and it is in the set
      else if (!completed && prev.has(commandName)) {
        const newSet = new Set(prev);
        newSet.delete(commandName);
        return newSet;
      }
      // Otherwise return the original set
      return prev;
    });
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress?')) {
      setCompletedCommands(new Set());
      setLastVisitedTutorial(0);
    }
  };

  return (
    <GitProgressContext.Provider 
      value={{
        completedCommands,
        markCommandAsCompleted,
        resetProgress,
        lastVisitedTutorial,
        setLastVisitedTutorial
      }}
    >
      {children}
    </GitProgressContext.Provider>
  );
};
