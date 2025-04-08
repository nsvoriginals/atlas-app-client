import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Dashboard } from "./pages/ADashboard";
import Landing from "./pages/Landing";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AtsPage from "./pages/AtsPage";
import InterviewQuestionsPage from "./pages/InterviewQuestionsPage";

export default function App() {
  return (
    <main className="m-0 p-0 box-border flex items-center justify-center font-satoshi">
      <BrowserRouter>
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
          <Route path="/auth/signup" element={<Register />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="*" element={<div className="text-center text-3xl mt-20">404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
