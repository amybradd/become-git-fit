import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Check, Copy, ChevronUp, ChevronDown } from 'lucide-react';

type CommandCategory = 'basic' | 'branching' | 'remote' | 'staging' | 'committing' | 'history' | 'misc';

type GitCommand = {
  command: string;
  description: string;
  example: string;
  category: CommandCategory;
  difficulty: 'easy' | 'medium' | 'hard';
};

type GitCheatSheetProps = {
  maxHeight?: string;
};

const categoryIcons: Record<CommandCategory, React.ComponentType<{ className?: string }>> = {
  basic: SearchIcon,
  branching: SearchIcon,
  remote: SearchIcon,
  staging: SearchIcon,
  committing: SearchIcon,
  history: SearchIcon,
  misc: SearchIcon,
};

const categoryLabels: Record<CommandCategory, string> = {
  basic: 'Basic Commands',
  branching: 'Branching',
  remote: 'Remote Repositories',
  staging: 'Staging Area',
  committing: 'Committing',
  history: 'History & Logs',
  misc: 'Miscellaneous',
};

const GitCheatSheet: React.FC<GitCheatSheetProps> = ({ maxHeight = '600px' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CommandCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [expandedCommands, setExpandedCommands] = useState<Set<string>>(new Set());
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(false);
  const [isOpenDifficultyFilter, setIsOpenDifficultyFilter] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // ...existing code...
  
  // Group by category
  const commandsByCategory = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, GitCommand[]>);
  
  // Get all available categories
  const availableCategories = Object.keys(commandsByCategory) as CommandCategory[];
  
  return (
    <div className="card-gradient rounded-xl p-6">
      {/* ...existing code... */}
      
      {/* Results display */}
      <div 
        className="overflow-auto" 
        style={{ maxHeight }}
      >
        {availableCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <SearchIcon className="w-12 h-12 text-[rgb(var(--color-muted))]" />
            <p className="mt-4 text-[rgb(var(--color-muted))]">
              No commands found for your search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))] rounded-lg hover:bg-[rgba(var(--color-primary),0.3)] transition-colors focus-ring"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {availableCategories.map(category => (
              <div key={category} className="command-category">
                <div className="flex items-center gap-2 mb-3">
                  {React.createElement(categoryIcons[category], { 
                    className: 'w-5 h-5 text-[rgb(var(--color-primary))]' 
                  })}
                  <h4 className="text-lg font-semibold text-[rgb(var(--color-foreground))]">
                    {categoryLabels[category]}
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {commandsByCategory[category].map(cmd => (
                    <div 
                      key={cmd.command}
                      className="bg-[rgba(var(--color-surface),0.8)] border border-[rgba(var(--color-border),0.3)] rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-3 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleCommandExpansion(cmd.command)}
                      >
                        <div className="flex items-center gap-3">
                          <code className="font-mono text-[rgb(var(--color-primary))]">
                            {cmd.command}
                          </code>
                          <span className={`difficulty-badge ${cmd.difficulty}`}>
                            {cmd.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCommand(cmd.command);
                            }}
                            className="p-1.5 rounded hover:bg-[rgba(var(--color-surface-hover),0.8)] focus-ring"
                            aria-label="Copy command"
                          >
                            {copiedCommand === cmd.command ? (
                              <Check className="w-4 h-4 text-[rgb(var(--color-success))]" />
                            ) : (
                              <Copy className="w-4 h-4 text-[rgb(var(--color-muted))]" />
                            )}
                          </button>
                          
                          {expandedCommands.has(cmd.command) ? (
                            <ChevronUp className="w-4 h-4 text-[rgb(var(--color-muted))]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[rgb(var(--color-muted))]" />
                          )}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedCommands.has(cmd.command) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-3 border-t border-[rgba(var(--color-border),0.3)] bg-[rgba(var(--color-background),0.3)]">
                              <p className="mb-3 text-[rgb(var(--color-foreground))]">
                                {cmd.description}
                              </p>
                              
                              <div className="bg-[rgba(var(--color-background),0.5)] rounded-lg p-3 font-mono text-sm overflow-x-auto">
                                {cmd.example.split('\n').map((line, i) => (
                                  <div key={i} className="text-[rgb(var(--color-foreground))]">
                                    {line}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Command count */}
      <div className="mt-4 text-sm text-[rgb(var(--color-muted))]">
        Showing {filteredCommands.length} of {commands.length} commands
      </div>
    </div>
  );
};

export default GitCheatSheet;