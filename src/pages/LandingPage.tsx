import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  // Fix the flickering issue by ensuring icons are present before animation starts
  const iconVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { 
      y: [0, -10, 0], 
      transition: { 
        repeat: Infinity, 
        duration: 2,
        repeatDelay: 0.2 
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-5xl"
      >
        <motion.h1 
          className="text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="block leading-tight">
            <span className="gradient-gold">Become</span> 
            <span className="gradient-silver"> Git Fit</span> 
            <span className="text-white"> Today</span>
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Master Git through interactive tutorials and visual learning. Transform your version control journey into a seamless experience.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            className="feature-card"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
              <GitBranch className="w-14 h-14 text-primary relative" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-4">Branch</h3>
            <p className="text-gray-400 mt-2">Create and manage branches with ease</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            transition={{ delay: 0.3 }}
            className="feature-card"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md"></div>
              <GitCommit className="w-14 h-14 text-secondary relative" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-4">Commit</h3>
            <p className="text-gray-400 mt-2">Learn proper commit structure and habits</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            transition={{ delay: 0.6 }}
            className="feature-card"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
              <GitMerge className="w-14 h-14 text-primary relative" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-4">Merge</h3>
            <p className="text-gray-400 mt-2">Master the art of merging without conflicts</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/tutorial"
            className="start-button"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;