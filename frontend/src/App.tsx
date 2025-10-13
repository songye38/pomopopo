import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { DragDropPage } from "./pages/DragDropPage";
import { sessionTexts } from './types/sessionTexts'
import { ToastContainer } from 'react-toastify';
import PomodoroPage from "./pages/PomodoroPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/make/:id" element={<DragDropPage sessions={Object.values(sessionTexts)} />} />
        <Route path="/pomo/:id" element={<PomodoroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Routes 밖에 위치시켜야 함 */}
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


export default App;