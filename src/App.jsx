import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

// Pages
import Homepage from '@/components/pages/Homepage';
import ToolsPage from '@/components/pages/ToolsPage';
import LoginPage from '@/components/pages/LoginPage';
import SignupPage from '@/components/pages/SignupPage';
import UserDashboard from '@/components/pages/UserDashboard';
import AdminDashboard from '@/components/pages/AdminDashboard';
import GamePromptGenerator from '@/components/pages/GamePromptGenerator';
import WebsitePromptGenerator from '@/components/pages/WebsitePromptGenerator';

// Components
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

// Context
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/tools/game-prompt-generator" element={<GamePromptGenerator />} />
              <Route path="/tools/website-prompt-generator" element={<WebsitePromptGenerator />} />
            </Routes>
          </main>
          <Footer />
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            className="z-[9999]"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;