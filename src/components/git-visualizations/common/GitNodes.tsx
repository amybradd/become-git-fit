import React, { ReactNode } from 'react';
import { GitCommit, GitBranch, GitMerge } from 'lucide-react';

interface GitNodeProps {
  type: 'commit' | 'branch' | 'merge';
  label?: string;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  highlightColor?: string;
  children?: ReactNode;
}

/**
 * A reusable Git node component to represent commits, branches, or merges
 */
export const GitNode = ({ 
  type = 'commit', 
  label, 
  labelPosition = 'bottom',
  highlightColor,
  children 
}: GitNodeProps) => {
  // Determine which icon to use based on type
  const IconComponent = {
    commit: GitCommit,
    branch: GitBranch,
    merge: GitMerge
  }[type];

  // Default classes based on type
  const nodeClasses = {
    commit: "git-node commit",
    branch: "git-node branch",
    merge: "git-node commit border-dashed border-yellow-500 bg-yellow-500/20"
  }[type];
  
  // Calculate label positioning
  const labelClasses = {
    top: "absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap",
    right: "absolute top-0 left-6 whitespace-nowrap",
    bottom: "absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap",
    left: "absolute top-0 -left-16 whitespace-nowrap"
  }[labelPosition];
  
  // Determine label color based on type
  const labelColor = {
    commit: "text-primary",
    branch: "text-secondary",
    merge: "text-yellow-500"
  }[type];

  return (
    <div className="relative">
      <div className={nodeClasses} style={highlightColor ? { borderColor: highlightColor } : {}}>
        <IconComponent className="w-4 h-4 text-white" />
        {children}
      </div>
      
      {label && (
        <div className={`${labelClasses} text-xs ${labelColor}`}>
          {label}
        </div>
      )}
    </div>
  );
};

/**
 * A branch connection line between Git nodes
 */
export const GitConnectionLine = ({ 
  direction = 'vertical',
  color = 'primary',
  length = 6,
  thickness = 0.5,
  position = {} 
}) => {
  const baseClasses = `bg-${color} absolute`;
  
  if (direction === 'vertical') {
    return (
      <div 
        className={`${baseClasses} w-${thickness}`} 
        style={{ 
          height: `${length * 0.25}rem`,
          ...position 
        }}
      ></div>
    );
  }
  
  return (
    <div 
      className={`${baseClasses} h-${thickness}`} 
      style={{ 
        width: `${length * 0.25}rem`,
        ...position 
      }}
    ></div>
  );
};

export default { GitNode, GitConnectionLine };
