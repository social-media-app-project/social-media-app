import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed/HomeFeed";
import Profile from "./components/Profile/Profile";
import Friends from "./components/Friends/Friends";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/" element={<MainPage/>} >
        <Route path="" element={<HomeFeed/>} />
        <Route path="*" element={<HomeFeed/>} />
        <Route path="user/:userId" element={<Profile/>} />
        <Route path="user/:userId/friends" element={<Friends/>} />
      </Route>
    </Routes>
  </Router>);
}

export default App;
