import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown,
  ChevronUp,
  GitCommit,
  Copy
} from 'lucide-react';
import GitVisualization from './git-visualizations/GitVisualization';

// Define proper types for better code quality and docs
interface CommandCardProps {
  command: {
    name: string;
    description: string;
    syntax: string;
    icon?: React.ComponentType<any>;
    example?: string;
    visual?: string;
  };
  onComplete: (commandName: string) => void;
  isCompleted: boolean;
}

// Extract sub-components for better organization
const SyntaxSection = ({ syntax, onCopy, isCopied }) => (
  <div className="bg-black/70 rounded-md p-3 font-mono text-sm relative">
    <div className="flex justify-between items-center mb-2">
      <div className="text-xs text-gray-400">Command Syntax</div>
      <button 
        onClick={onCopy}
        className="p-1 rounded-md hover:bg-gray-800 transition-colors"
        title="Copy to clipboard"
      >
        {isCopied ? 
          <Check className="w-4 h-4 text-green-400" /> : 
          <Copy className="w-4 h-4 text-gray-400" />}
      </button>
    </div>
    <div className="command-syntax text-yellow-300 whitespace-pre">{syntax}</div>
  </div>
);

const ExampleSection = ({ example }) => (
  <div className="mt-4 bg-black/70 rounded-md p-3 font-mono text-sm">
    <div className="text-xs text-gray-400 mb-2">Example</div>
    <div className="text-white whitespace-pre-wrap">{example}</div>
  </div>
);

const CommandCard: React.FC<CommandCardProps> = ({ command, onComplete, isCompleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <div className="command-card p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-500/20' : 'bg-primary/20'}`}>
            {command.icon ? <command.icon className={`w-5 h-5 ${isCompleted ? 'text-green-400' : 'text-primary'}`} /> : 
                           <GitCommit className={`w-5 h-5 ${isCompleted ? 'text-green-400' : 'text-primary'}`} />}
          </div>
          <h3 className="command-title text-lg font-medium">{command.name}</h3>
        </div>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete(command.name);
            }}
            className="p-1.5 rounded-full hover:bg-black/30 transition-colors"
            aria-label={isCompleted ? "Mark as incomplete" : "Mark as completed"}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isCompleted ? 'bg-green-500/20' : 'bg-gray-700/40'
            }`}>
              <Check className={`w-4 h-4 ${
                isCompleted ? 'text-green-400' : 'text-gray-400'
              }`} />
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 rounded-full hover:bg-black/30 transition-colors ml-1"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="command-description text-base mt-4 mb-3">{command.description}</p>
            
            {/* Use extracted components */}
            <SyntaxSection 
              syntax={command.syntax} 
              onCopy={(e) => {
                e.stopPropagation();
                copyToClipboard(command.syntax);
              }}
              isCopied={isCopied}
            />
            
            {command.example && <ExampleSection example={command.example} />}
            
            {/* Visualization component */}
            <GitVisualization visualType={command.visual || 'default'} command={command} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommandCard;
