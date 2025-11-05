import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

import HomePage from "./pages/HomePage";
import { DragDropPage } from "./pages/DragDropPage";
import { sessionTexts } from './types/sessionTexts';
import { ToastContainer } from 'react-toastify';
import PomodoroPage from "./pages/PomodoroPage";
import { UpdatePomodoroPage } from "./pages/UpdatePomodoro";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthProvider";
import PomodoroSummaryPage from "./pages/PomodoroSummaryPage";

// GA 페이지뷰 추적용 컴포넌트
function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <Router>
      <GAListener /> {/* 페이지뷰 추적 추가 */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/make/:id" element={<DragDropPage sessions={Object.values(sessionTexts)} />} />
        <Route path="/update/:id" element={<UpdatePomodoroPage sessions={Object.values(sessionTexts)} />} />
        <Route path="/pomo/:id" element={<PomodoroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/summary/:logId" element={<PomodoroSummaryPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <div>
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
