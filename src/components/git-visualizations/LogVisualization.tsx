import React from 'react';
import { GitCommit, Clock, User } from 'lucide-react';

const LogVisualization = () => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="text-center text-sm text-gray-400 mb-3">Git Log Visualization</div>
      <div className="h-[240px] w-full relative bg-black/30 rounded-md p-4 overflow-y-auto">
        {/* Main branch vertical line */}
        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-primary"></div>
        
        {/* Commit entries in a log format */}
        <div className="ml-16 space-y-4">
          {/* Latest commit */}
          <div className="relative">
            <div className="absolute -left-12 top-2">
              <div className="git-node commit bg-primary/30 border-primary">
                <GitCommit className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="font-mono text-yellow-300 text-sm">e4f5g6h</div>
                  <div className="text-white ml-3 font-medium text-sm">Add search feature</div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-400">
                <User className="w-3 h-3 mr-1" />
                <span>Jane Smith</span>
              </div>
            </div>
          </div>
          
          {/* Previous commit */}
          <div className="relative">
            <div className="absolute -left-12 top-2">
              <div className="git-node commit">
                <GitCommit className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="font-mono text-yellow-300 text-sm">a1b2c3d</div>
                  <div className="text-white ml-3 font-medium text-sm">Fix navigation bug</div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>1 day ago</span>
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-400">
                <User className="w-3 h-3 mr-1" />
                <span>John Doe</span>
              </div>
            </div>
          </div>
          
          {/* Initial commit */}
          <div className="relative">
            <div className="absolute -left-12 top-2">
              <div className="git-node commit">
                <GitCommit className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="font-mono text-yellow-300 text-sm">7h8i9j0</div>
                  <div className="text-white ml-3 font-medium text-sm">Initial commit</div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>3 days ago</span>
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-400">
                <User className="w-3 h-3 mr-1" />
                <span>John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-black/50 p-2 rounded font-mono text-xs">
        <div className="text-white">$ git log --oneline</div>
        <div className="text-yellow-300 mt-1">e4f5g6h Add search feature</div>
        <div className="text-yellow-300">a1b2c3d Fix navigation bug</div>
        <div className="text-yellow-300">7h8i9j0 Initial commit</div>
      </div>
    </div>
  );
};

export default LogVisualization;
