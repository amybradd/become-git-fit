import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GitBranch, 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  User
} from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Tutorials', path: '/tutorial', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus-ring rounded-md p-1"
            aria-label="Git Fit Today - Home"
          >
            <GitBranch className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold gradient-text">Git Fit Today</span>
          </Link>

          {/* Desktop nav - progress bar removed */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors focus-ring ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
            
            <ThemeSwitcher />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              className="focus-ring rounded-md p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? 
                <X className="w-6 h-6 text-primary" /> : 
                <Menu className="w-6 h-6 text-primary" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-3 rounded-md transition-colors focus-ring ${
                  location.pathname === link.path 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;