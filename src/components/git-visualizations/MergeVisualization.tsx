import React from 'react';
import { GitCommit, GitMerge } from 'lucide-react';

const MergeVisualization = () => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="text-center text-sm text-gray-400 mb-3">Merge Visualization</div>
      <div className="h-[260px] w-full relative bg-black/30 rounded-md p-4">
        {/* Main branch vertical line */}
        <div className="absolute left-1/2 top-4 h-[152px] w-0.5 bg-primary transform -translate-x-1/2"></div>
        
        {/* Main branch top commits */}
        <div className="absolute left-1/2 top-4 transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="absolute left-1/2 top-[60px] transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          
          {/* Feature branch line starts here */}
          <div className="absolute left-3 top-0 w-20 h-0.5 bg-secondary"></div>
        </div>
        
        {/* Feature branch */}
        <div className="absolute left-[calc(50%+80px)] top-[60px] transform -translate-x-1/2">
          <div className="git-node branch">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -top-5 whitespace-nowrap text-xs text-secondary">
            feature branch
          </div>
          
          {/* Feature branch second commit */}
          <div className="absolute left-0 top-[40px]">
            <div className="h-[40px] w-0.5 bg-secondary absolute -top-[40px] left-1/2 transform -translate-x-1/2"></div>
            <div className="git-node branch">
              <GitCommit className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Merge commit */}
        <div className="absolute left-1/2 top-[156px] transform -translate-x-1/2">
          {/* Line connecting feature and main branch */}
          <div className="absolute -top-[56px] -left-[1px] w-[calc(50%+80px)] h-0.5 bg-gradient-to-r from-primary via-primary to-secondary"></div>
          <div className="git-node commit border-dashed border-yellow-500 bg-yellow-500/20">
            <GitMerge className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="absolute right-6 whitespace-nowrap text-xs text-yellow-500">
            merge commit
          </div>
        </div>
        
        {/* Connection line after merge */}
        <div className="absolute left-1/2 top-[177px] transform -translate-x-1/2 h-[30px] w-0.5 bg-primary"></div>
        
        {/* Bottom commit after merge */}
        <div className="absolute left-1/2 top-[206px] transform -translate-x-1/2">
          <div className="git-node commit">
            <GitCommit className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -left-10 whitespace-nowrap text-xs text-primary">
            main branch
          </div>
        </div>
      </div>
      <div className="mt-2 bg-black/50 p-2 rounded font-mono text-xs">
        <div className="text-white">$ git checkout main</div>
        <div className="text-white mt-1">$ git merge feature</div>
        <div className="text-green-400 mt-1">Merge made by the 'recursive' strategy.</div>
        <div className="text-gray-400 mt-1"># Changes from feature branch now in main</div>
      </div>
    </div>
  );
};

export default MergeVisualization;
