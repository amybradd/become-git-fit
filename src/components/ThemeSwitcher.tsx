import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Settings, Monitor, Contrast } from 'lucide-react';

type Theme = 'dark' | 'light' | 'system' | 'high-contrast';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('git-fit-theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('system');
      applyTheme('dark');
    } else {
      setTheme('system');
      applyTheme('light');
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme attributes
    root.removeAttribute('data-theme');
    
    // Set appropriate theme
    if (newTheme === 'system') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', newTheme);
    }
    
    // Save theme preference
    localStorage.setItem('git-fit-theme', newTheme);
  };
  
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };
  
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-5 h-5" />;
      case 'dark': return <Moon className="w-5 h-5" />;
      case 'system': return <Monitor className="w-5 h-5" />;
      case 'high-contrast': return <Contrast className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-[rgba(var(--color-surface),0.8)] focus-ring text-[rgb(var(--color-foreground))] hover:bg-[rgba(var(--color-surface-hover),0.8)]"
        aria-label="Change theme"
        title="Change theme"
      >
        {getThemeIcon()}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[rgba(var(--color-surface),0.95)] backdrop-blur-md border border-[rgba(var(--color-border),0.3)] z-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-1 divide-y divide-[rgba(var(--color-border),0.3)]">
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-[rgb(var(--color-foreground))]">Select Theme</p>
              </div>
              
              <div className="py-1">
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`group flex w-full items-center px-4 py-2 text-sm ${
                    theme === 'dark' ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-foreground))]'
                  } hover:bg-[rgba(var(--color-surface-hover),0.8)]`}
                >
                  <Moon className="mr-3 h-5 w-5" aria-hidden="true" />
                  Dark
                </button>
                
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`group flex w-full items-center px-4 py-2 text-sm ${
                    theme === 'light' ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-foreground))]'
                  } hover:bg-[rgba(var(--color-surface-hover),0.8)]`}
                >
                  <Sun className="mr-3 h-5 w-5" aria-hidden="true" />
                  Light
                </button>
                
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`group flex w-full items-center px-4 py-2 text-sm ${
                    theme === 'system' ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-foreground))]'
                  } hover:bg-[rgba(var(--color-surface-hover),0.8)]`}
                >
                  <Monitor className="mr-3 h-5 w-5" aria-hidden="true" />
                  System
                </button>
                
                <button
                  onClick={() => handleThemeChange('high-contrast')}
                  className={`group flex w-full items-center px-4 py-2 text-sm ${
                    theme === 'high-contrast' ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-foreground))]'
                  } hover:bg-[rgba(var(--color-surface-hover),0.8)]`}
                >
                  <Contrast className="mr-3 h-5 w-5" aria-hidden="true" />
                  High Contrast
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
