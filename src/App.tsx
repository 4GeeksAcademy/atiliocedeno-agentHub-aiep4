import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AgentsProvider } from './contexts/AgentsContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import MetricsPage from './pages/MetricsPage';
import AgentsPage from './pages/AgentsPage';
import ExplorePage from './pages/ExplorePage';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AgentsProvider>
          <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-neutral dark:text-white">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/agentes" element={<AgentsPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/metrics" element={<MetricsPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </AgentsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}