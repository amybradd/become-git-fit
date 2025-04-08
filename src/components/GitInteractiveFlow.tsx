import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest,
  GitFork,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Play,
  Pause,
  RotateCcw,
  Info,
  HelpCircle
} from 'lucide-react';

type Step = {
  id: string;
  type: 'commit' | 'branch' | 'checkout' | 'merge' | 'pull' | 'push';
  command: string;
  message: string;
  position: { x: number; y: number };
};

type FlowProps = {
  steps: Step[];
  title: string;
  description: string;
  onComplete?: () => void;
};

const GitInteractiveFlow: React.FC<FlowProps> = ({ 
  steps, 
  title, 
  description,
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showInfo, setShowInfo] = useState<string | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any running animation on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Start animation automatically when mounted
  useEffect(() => {
    if (!isPaused && currentStep < steps.length && !isAnimating) {
      startAnimation();
    }
  }, [currentStep, isPaused, isAnimating]);
  
  const startAnimation = () => {
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
      setIsAnimating(false);
    }, 2000);
  };
  
  const togglePause = () => {
    if (isAnimating && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsAnimating(false);
    }
    setIsPaused(!isPaused);
  };
  
  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentStep(0);
    setIsAnimating(false);
    setIsPaused(false);
    setIsComplete(false);
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const getStepIcon = (type: Step['type']) => {
    switch (type) {
      case 'commit': return <GitCommit className="w-4 h-4" />;
      case 'branch': return <GitBranch className="w-4 h-4" />;
      case 'checkout': return <GitFork className="w-4 h-4" />;
      case 'merge': return <GitMerge className="w-4 h-4" />;
      case 'pull': return <GitPullRequest className="w-4 h-4" />;
      case 'push': return <ArrowRight className="w-4 h-4" />;
      default: return <GitCommit className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="card-gradient rounded-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">{title}</h3>
          <p className="text-[rgb(var(--color-muted))] text-sm">{description}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePause}
            className="p-2 rounded-full bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label={isPaused ? "Play animation" : "Pause animation"}
          >
            {isPaused ? <Play className="w-4 h-4 text-[rgb(var(--color-secondary))]" /> : 
                        <Pause className="w-4 h-4 text-[rgb(var(--color-muted))]" />}
          </button>
          
          <button
            onClick={reset}
            className="p-2 rounded-full bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label="Reset animation"
          >
            <RotateCcw className="w-4 h-4 text-[rgb(var(--color-muted))]" />
          </button>
        </div>
      </div>
      
      <div className="relative min-h-[300px]">
        {/* Git flow visualization */}
        <svg 
          ref={svgRef}
          className="w-full h-full absolute inset-0"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Draw connections between steps */}
          {steps.map((step, index) => {
            if (index === 0) return null;
            
            const prevStep = steps[index - 1];
            
            return (
              <motion.line
                key={`line-${index}`}
                x1={prevStep.position.x}
                y1={prevStep.position.y}
                x2={step.position.x}
                y2={step.position.y}
                stroke="rgba(var(--color-border), 0.5)"
                strokeWidth={2}
                strokeDasharray="4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: currentStep >= index ? 1 : 0,
                  opacity: currentStep >= index ? 1 : 0 
                }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
          
          {/* Draw nodes for each step */}
          {steps.map((step, index) => (
            <motion.g
              key={step.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: currentStep >= index ? 1 : 0,
                scale: currentStep >= index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.circle
                cx={step.position.x}
                cy={step.position.y}
                r={12}
                fill={index === currentStep ? 
                  "rgba(var(--color-primary), 0.3)" : 
                  "rgba(var(--color-surface), 0.8)"}
                stroke={index === currentStep ? 
                  "rgb(var(--color-primary))" : 
                  "rgba(var(--color-border), 0.5)"}
                strokeWidth={2}
                onClick={() => setShowInfo(step.id)}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.1 }}
                animate={
                  index === currentStep && isAnimating ? 
                  { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1 } } : 
                  {}
                }
              />
              <foreignObject
                x={step.position.x - 8}
                y={step.position.y - 8}
                width={16}
                height={16}
                style={{ pointerEvents: 'none' }}
              >
                <div className="flex items-center justify-center h-full text-[rgb(var(--color-foreground))]">
                  {getStepIcon(step.type)}
                </div>
              </foreignObject>
            </motion.g>
          ))}
        </svg>
        
        {/* Current command display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cmd-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center"
          >
            <div className="bg-[rgba(var(--color-surface),0.8)] backdrop-blur-sm px-4 py-2 rounded-lg border border-[rgba(var(--color-border),0.3)]">
              <code className="font-mono text-sm text-[rgb(var(--color-primary))]">
                {currentStep < steps.length ? steps[currentStep].command : 'Complete!'}
              </code>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Step info popup */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(var(--color-surface),0.95)] backdrop-blur-md p-4 rounded-lg border border-[rgba(var(--color-border),0.5)] shadow-lg z-10 max-w-xs"
            >
              <button
                onClick={() => setShowInfo(null)}
                className="absolute top-2 right-2 p-1 rounded-full bg-[rgba(var(--color-surface-hover),0.8)]"
                aria-label="Close information"
              >
                <X className="w-4 h-4 text-[rgb(var(--color-muted))]" />
              </button>
              
              <div className="mb-2 flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-[rgba(var(--color-primary),0.2)]">
                  {getStepIcon(steps.find(s => s.id === showInfo)?.type || 'commit')}
                </div>
                <h4 className="font-medium text-[rgb(var(--color-foreground))]">
                  {steps.find(s => s.id === showInfo)?.command}
                </h4>
              </div>
              
              <p className="text-sm text-[rgb(var(--color-muted))]">
                {steps.find(s => s.id === showInfo)?.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Step navigation */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn btn-primary"
          aria-label="Previous step"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        
        <div className="flex items-center space-x-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentStep ? 
                'bg-[rgb(var(--color-primary))] w-4' : 
                'bg-[rgba(var(--color-muted),0.3)]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="btn btn-primary"
          aria-label="Next step"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Completion state */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-3 rounded-lg border border-[rgba(var(--color-success),0.5)] bg-[rgba(var(--color-success),0.1)] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[rgb(var(--color-success))]" />
              <span className="text-[rgb(var(--color-success))]">Flow completed!</span>
            </div>
            
            <button
              onClick={reset}
              className="px-3 py-1 rounded-md bg-[rgba(var(--color-success),0.2)] text-[rgb(var(--color-success))] text-sm"
            >
              Replay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Usage examples:
export const BranchingFlow = () => {
  const steps = [
    {
      id: 'init',
      type: 'commit' as const,
      command: 'git init',
      message: 'Initialize a new Git repository',
      position: { x: 200, y: 50 }
    },
    {
      id: 'add',
      type: 'commit' as const,
      command: 'git add index.html',
      message: 'Stage changes to index.html',
      position: { x: 200, y: 100 }
    },
    {
      id: 'commit',
      type: 'commit' as const,
      command: 'git commit -m "Initial commit"',
      message: 'Create the first commit',
      position: { x: 200, y: 150 }
    },
    {
      id: 'branch',
      type: 'branch' as const,
      command: 'git branch feature',
      message: 'Create a new branch named "feature"',
      position: { x: 200, y: 200 }
    },
    {
      id: 'checkout',
      type: 'checkout' as const,
      command: 'git checkout feature',
      message: 'Switch to the feature branch',
      position: { x: 300, y: 250 }
    },
    {
      id: 'commit-feature',
      type: 'commit' as const,
      command: 'git commit -m "Add new feature"',
      message: 'Commit changes on the feature branch',
      position: { x: 300, y: 300 }
    }
  ];
  
  return (
    <GitInteractiveFlow
      steps={steps}
      title="Git Branching Workflow"
      description="Learn how to create and work with branches"
    />
  );
};

export const MergeFlow = () => {
  const steps = [
    {
      id: 'checkout-main',
      type: 'checkout' as const,
      command: 'git checkout main',
      message: 'Switch to the main branch',
      position: { x: 100, y: 50 }
    },
    {
      id: 'pull',
      type: 'pull' as const,
      command: 'git pull origin main',
      message: 'Pull latest changes from remote',
      position: { x: 100, y: 100 }
    },
    {
      id: 'checkout-feature',
      type: 'checkout' as const,
      command: 'git checkout feature',
      message: 'Switch to feature branch',
      position: { x: 200, y: 150 }
    },
    {
      id: 'merge-main',
      type: 'merge' as const,
      command: 'git merge main',
      message: 'Merge main into feature to resolve conflicts',
      position: { x: 150, y: 200 }
    },
    {
      id: 'checkout-main-again',
      type: 'checkout' as const,
      command: 'git checkout main',
      message: 'Switch back to main branch',
      position: { x: 100, y: 250 }
    },
    {
      id: 'merge-feature',
      type: 'merge' as const,
      command: 'git merge feature',
      message: 'Merge feature into main',
      position: { x: 150, y: 300 }
    }
  ];
  
  return (
    <GitInteractiveFlow
      steps={steps}
      title="Git Merge Workflow"
      description="Learn how to merge branches together"
    />
  );
};

export default GitInteractiveFlow;
