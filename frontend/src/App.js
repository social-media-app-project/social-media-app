import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeFeed from "./components/HomeFeed/HomeFeed";
import Profile from "./components/Profile/Profile";
import Friends from "./components/Friends/Friends";
import Settings from "./components/Settings/Settings";
import React from "react";

function App() {
  const user = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<MainPage />}>
          <Route
            path="/"
            element={user ? <HomeFeed /> : <Navigate to="/login" />}
          />
          <Route
            path=":userId"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path=":userId/friends"
            element={user ? <Friends /> : <Navigate to="/login" />}
          />
          <Route
            path="friends"
            element={user ? <Friends /> : <Navigate to="/login" />}
          />
          <Route
            path="settings"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
