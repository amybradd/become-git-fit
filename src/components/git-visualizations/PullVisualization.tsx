import React from 'react';
import { GitCommit, Download, Server } from 'lucide-react';

const PullVisualization = () => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="text-center text-sm text-gray-400 mb-3">Git Pull Visualization</div>
      <div className="h-[240px] w-full relative bg-black/30 rounded-md p-4">
        {/* Local repository */}
        <div className="absolute left-1/4 top-4 bottom-4 w-[120px] border border-gray-700 rounded-md bg-black/60 flex flex-col items-center justify-start p-3">
          <div className="text-xs text-gray-400 mb-4">Local Repository</div>
          
          {/* Commit chain (before pull) */}
          <div className="git-node commit mb-2">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="h-4 w-0.5 bg-primary"></div>
          <div className="git-node commit mb-2">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          
          {/* The space where the new commit will appear */}
          <div className="h-16 flex items-center justify-center opacity-30">
            <Server className="w-5 h-5 text-secondary" />
          </div>
        </div>
        
        {/* Remote repository */}
        <div className="absolute right-1/4 top-4 bottom-4 w-[120px] border border-gray-700 rounded-md bg-black/60 flex flex-col items-center justify-start p-3">
          <div className="text-xs text-gray-400 mb-4">Remote Repository</div>
          
          {/* Commit chain with new commit */}
          <div className="git-node commit mb-2">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="h-4 w-0.5 bg-primary"></div>
          <div className="git-node commit mb-2">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="h-4 w-0.5 bg-primary"></div>
          <div className="git-node commit bg-primary/30 border-primary">
            <GitCommit className="w-4 h-4 text-primary" />
          </div>
          <div className="text-xs text-primary mt-1">New commit</div>
        </div>
        
        {/* Pull arrow and animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Download className="w-8 h-8 text-secondary animate-pulse" />
          <div className="text-xs text-secondary mt-2">git pull</div>
          
          {/* Animating dots to represent data transfer */}
          <div className="flex space-x-1 mt-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '300ms' }}></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-black/50 p-2 rounded font-mono text-xs">
        <div className="text-white">$ git pull origin main</div>
        <div className="text-green-400 mt-1">From https://github.com/username/repo</div>
        <div className="text-green-400">* branch main -&gt; FETCH_HEAD</div>
        <div className="text-green-400">Updating a1b2c3d..e4f5g6h</div>
        <div className="text-green-400">Fast-forward</div>
        <div className="text-green-400">index.js | 4 ++--</div>
        <div className="text-green-400">1 file changed, 2 insertions(+), 2 deletions(-)</div>
      </div>
    </div>
  );
};

export default PullVisualization;
