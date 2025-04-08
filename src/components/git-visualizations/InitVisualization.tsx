import React from 'react';

const InitVisualization = () => {
  return (
    <div className="bg-black/40 p-4 rounded-lg mt-4 relative border border-gray-800">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="flex-grow text-center text-xs text-gray-400">Terminal</div>
      </div>
      <div className="terminal-session">
        <div className="flex">
          <span className="text-green-400 mr-2">$</span>
          <span className="text-white">git init</span>
        </div>
        <div className="text-green-300 mt-1">Initialized empty Git repository in .git/</div>
        <div className="flex mt-3">
          <span className="text-green-400 mr-2">$</span>
          <span className="text-white auto-type">_</span>
        </div>
      </div>
    </div>
  );
};

export default InitVisualization;
