import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<MainPage/>} />
    </Routes>
  </Router>);
}

export default App;
