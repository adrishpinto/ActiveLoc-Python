import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TranslationServices from "./pages/TranslationServices";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mt" element={<TranslationServices />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
