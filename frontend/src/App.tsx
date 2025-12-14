import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Transcriptions } from './pages/Transcriptions';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
                <span>VoiceOwl</span>
              </Link>
              <div className="flex gap-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">New</Link>
                <Link to="/list" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">History</Link>
              </div>
            </div>
          </nav>

          <main className="py-8 animate-fade-in-up">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<Transcriptions />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
