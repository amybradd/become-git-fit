import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Award, 
  BarChart, 
  CheckCircle2, 
  Calendar,
  GitCommit,
  GitBranch,
  GitMerge
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('progress');
  
  // Mock data for the user profile
  const userData = {
    completedCommands: 12,
    totalCommands: 32,
    lastActive: '2 days ago',
    joinedDate: '15 Jun 2023',
    streak: 4
  };
  
  // Mock data for achievements
  const achievements = [
    { 
      id: 'first-commit', 
      name: 'First Commit', 
      description: 'Made your first Git commit', 
      earned: true,
      date: '2 days ago',
      icon: GitCommit
    },
    { 
      id: 'branching-master', 
      name: 'Branching Master', 
      description: 'Created and merged 3 branches', 
      earned: true,
      date: '1 day ago',
      icon: GitBranch
    },
    { 
      id: 'merge-conflict-solver', 
      name: 'Conflict Resolver', 
      description: 'Resolved your first merge conflict', 
      earned: false,
      progress: 0,
      icon: GitMerge
    }
  ];
  
  const completionPercentage = Math.round((userData.completedCommands / userData.totalCommands) * 100);
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--color-background))]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[rgba(var(--color-primary),0.2)] rounded-full p-4">
                <User className="w-12 h-12 text-[rgb(var(--color-primary))]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Your Git Profile</h1>
                <p className="text-[rgb(var(--color-muted))]">Track your progress and achievements</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <div className="text-2xl font-bold text-[rgb(var(--color-foreground))]">{completionPercentage}%</div>
                <div className="text-[rgb(var(--color-muted))] text-sm">Completion</div>
              </div>
              <div className="h-16 w-16 rounded-full bg-[rgba(var(--color-surface),0.8)] flex items-center justify-center relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-[rgba(var(--color-border),0.3)]"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - completionPercentage / 100)}
                    className="text-[rgb(var(--color-primary))] transition-all duration-1000 ease-out"
                  />
                </svg>
                <CheckCircle2 className="w-6 h-6 text-[rgb(var(--color-primary))] absolute" />
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="bg-[rgba(var(--color-surface),0.7)] backdrop-blur-sm rounded-xl overflow-hidden border border-[rgba(var(--color-border),0.3)]">
            {/* Tabs */}
            <div className="flex text-sm font-medium text-center border-b border-[rgba(var(--color-border),0.3)]">
              <button
                className={`flex items-center gap-2 py-3 px-5 transition-colors ${
                  activeTab === 'progress' 
                    ? 'bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]' 
                    : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
                }`}
                onClick={() => setActiveTab('progress')}
              >
                <BarChart className="w-4 h-4" />
                Progress
              </button>
              <button
                className={`flex items-center gap-2 py-3 px-5 transition-colors ${
                  activeTab === 'achievements' 
                    ? 'bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]' 
                    : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]'
                }`}
                onClick={() => setActiveTab('achievements')}
              >
                <Award className="w-4 h-4" />
                Achievements
              </button>
            </div>
            
            {/* Tab content */}
            <div className="p-6">
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[rgba(var(--color-background),0.3)] p-4 rounded-lg">
                      <div className="text-[rgb(var(--color-muted))] text-sm">Commands Completed</div>
                      <div className="text-2xl font-bold text-[rgb(var(--color-foreground))]">{userData.completedCommands} / {userData.totalCommands}</div>
                    </div>
                    <div className="bg-[rgba(var(--color-background),0.3)] p-4 rounded-lg">
                      <div className="text-[rgb(var(--color-muted))] text-sm">Current Streak</div>
                      <div className="text-2xl font-bold text-[rgb(var(--color-foreground))]">{userData.streak} days</div>
                    </div>
                    <div className="bg-[rgba(var(--color-background),0.3)] p-4 rounded-lg">
                      <div className="text-[rgb(var(--color-muted))] text-sm">Last Active</div>
                      <div className="text-2xl font-bold text-[rgb(var(--color-foreground))]">{userData.lastActive}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[rgb(var(--color-foreground))] mb-4">Learning Progress</h3>
                    <div className="w-full h-6 bg-[rgba(var(--color-background),0.3)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[rgb(var(--color-primary))] rounded-full"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <div className="mt-2 text-right text-[rgb(var(--color-muted))]">
                      {userData.completedCommands} of {userData.totalCommands} commands
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'achievements' && (
                <div>
                  <h3 className="text-lg font-semibold text-[rgb(var(--color-foreground))] mb-4">Your Achievements</h3>
                  <div className="space-y-4">
                    {achievements.map(achievement => (
                      <div 
                        key={achievement.id}
                        className="bg-[rgba(var(--color-background),0.3)] p-4 rounded-lg flex items-start gap-4"
                      >
                        <div className={`p-3 rounded-full ${
                          achievement.earned 
                            ? 'bg-[rgba(var(--color-success),0.2)]' 
                            : 'bg-[rgba(var(--color-muted),0.2)]'
                        }`}>
                          <achievement.icon className={`w-6 h-6 ${
                            achievement.earned 
                              ? 'text-[rgb(var(--color-success))]' 
                              : 'text-[rgb(var(--color-muted))]'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-[rgb(var(--color-foreground))]">{achievement.name}</h4>
                            {achievement.earned && (
                              <span className="text-xs text-[rgb(var(--color-muted))]">{achievement.date}</span>
                            )}
                          </div>
                          <p className="text-sm text-[rgb(var(--color-muted))]">{achievement.description}</p>
                          {!achievement.earned && 'progress' in achievement && (
                            <div className="mt-2 w-full h-1.5 bg-[rgba(var(--color-border),0.3)] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[rgb(var(--color-warning))]"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
