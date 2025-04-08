import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Terminal,
  GitCommit,
  GitBranch,
  GitMerge,
  GitFork
} from 'lucide-react';
import { useGitProgress } from '../context/GitProgressContext';
import CommandCard from '../components/CommandCard';
import tutorialData from '../data/tutorialData';

const TutorialPage = () => {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const { completedCommands, markCommandAsCompleted, setLastVisitedTutorial } = useGitProgress();
  
  // Find current tutorial based on URL param or default to first
  const currentTutorialId = tutorialId ? parseInt(tutorialId) : 1;
  const tutorial = tutorialData.find(t => t.id === currentTutorialId) || tutorialData[0];

  useEffect(() => {
    if (tutorial) {
      setLastVisitedTutorial(tutorial.id);
    }
  }, [tutorial, setLastVisitedTutorial]);

  const handleComplete = (commandName) => {
    // Toggle completion status
    if (completedCommands.has(commandName)) {
      markCommandAsCompleted(commandName, false);
    } else {
      markCommandAsCompleted(commandName);
    }
  };

  const goToNextTutorial = () => {
    const nextId = currentTutorialId + 1;
    if (nextId <= tutorialData.length) {
      navigate(`/tutorial/${nextId}`);
    }
  };

  const goToPrevTutorial = () => {
    const prevId = currentTutorialId - 1;
    if (prevId >= 1) {
      navigate(`/tutorial/${prevId}`);
    }
  };

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tutorial not found</h2>
          <button 
            onClick={() => navigate('/tutorial/1')} 
            className="btn-primary"
          >
            Go to first tutorial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-24 pb-16 px-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold gradient-text mb-2">Git Tutorials</h1>
        <p className="text-gray-400 mb-8">Interactive lessons to master Git</p>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full"
          >
            <div className="card-gradient rounded-2xl p-8 border-gradient">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{tutorial.title}</h2>
                  <p className="text-gray-300">{tutorial.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  {tutorialData.map((t) => (
                    <div
                      key={t.id}
                      className={`w-2 h-2 rounded-full ${
                        t.id === tutorial.id
                          ? 'bg-primary w-6'
                          : 'bg-gray-700'
                      } transition-all duration-300`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                  <Terminal className="w-5 h-5 text-primary" />
                  Commands to Learn
                </h3>
                
                {tutorial.commands.map((command) => (
                  <CommandCard
                    key={command.name}
                    command={command}
                    onComplete={handleComplete}
                    isCompleted={completedCommands.has(command.name)}
                  />
                ))}
              </div>
              
              <div className="flex justify-between mt-12">
                <button
                  onClick={goToPrevTutorial}
                  className={`btn-primary ${currentTutorialId === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentTutorialId === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={goToNextTutorial}
                  className={`btn-primary ${currentTutorialId === tutorialData.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentTutorialId === tutorialData.length}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TutorialPage;