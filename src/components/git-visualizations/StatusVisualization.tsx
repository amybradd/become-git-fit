import React from 'react';

const StatusVisualization = () => {
  return (
    <div className="mt-4 flex flex-col md:flex-row gap-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="flex-1">
        <div className="mb-2 text-sm text-gray-400">Working Directory</div>
        <div className="p-2 border border-gray-700 rounded-md mb-2 bg-black/60">
          <div className="text-yellow-300">index.html (modified)</div>
          <div className="text-red-400">style.css (untracked)</div>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-2 text-sm text-gray-400">Status Output</div>
        <div className="p-2 border border-gray-700 rounded-md bg-black/60 font-mono text-xs">
          <div className="text-white">On branch main</div>
          <div className="text-white">Changes not staged for commit:</div>
          <div className="text-yellow-300 ml-2">modified: index.html</div>
          <div className="text-white">Untracked files:</div>
          <div className="text-red-400 ml-2">style.css</div>
        </div>
      </div>
    </div>
  );
};

export default StatusVisualization;
