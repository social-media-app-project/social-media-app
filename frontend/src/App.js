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
import { React, useEffect, useState } from "react";
import Cookies from "universal-cookie";

function App() {
  const [userAuth, setuserAuth] = useState(false);
  // const cookies = new Cookies();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if(token === null){
    //   setuserAuth(false);
    // }
    // if(token !== null){
    //   const expireDate = localStorage.getItem('expires');
    //   if(expireDate>Date.now()){
    //     setuserAuth(true);
    //   }else{
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('expires')
    //     setuserAuth(false);
    //   }
    // }

    const getUser = async () => {
      try {
        let response = await fetch("http://localhost:3002/auth/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:3002",
          },
        });
        let sessionJSON;
        if (response.status === 200) {
          setuserAuth(true);
          sessionJSON = await response.json();
          console.log(sessionJSON);
        } else {
          setuserAuth(false);
          throw new Error("auth error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userAuth]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={userAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={userAuth ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route element={<MainPage />}>
          <Route
            path="/"
            element={userAuth ? <HomeFeed /> : <Navigate to="/login" />}
          />
          <Route
            path=":userId"
            element={userAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={userAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path=":userAuthId/friends"
            element={userAuth ? <Friends /> : <Navigate to="/login" />}
          />
          <Route
            path="friends"
            element={userAuth ? <Friends /> : <Navigate to="/login" />}
          />
          <Route
            path="settings"
            element={userAuth ? <Settings /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
