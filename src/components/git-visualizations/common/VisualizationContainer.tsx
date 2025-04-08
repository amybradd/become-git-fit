import React, { ReactNode } from 'react';

interface VisualizationContainerProps {
  title: string;
  children: ReactNode;
  terminalCommands?: { command: string; output?: string; isSuccess?: boolean }[];
}

/**
 * A reusable container for all Git visualizations
 */
const VisualizationContainer = ({ 
  title, 
  children, 
  terminalCommands = []
}: VisualizationContainerProps) => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="text-center text-sm text-gray-400 mb-3">{title}</div>
      
      {/* Visualization content area */}
      <div className="h-[200px] w-full relative bg-black/30 rounded-md p-4">
        {children}
      </div>
      
      {/* Terminal commands section */}
      {terminalCommands.length > 0 && (
        <div className="mt-2 bg-black/50 p-2 rounded font-mono text-xs">
          {terminalCommands.map((item, index) => (
            <React.Fragment key={index}>
              <div className="text-white">$ {item.command}</div>
              {item.output && (
                <div className={`mt-1 ${item.isSuccess ? 'text-green-400' : 'text-gray-400'}`}>
                  {item.output}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualizationContainer;
