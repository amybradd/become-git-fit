import React from 'react';
import { GitCommit } from 'lucide-react';

const CommitVisualization = () => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full mb-4">
          <div className="text-sm text-gray-400">Staging Area</div>
          <div className="text-sm text-gray-400">Local Repository</div>
        </div>
        <div className="flex items-center w-full">
          <div className="flex-1 p-2 border border-gray-700 rounded-l-md bg-black/60">
            <div className="text-green-400">index.html (staged)</div>
            <div className="text-green-400">style.css (staged)</div>
          </div>
          <div className="p-4">
            <GitCommit className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="flex-1 p-2 border border-gray-700 rounded-r-md bg-black/60">
            <div className="text-yellow-400 font-mono text-xs">commit a1b2c3d</div>
            <div className="text-white text-xs">Message: "Add initial files"</div>
            <div className="text-gray-400 text-xs mt-1">2 files changed</div>
          </div>
        </div>
      </div>
      <div className="mt-3 p-2 border-t border-gray-700 pt-3 font-mono text-xs">
        <div className="text-white">$ git commit -m "Add initial files"</div>
        <div className="text-green-400 mt-1">[main a1b2c3d] Add initial files</div>
        <div className="text-green-400">2 files changed, 35 insertions(+)</div>
      </div>
    </div>
  );
};

export default CommitVisualization;
