import React from 'react';
import { GitCommit, GitBranch, ArrowRight } from 'lucide-react';
import VisualizationContainer from './common/VisualizationContainer';

const CheckoutVisualization = () => {
  return (
    <VisualizationContainer 
      title="Checkout Visualization"
      terminalCommands={[
        { 
          command: "git checkout feature", 
          output: "Switched to branch 'feature'", 
          isSuccess: true 
        }
      ]}
    >
      {/* Main branch vertical line */}
      <div className="absolute left-1/3 top-4 bottom-4 w-0.5 bg-primary transform -translate-x-1/2"></div>
      
      {/* Main branch commits */}
      <div className="absolute left-1/3 top-4 transform -translate-x-1/2">
        <div className="git-node commit">
          <GitCommit className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="absolute left-1/3 top-1/3 transform -translate-x-1/2">
        <div className="git-node commit">
          <GitCommit className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="absolute left-1/3 top-2/3 transform -translate-x-1/2">
        <div className="git-node commit">
          <GitCommit className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -bottom-8 whitespace-nowrap text-xs text-primary opacity-70">main branch</div>
      </div>
      
      {/* Feature branch */}
      <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 translate-x-1/2">
        <div className="git-node branch relative">
          <GitBranch className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500/30 text-green-400 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
          HEAD
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-secondary whitespace-nowrap">
          feature branch
        </div>
      </div>
      
      {/* Checkout arrow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ArrowRight className="w-8 h-8 text-yellow-500/60 animate-pulse" />
      </div>
    </VisualizationContainer>
  );
};

export default CheckoutVisualization;
