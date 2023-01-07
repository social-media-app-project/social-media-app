import React, { Suspense, lazy } from "react";

import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed/HomeFeed";
const Settings = lazy(() => import("./components/Settings/Settings"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const LoginPage = lazy(() => import("./components/LoginPage/LoginPage"));
const Friends = lazy(() => import("./components/Friends/Friends"));
// import Settings from "./components/Settings/Settings";
// import Friends from "./components/Friends/Friends";
// import LoginPage from "./components/LoginPage/LoginPage";
// import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense>
              <LoginPage />
            </Suspense>
          }
        />
        <Route element={<MainPage />}>
          <Route path="/" element={<HomeFeed />} />
          <Route
            path=":userId"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path=":userId/friends"
            element={
              <Suspense>
                <Friends />
              </Suspense>
            }
          />
          <Route
            path="friends"
            element={
              <Suspense>
                <Friends />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense>
                <Settings />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
