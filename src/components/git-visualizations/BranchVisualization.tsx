import React from 'react';
import { GitCommit, GitBranch } from 'lucide-react';

const BranchVisualization = () => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="text-center text-sm text-gray-400 mb-3">Branch Visualization</div>
      <div className="h-[200px] w-full relative bg-black/30 rounded-md p-4">
        {/* Main branch vertical line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-primary transform -translate-x-1/2"></div>
        
        {/* Main branch commits */}
        <div className="absolute left-1/2 top-4 transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -left-12 -top-1 text-xs text-gray-400">commit 1</div>
        </div>
        
        <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -left-12 -top-1 text-xs text-gray-400">commit 2</div>
        </div>
        
        <div className="absolute left-1/2 top-2/3 transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -left-12 -top-1 text-xs text-gray-400">commit 3</div>
          
          {/* Feature branch line going right */}
          <div className="absolute top-0 left-3 w-24 h-0.5 bg-secondary"></div>
          
          {/* Feature branch endpoint */}
          <div className="absolute top-0 left-[108px]">
            <div className="git-node branch">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -top-6 whitespace-nowrap text-xs text-secondary">feature branch</div>
          </div>
        </div>
        
        {/* Main branch label */}
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -left-10 whitespace-nowrap text-xs text-primary">main branch</div>
        </div>
      </div>
      <div className="mt-2 bg-black/50 p-2 rounded font-mono text-xs">
        <div className="text-white">$ git branch feature</div>
        <div className="text-gray-400 mt-1"># Created new branch 'feature'</div>
        <div className="text-white mt-1">$ git branch</div>
        <div className="text-green-400 mt-1">* main</div>
        <div className="text-white">  feature</div>
      </div>
    </div>
  );
};

export default BranchVisualization;
