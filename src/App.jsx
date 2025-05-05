import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from './context/UserContext';
import { Dashboard } from "./pages/ADashboard";
import Landing from "./pages/Landing";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AtsPage from "./pages/AtsPage";
import InterviewQuestionsPage from "./pages/InterviewQuestionsPage";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ScrollManager from '../scrollManager'; // Assuming you have a scrollManager.js file
import ResumeGen from "./pages/ResumeGen";
import GeneratorPage from "./pages/Generate";
// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollManager>
          <main className="m-0 p-0 box-border flex items-center justify-center font-satoshi">
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/user/ats" element={<AtsPage />} />
                <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
                <Route 
                  path="/user/profile" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/resume" element={<ResumeGen />} />
                <Route path="/generator" element={<GeneratorPage />} />
                <Route path="/auth/signup" element={<Register />} />
                <Route path="/auth/signin" element={<Login />} />
                <Route 
                  path="*" 
                  element={
                    <div className="text-center text-3xl mt-20">
                      404 - Page Not Found
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
        </ScrollManager>
      </BrowserRouter>
    </UserProvider>
  );
}