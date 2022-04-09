import LoginPage from "./components/login-page/LoginPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/login" component={LoginPage} />
    </Routes>
  </Router>);
}

export default App;
