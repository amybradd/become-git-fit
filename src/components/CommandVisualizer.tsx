import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest,
  Book,
  HelpCircle,
  FileCode,
  Folder,
  RefreshCw,
  Hash,
  Upload,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ArrowRightLeft,
  Info
} from 'lucide-react';

type GitAreaType = 'working' | 'staging' | 'local' | 'remote';

type GitNode = {
  id: string;
  type: 'file' | 'directory' | 'commit' | 'branch' | 'remote';
  name: string;
  area: GitAreaType;
  state?: 'modified' | 'untracked' | 'staged' | 'committed';
  position: { x: number; y: number; z?: number };
};

type GitActionType = 
  | 'add' 
  | 'commit' 
  | 'branch' 
  | 'checkout'
  | 'push'
  | 'pull'
  | 'merge'
  | 'clone'
  | 'fetch'
  | 'reset'
  | 'revert';

type GitAction = {
  type: GitActionType;
  command: string;
  description: string;
  areas: GitAreaType[];
  icon: React.ComponentType<{ className?: string }>;
  animate: (nodes: GitNode[]) => { 
    nodes: GitNode[]; 
    transitions: { 
      from: string; 
      to: string; 
      path?: { x: number; y: number }[] 
    }[] 
  };
};

const CommandVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<GitNode[]>([
    // Working directory files
    { 
      id: 'file1', 
      type: 'file', 
      name: 'index.html', 
      area: 'working', 
      state: 'modified',
      position: { x: 100, y: 100 } 
    },
    { 
      id: 'file2', 
      type: 'file', 
      name: 'style.css', 
      area: 'working', 
      state: 'untracked',
      position: { x: 100, y: 150 } 
    },
    { 
      id: 'file3', 
      type: 'file', 
      name: 'app.js', 
      area: 'working', 
      state: 'modified',
      position: { x: 100, y: 200 } 
    },
    
    // Git directory
    { 
      id: 'git-dir', 
      type: 'directory', 
      name: '.git', 
      area: 'local',
      position: { x: 350, y: 50 } 
    },
    
    // Local repository with main branch
    { 
      id: 'commit-main', 
      type: 'commit', 
      name: 'Initial commit', 
      area: 'local',
      position: { x: 350, y: 150 } 
    },
    { 
      id: 'branch-main', 
      type: 'branch', 
      name: 'main', 
      area: 'local',
      position: { x: 350, y: 200 } 
    },
    
    // Remote repository
    { 
      id: 'remote-origin', 
      type: 'remote', 
      name: 'origin/main', 
      area: 'remote',
      position: { x: 600, y: 150 } 
    }
  ]);
  
  const [selectedCommand, setSelectedCommand] = useState<GitAction | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitions, setTransitions] = useState<any[]>([]);
  const [zoom, setZoom] = useState(1);
  const [showAreaLabels, setShowAreaLabels] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const gitActions: GitAction[] = [
    {
      type: 'add',
      command: 'git add',
      description: 'Move files from working directory to staging area',
      areas: ['working', 'staging'],
      icon: GitCommit,
      animate: (currentNodes) => {
        // Find files in working directory and move them to staging area
        const modifiedNodes = [...currentNodes];
        const transitions = [];
        
        const workingFiles = currentNodes.filter(
          node => node.type === 'file' && node.area === 'working'
        );
        
        for (const file of workingFiles) {
          const stagedFile = {
            ...file,
            id: `staged-${file.id}`,
            area: 'staging' as GitAreaType,
            state: 'staged' as const,
            position: { x: 250, y: file.position.y }
          };
          
          modifiedNodes.push(stagedFile);
          transitions.push({
            from: file.id,
            to: stagedFile.id,
            path: [file.position, stagedFile.position]
          });
        }
        
        return { nodes: modifiedNodes, transitions };
      }
    },
    // ...other git actions from previous code...
  ];
  
  const executeCommand = () => {
    if (selectedCommand && !isAnimating) {
      setIsAnimating(true);
      
      const result = selectedCommand.animate(nodes);
      setTransitions(result.transitions);
      
      // After animation completes, update the node state
      setTimeout(() => {
        setNodes(result.nodes);
        setTransitions([]);
        setIsAnimating(false);
      }, 2000);
    }
  };
  
  const resetVisualization = () => {
    window.location.reload();
  };
  
  const getNodeColor = (node: GitNode) => {
    switch (node.type) {
      case 'file':
        if (node.state === 'modified') return "rgba(var(--color-warning), 0.8)";
        if (node.state === 'untracked') return "rgba(var(--color-danger), 0.8)";
        if (node.state === 'staged') return "rgba(var(--color-success), 0.8)";
        return "rgba(var(--color-foreground), 0.8)";
      case 'directory':
        return "rgba(var(--color-muted), 0.8)";
      case 'commit':
        return "rgba(var(--color-primary), 0.8)";
      case 'branch':
        return "rgba(var(--color-secondary), 0.8)";
      case 'remote':
        return "rgba(var(--color-info), 0.8)";
      default:
        return "rgba(var(--color-foreground), 0.8)";
    }
  };
  
  const getNodeIcon = (node: GitNode) => {
    switch (node.type) {
      case 'file':
        return <FileCode className="w-4 h-4" />;
      case 'directory':
        return <Folder className="w-4 h-4" />;
      case 'commit':
        return <GitCommit className="w-4 h-4" />;
      case 'branch':
        return <GitBranch className="w-4 h-4" />;
      case 'remote':
        return <GitPullRequest className="w-4 h-4" />;
      default:
        return <FileCode className="w-4 h-4" />;
    }
  };
  
  const getAreaLabel = (area: GitAreaType) => {
    switch (area) {
      case 'working':
        return { 
          title: 'Working Directory', 
          position: { x: 100, y: 50 },
          description: 'Files you are currently editing'
        };
      case 'staging':
        return { 
          title: 'Staging Area', 
          position: { x: 250, y: 50 },
          description: 'Files ready to be committed'
        };
      case 'local':
        return { 
          title: 'Local Repository', 
          position: { x: 350, y: 20 },
          description: 'Your local commits and branches'
        };
      case 'remote':
        return { 
          title: 'Remote Repository', 
          position: { x: 600, y: 50 },
          description: 'The shared repository on a server'
        };
    }
  };
  
  return (
    <div className="card-gradient rounded-xl p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))]">Git Command Visualizer</h3>
          <p className="text-[rgb(var(--color-muted))] text-sm">Choose a Git command to see how it affects the repository</p>
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
            onClick={() => setShowAreaLabels(!showAreaLabels)}
            className={`p-2 rounded focus-ring ${
              showAreaLabels 
                ? 'bg-[rgba(var(--color-primary),0.2)]' 
                : 'bg-[rgba(var(--color-surface),0.8)]'
            }`}
            aria-label={showAreaLabels ? "Hide area labels" : "Show area labels"}
          >
            <Info className={`w-4 h-4 ${
              showAreaLabels 
                ? 'text-[rgb(var(--color-primary))]' 
                : 'text-[rgb(var(--color-muted))]'
            }`} />
          </button>
          
          <button
            onClick={resetVisualization}
            className="p-2 rounded bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label="Reset visualization"
          >
            <RotateCw className="w-4 h-4 text-[rgb(var(--color-muted))]" />
          </button>
          
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded bg-[rgba(var(--color-surface),0.8)] focus-ring"
            aria-label="Show help"
          >
            <HelpCircle className="w-4 h-4 text-[rgb(var(--color-muted))]" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Command selection */}
        <div className="md:w-1/3 space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-[rgb(var(--color-foreground))]">Available Commands</h4>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {gitActions.map(action => (
              <button
                key={action.type}
                onClick={() => setSelectedCommand(
                  selectedCommand?.type === action.type ? null : action
                )}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedCommand?.type === action.type
                    ? 'bg-[rgba(var(--color-primary),0.2)] border border-[rgba(var(--color-primary),0.5)]'
                    : 'bg-[rgba(var(--color-surface),0.8)] border border-[rgba(var(--color-border),0.3)] hover:border-[rgba(var(--color-primary),0.3)]'
                }`}
                disabled={isAnimating}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    selectedCommand?.type === action.type
                      ? 'bg-[rgba(var(--color-primary),0.3)]'
                      : 'bg-[rgba(var(--color-surface-hover),0.5)]'
                  }`}>
                    <action.icon className={`w-5 h-5 ${
                      selectedCommand?.type === action.type
                        ? 'text-[rgb(var(--color-primary))]'
                        : 'text-[rgb(var(--color-muted))]'
                    }`} />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium">
                      {action.command}
                    </div>
                    <div className="text-xs text-[rgb(var(--color-muted))]">
                      {action.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Execute button */}
          {selectedCommand && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={executeCommand}
              disabled={isAnimating}
              className="w-full py-3 px-4 mt-4 bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))] rounded-lg border border-[rgba(var(--color-primary),0.3)] hover:bg-[rgba(var(--color-primary),0.3)] transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                {isAnimating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span>{isAnimating ? 'Executing...' : 'Execute Command'}</span>
              </div>
            </motion.button>
          )}
        </div>
        
        {/* Visualization area */}
        <div className="md:w-2/3 bg-[rgba(var(--color-background),0.5)] rounded-lg border border-[rgba(var(--color-border),0.3)] overflow-hidden relative">
          <div 
            className="w-full h-[500px] overflow-auto" 
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          >
            <svg 
              width="800" 
              height="500" 
              className="visualization-canvas"
            >
              {/* Area labels */}
              {showAreaLabels && ['working', 'staging', 'local', 'remote'].map((area) => {
                const areaInfo = getAreaLabel(area as GitAreaType);
                return (
                  <g key={area} className="area-label">
                    <text
                      x={areaInfo.position.x}
                      y={areaInfo.position.y}
                      className="font-medium text-[rgb(var(--color-foreground))]"
                      textAnchor="middle"
                    >
                      {areaInfo.title}
                    </text>
                    <text
                      x={areaInfo.position.x}
                      y={areaInfo.position.y + 20}
                      className="text-xs text-[rgb(var(--color-muted))]"
                      textAnchor="middle"
                    >
                      {areaInfo.description}
                    </text>
                  </g>
                );
              })}
              
              {/* Area separators */}
              <line 
                x1="175" y1="50" x2="175" y2="450" 
                stroke="rgba(var(--color-border), 0.5)" 
                strokeDasharray="4" 
              />
              <line 
                x1="300" y1="50" x2="300" y2="450" 
                stroke="rgba(var(--color-border), 0.5)" 
                strokeDasharray="4" 
              />
              <line 
                x1="475" y1="50" x2="475" y2="450" 
                stroke="rgba(var(--color-border), 0.5)" 
                strokeDasharray="4" 
              />
              
              {/* Transition animations */}
              {transitions.map((transition, index) => {
                const fromNode = nodes.find(n => n.id === transition.from);
                const toNode = nodes.find(n => n.id === transition.to);
                
                if (!fromNode || !toNode) return null;
                
                const path = transition.path || [fromNode.position, toNode.position];
                
                return (
                  <motion.g key={`transition-${index}`}>
                    <motion.circle
                      cx={fromNode.position.x}
                      cy={fromNode.position.y}
                      r={8}
                      fill={getNodeColor(fromNode)}
                      initial={{ scale: 1 }}
                      animate={{ 
                        x: [0, ...path.slice(1).map(p => p.x - fromNode.position.x)],
                        y: [0, ...path.slice(1).map(p => p.y - fromNode.position.y)],
                      }}
                      transition={{ duration: 1.5 }}
                    />
                    <motion.path
                      d={`M${path.map(p => `${p.x},${p.y}`).join(' L')}`}
                      fill="none"
                      stroke="rgba(var(--color-primary), 0.5)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </motion.g>
                );
              })}
              
              {/* Nodes */}
              {nodes.map(node => (
                <g key={node.id} className="git-node">
                  <circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={15}
                    fill={getNodeColor(node)}
                    stroke="rgba(var(--color-border), 0.5)"
                    strokeWidth="1"
                  />
                  <foreignObject
                    x={node.position.x - 8}
                    y={node.position.y - 8}
                    width={16}
                    height={16}
                  >
                    <div className="flex items-center justify-center h-full text-[rgb(var(--color-background))]">
                      {getNodeIcon(node)}
                    </div>
                  </foreignObject>
                  <text
                    x={node.position.x}
                    y={node.position.y + 30}
                    className="text-xs text-[rgb(var(--color-foreground))]"
                    textAnchor="middle"
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          
          {/* Command explanation */}
          {selectedCommand && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[rgba(var(--color-surface),0.95)] backdrop-blur-sm border-t border-[rgba(var(--color-border),0.3)]">
              <h4 className="font-medium text-[rgb(var(--color-foreground))] mb-2 flex items-center gap-2">
                <selectedCommand.icon className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                <code className="font-mono">{selectedCommand.command}</code>
              </h4>
              <p className="text-sm text-[rgb(var(--color-muted))]">
                {selectedCommand.description}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Help modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(var(--color-background),0.8)]"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[rgb(var(--color-surface))] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[rgb(var(--color-foreground))]">
                  How to Use the Git Visualizer
                </h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-2 rounded-full hover:bg-[rgba(var(--color-surface-hover),0.8)]"
                >
                  <X className="w-5 h-5 text-[rgb(var(--color-muted))]" />
                </button>
              </div>
              
              <div className="space-y-4 text-[rgb(var(--color-foreground))]">
                <p>
                  The Git Command Visualizer helps you understand how Git commands affect 
                  different areas of your repository.
                </p>
                
                <h4 className="font-semibold text-lg mt-4">Repository Areas</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Working Directory:</strong> Files you're currently editing
                  </li>
                  <li>
                    <strong>Staging Area:</strong> Files ready to be committed
                  </li>
                  <li>
                    <strong>Local Repository:</strong> Your commits and branches
                  </li>
                  <li>
                    <strong>Remote Repository:</strong> The shared repository on a server
                  </li>
                </ul>
                
                <h4 className="font-semibold text-lg mt-4">Using the Visualizer</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Select a Git command from the left panel</li>
                  <li>Click "Execute Command" to see how it affects the repository</li>
                  <li>Watch the animation to understand the data flow</li>
                  <li>Use the zoom controls to adjust the view if needed</li>
                </ol>
                
                <h4 className="font-semibold text-lg mt-4">Node Colors</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[rgba(var(--color-warning),0.8)]"></div>
                    <span>Modified files</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[rgba(var(--color-danger),0.8)]"></div>
                    <span>Untracked files</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[rgba(var(--color-success),0.8)]"></div>
                    <span>Staged files</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[rgba(var(--color-primary),0.8)]"></div>
                    <span>Commits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[rgba(var(--color-secondary),0.8)]"></div>
                    <span>Branches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[rgba(var(--color-info),0.8)]"></div>
                    <span>Remote repositories</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowHelpModal(false)}
                className="mt-6 w-full py-2 bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))] rounded-lg border border-[rgba(var(--color-primary),0.3)] hover:bg-[rgba(var(--color-primary),0.3)] transition-colors focus-ring"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommandVisualizer;
