import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GitProgressProvider } from './context/GitProgressContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import TutorialPage from './pages/TutorialPage';
import ProfilePage from './pages/ProfilePage';

// Simple NotFoundPage component
const NotFoundPage = () => (
  <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold gradient-text mb-4">404 - Page Not Found</h1>
    <p className="text-[rgb(var(--color-muted))]">The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <GitProgressProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/tutorial/:tutorialId" element={<TutorialPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
    </GitProgressProvider>
  );
}

export default App;