import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SessionMakePage from "./pages/SessionMakePage";
import { DragDropPage } from "./pages/DragDropPage";
import { sessionTexts } from './types/sessionTexts'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/make" element={<SessionMakePage />} />
        <Route path="/make2" element={<DragDropPage sessions={Object.values(sessionTexts)} />} />
      </Routes>
    </Router>
  );
}

export default App;