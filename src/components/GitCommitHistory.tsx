import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest,
  ChevronRight,
  ChevronDown,
  Calendar,
  User,
  MessageSquare,
  Hash,
  RefreshCw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

type CommitType = 'commit' | 'merge' | 'branch' | 'tag';

interface Commit {
  id: string;
  hash: string;
  message: string;
  author: string;
  date: string;
  type: CommitType;
  branch: string;
  tags?: string[];
  parentIds: string[];
}

interface GitCommitHistoryProps {
  initialCommits?: Commit[];
}

const defaultCommits: Commit[] = [
  {
    id: '1',
    hash: 'a1b2c3d',
    message: 'Initial commit',
    author: 'John Doe',
    date: '2023-10-25 14:30',
    type: 'commit',
    branch: 'main',
    parentIds: []
  },
  {
    id: '2',
    hash: 'e4f5g6h',
    message: 'Add authentication feature',
    author: 'Jane Smith',
    date: '2023-10-26 10:15',
    type: 'commit',
    branch: 'main',
    parentIds: ['1']
  },
  {
    id: '3',
    hash: 'i7j8k9l',
    message: 'Create feature branch',
    author: 'John Doe',
    date: '2023-10-26 11:45',
    type: 'branch',
    branch: 'feature',
    parentIds: ['2']
  },
  {
    id: '4',
    hash: 'm1n2o3p',
    message: 'Implement profile page',
    author: 'Jane Smith',
    date: '2023-10-27 09:30',
    type: 'commit',
    branch: 'feature',
    parentIds: ['3']
  },
  {
    id: '5',
    hash: 'q4r5s6t',
    message: 'Fix header bug',
    author: 'John Doe',
    date: '2023-10-27 14:20',
    type: 'commit',
    branch: 'main',
    parentIds: ['2']
  },
  {
    id: '6',
    hash: 'u7v8w9x',
    message: 'Merge feature into main',
    author: 'Jane Smith',
    date: '2023-10-28 11:00',
    type: 'merge',
    branch: 'main',
    parentIds: ['5', '4']
  },
  {
    id: '7',
    hash: 'y1z2a3b',
    message: 'Release v1.0.0',
    author: 'John Doe',
    date: '2023-10-30 15:45',
    type: 'commit',
    branch: 'main',
    tags: ['v1.0.0'],
    parentIds: ['6']
  }
];

const GitCommitHistory: React.FC<GitCommitHistoryProps> = ({ 
  initialCommits = defaultCommits
}) => {
  const [commits] = useState<Commit[]>(initialCommits);
  const [expandedCommits, setExpandedCommits] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  
  const handleCommitClick = (commitId: string) => {
    setExpandedCommits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commitId)) {
        newSet.delete(commitId);
      } else {
        newSet.add(commitId);
      }
      return newSet;
    });
  };
  
  const getCommitIcon = (type: CommitType) => {
    switch (type) {
      case 'commit': return <GitCommit className="w-5 h-5" />;
      case 'merge': return <GitMerge className="w-5 h-5" />;
      case 'branch': return <GitBranch className="w-5 h-5" />;
      case 'tag': return <GitPullRequest className="w-5 h-5" />;
    }
  };
  
  const getCommitColor = (type: CommitType) => {
    switch (type) {
      case 'commit': return 'rgb(var(--color-primary))';
      case 'merge': return 'rgb(var(--color-secondary))';
      case 'branch': return 'rgb(var(--color-success))';
      case 'tag': return 'rgb(var(--color-warning))';
    }
  };
  
  const buildGraph = () => {
    const nodePositions = new Map<string, { x: number, y: number }>();
    const branches = new Map<string, number>();
    
    // Initialize branches
    commits.forEach(commit => {
      if (!branches.has(commit.branch)) {
        branches.set(commit.branch, branches.size);
      }
    });
    
    // Calculate positions
    commits.forEach((commit, index) => {
      const branchPosition = branches.get(commit.branch) || 0;
      nodePositions.set(commit.id, {
        x: 50 + branchPosition * 100,
        y: 50 + index * 80
      });
    });
    
    return { nodePositions, branches };
  };
  
  const { nodePositions, branches } = buildGraph();
  
  return (
    <div className="card-gradient rounded-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">
            Git Commit History
          </h3>
          <p className="text-[rgb(var(--color-muted))] text-sm">
            Visualize commits, branches, and merges
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
            className="p-2 rounded bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label="Zoom out"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-4 h-4 text-[rgb(var(--color-muted))]" />
          </button>
          
          <div className="text-sm text-[rgb(var(--color-muted))]">
            {Math.round(zoom * 100)}%
          </div>
          
          <button
            onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
            className="p-2 rounded bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label="Zoom in"
            disabled={zoom >= 2}
          >
            <ZoomIn className="w-4 h-4 text-[rgb(var(--color-muted))]" />
          </button>
          
          <button
            onClick={() => setExpandedCommits(new Set())}
            className="p-2 rounded bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label="Collapse all"
          >
            <RefreshCw className="w-4 h-4 text-[rgb(var(--color-muted))]" />
          </button>
        </div>
      </div>
      
      <div className="bg-[rgba(var(--color-background),0.5)] rounded-lg border border-[rgba(var(--color-border),0.3)] overflow-auto">
        <div 
          className="min-h-[500px] w-full relative" 
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        >
          <svg 
            width="100%" 
            height="100%" 
            className="absolute inset-0"
            style={{ minWidth: '800px', minHeight: '500px' }}
          >
            {/* Draw branch lines */}
            {Array.from(branches.entries()).map(([branch, position]) => (
              <line 
                key={`branch-${branch}`}
                x1={50 + position * 100} 
                y1={30} 
                x2={50 + position * 100} 
                y2={500}
                stroke={branch === 'main' ? 
                  'rgba(var(--color-primary), 0.5)' : 
                  'rgba(var(--color-secondary), 0.5)'}
                strokeWidth={2}
                strokeDasharray={branch === 'main' ? undefined : '5,5'}
              />
            ))}
            
            {/* Draw connections between commits */}
            {commits.map(commit => 
              commit.parentIds.map(parentId => {
                const start = nodePositions.get(parentId);
                const end = nodePositions.get(commit.id);
                
                if (!start || !end) return null;
                
                // Direct parent connection
                if (start.x === end.x) {
                  return (
                    <line
                      key={`${commit.id}-${parentId}`}
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="rgba(var(--color-border), 0.7)"
                      strokeWidth={2}
                    />
                  );
                }
                
                // Merge connection
                return (
                  <path
                    key={`${commit.id}-${parentId}`}
                    d={`M${start.x},${start.y} C${start.x},${(start.y + end.y) / 2} ${end.x},${(start.y + end.y) / 2} ${end.x},${end.y}`}
                    fill="none"
                    stroke="rgba(var(--color-border), 0.7)"
                    strokeWidth={2}
                    strokeDasharray="5,5"
                  />
                );
              })
            )}
            
            {/* Draw commit nodes */}
            {commits.map(commit => {
              const position = nodePositions.get(commit.id);
              if (!position) return null;
              
              return (
                <g key={commit.id}>
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={15}
                    fill={`${getCommitColor(commit.type)}33`}
                    stroke={getCommitColor(commit.type)}
                    strokeWidth={2}
                    onClick={() => handleCommitClick(commit.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  
                  <foreignObject
                    x={position.x - 10}
                    y={position.y - 10}
                    width={20}
                    height={20}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="flex items-center justify-center h-full text-[rgb(var(--color-foreground))]">
                      {getCommitIcon(commit.type)}
                    </div>
                  </foreignObject>
                  
                  {/* Branch label */}
                  <foreignObject
                    x={position.x - 50}
                    y={position.y - 40}
                    width={100}
                    height={30}
                  >
                    <div className="flex justify-center">
                      {commit.type === 'branch' && (
                        <div className="px-2 py-1 bg-[rgba(var(--color-success),0.2)] text-[rgb(var(--color-success))] text-xs rounded-full">
                          {commit.branch}
                        </div>
                      )}
                      
                      {commit.tags && commit.tags.map(tag => (
                        <div 
                          key={tag}
                          className="px-2 py-1 bg-[rgba(var(--color-warning),0.2)] text-[rgb(var(--color-warning))] text-xs rounded-full ml-1"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </foreignObject>
                  
                  {/* Commit details */}
                  <foreignObject
                    x={position.x + 30}
                    y={position.y - 20}
                    width={expandedCommits.has(commit.id) ? 300 : 200}
                    height={expandedCommits.has(commit.id) ? 120 : 40}
                  >
                    <div 
                      className={`
                        p-2 rounded-lg transition-all
                        ${expandedCommits.has(commit.id) 
                          ? 'bg-[rgba(var(--color-surface),0.95)] border border-[rgba(var(--color-border),0.3)]' 
                          : 'bg-transparent'
                        }
                      `}
                    >
                      <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleCommitClick(commit.id)}
                      >
                        {expandedCommits.has(commit.id) ? (
                          <ChevronDown className="w-4 h-4 text-[rgb(var(--color-muted))]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[rgb(var(--color-muted))]" />
                        )}
                        <div className="text-sm font-medium text-[rgb(var(--color-foreground))] truncate">
                          {commit.message}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedCommits.has(commit.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 pt-2 border-t border-[rgba(var(--color-border),0.3)]"
                          >
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Hash className="w-3 h-3 text-[rgb(var(--color-muted))]" />
                                <span className="text-[rgb(var(--color-muted))]">Hash:</span>
                              </div>
                              <div className="font-mono text-[rgb(var(--color-foreground))]">
                                {commit.hash}
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3 text-[rgb(var(--color-muted))]" />
                                <span className="text-[rgb(var(--color-muted))]">Author:</span>
                              </div>
                              <div className="text-[rgb(var(--color-foreground))]">
                                {commit.author}
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[rgb(var(--color-muted))]" />
                                <span className="text-[rgb(var(--color-muted))]">Date:</span>
                              </div>
                              <div className="text-[rgb(var(--color-foreground))]">
                                {commit.date}
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3 text-[rgb(var(--color-muted))]" />
                                <span className="text-[rgb(var(--color-muted))]">Message:</span>
                              </div>
                              <div className="text-[rgb(var(--color-foreground))]">
                                {commit.message}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        {Array.from(branches.keys()).map(branch => (
          <div 
            key={branch}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm
              ${branch === 'main' 
                ? 'bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))]' 
                : 'bg-[rgba(var(--color-secondary),0.1)] text-[rgb(var(--color-secondary))]'
              }
            `}
          >
            <GitBranch className="w-4 h-4" />
            {branch}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitCommitHistory;
