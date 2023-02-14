import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed/HomeFeed";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const Settings = lazy(() => import("./components/Settings/Settings"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const LoginPage = lazy(() => import("./components/LoginPage/LoginPage"));
const Friends = lazy(() => import("./components/Friends/Friends"));
const SignUpPage = lazy(() => import("./components/SignUpPage/SignUpPage"));

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Route
            path="/signup"
            element={
              <Suspense>
                <SignUpPage />
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
          <Route
            path="*"
            element={
              <div>
                NO PAGE FOUND<Link to="/"> GO HOME</Link>
              </div>
            }
          />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
