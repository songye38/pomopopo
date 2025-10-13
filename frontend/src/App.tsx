import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { DragDropPage } from "./pages/DragDropPage";
import { sessionTexts } from './types/sessionTexts';
import { ToastContainer } from 'react-toastify';
import PomodoroPage from "./pages/PomodoroPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthProvider"; // ✅ 여기 추가!

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/make/:id" element={<DragDropPage sessions={Object.values(sessionTexts)} />} />
          <Route path="/pomo/:id" element={<PomodoroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        {/* ✅ ToastContainer는 Routes 밖에 둬야 전역에서 작동 */}
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
    </AuthProvider>
  );
}

export default App;
