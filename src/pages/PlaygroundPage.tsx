import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal as TerminalIcon,
  GitBranch,
  BookOpen,
  BarChart
} from 'lucide-react';

import CommandVisualizer from '../components/CommandVisualizer';
import GitCommitHistory from '../components/GitCommitHistory';
import GitCheatSheet from '../components/GitCheatSheet';

// Define tab types
type TabType = 'terminal' | 'visualizer' | 'history' | 'cheatsheet';

// Create a simple terminal component
const GitTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: '', output: 'Welcome to the Git Terminal. Type "help" to see available commands.' }
  ]);

  const handleCommand = () => {
    if (!input.trim()) return;
    
    let output = '';
    
    // Very simple command handling
    if (input === 'help') {
      output = `
Available commands:
  help              Show this help message
  git init          Initialize a new git repository
  git status        Show the working tree status
  git add <file>    Add file to the staging area
  git commit        Record changes to the repository
  clear             Clear the terminal
      `.trim();
    } else if (input === 'git init') {
      output = 'Initialized empty Git repository in .git/';
    } else if (input === 'git status') {
      output = `
On branch main
No commits yet
nothing to commit (create/copy files and use "git add" to track)
      `.trim();
    } else if (input.startsWith('git add')) {
      output = `Added file to staging area`;
    } else if (input === 'git commit') {
      output = `Please provide a commit message with -m flag`;
    } else if (input.startsWith('git commit -m')) {
      output = `[main (root-commit)] committed changes`;
    } else if (input === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      output = `Command not recognized: '${input}'`;
    }
    
    setHistory([...history, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="card-gradient rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[rgb(var(--color-foreground))] mb-4 flex items-center gap-2">
        <TerminalIcon className="w-5 h-5 text-[rgb(var(--color-primary))]" />
        Git Terminal
      </h2>
      
      <div className="bg-[rgb(17,17,17)] rounded-lg p-4 font-mono text-sm h-[500px] overflow-y-auto">
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            {entry.command && (
              <div className="text-white">
                <span className="text-green-500">$ </span>
                {entry.command}
              </div>
            )}
            <div className="text-gray-300 whitespace-pre-wrap">{entry.output}</div>
          </div>
        ))}
        
        <div className="flex items-center text-white mt-2">
          <span className="text-green-500 mr-1">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
            className="flex-1 bg-transparent border-none outline-none text-white"
            placeholder="Type a Git command..."
          />
        </div>
      </div>
      
      <div className="mt-4 text-[rgb(var(--color-muted))] text-sm">
        <p>Try typing "help" to see available commands. Press Enter to execute.</p>
      </div>
    </div>
  );
};

const PlaygroundPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('visualizer');

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--color-background))]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Git Playground</h1>
          <p className="text-[rgb(var(--color-muted))] text-lg max-w-3xl">
            Experiment with Git commands, visualize repository states, and learn through interactive tools.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-[rgba(var(--color-border),0.5)] mb-6">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'visualizer'
                ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
            }`}
          >
            <GitBranch className="w-5 h-5" />
            Command Visualizer
          </button>
          
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'terminal'
                ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
            }`}
          >
            <TerminalIcon className="w-5 h-5" />
            Git Terminal
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'history'
                ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
            }`}
          >
            <BarChart className="w-5 h-5" />
            Commit History
          </button>
          
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'cheatsheet'
                ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Cheat Sheet
          </button>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'visualizer' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CommandVisualizer />
            </motion.div>
          )}
          
          {activeTab === 'terminal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GitTerminal />
            </motion.div>
          )}
          
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GitCommitHistory />
            </motion.div>
          )}
          
          {activeTab === 'cheatsheet' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GitCheatSheet />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
