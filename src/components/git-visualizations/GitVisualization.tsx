import React from 'react';
import { GitCommit } from 'lucide-react';

// Import only the visualizations we're sure exist
import InitVisualization from './InitVisualization';
import StatusVisualization from './StatusVisualization';
import AddVisualization from './AddVisualization';
import CommitVisualization from './CommitVisualization';
import BranchVisualization from './BranchVisualization';
import CheckoutVisualization from './CheckoutVisualization';
import MergeVisualization from './MergeVisualization';
import PushVisualization from './PushVisualization';
import PullVisualization from './PullVisualization';
import LogVisualization from './LogVisualization';

type GitVisualizationProps = {
  visualType: string;
  command: any;
};

const GitVisualization = ({ visualType, command }: GitVisualizationProps) => {
  // Use a switch statement to select the visualization
  switch(visualType) {
    case 'init':
      return <InitVisualization />;
    case 'status':
      return <StatusVisualization />;
    case 'add':
      return <AddVisualization />;
    case 'commit':
      return <CommitVisualization />;
    case 'branch':
      return <BranchVisualization />;
    case 'checkout':
      return <CheckoutVisualization />;
    case 'merge':
      return <MergeVisualization />;
    case 'push':
      return <PushVisualization />;
    case 'pull':
      return <PullVisualization />;
    case 'log':
      return <LogVisualization />;
    default:
      // Default visual for commands without specific visualizations
      return (
        <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800 flex justify-center items-center">
          <div className="text-center">
            {command.icon ? (
              <command.icon className="w-16 h-16 text-primary mx-auto mb-2" />
            ) : (
              <GitCommit className="w-16 h-16 text-primary mx-auto mb-2" />
            )}
            <div className="text-sm text-gray-400">
              Visual example coming soon
            </div>
          </div>
        </div>
      );
  }
};

export default GitVisualization;
