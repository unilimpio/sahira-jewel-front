import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Logout from "./components/Logout";

import Register from "./components/Register";
import Home from "./components/Home";
import MyCompliance from "./components/MyCompliance";
import MyUserX from "./components/MyUserX";
import UxSurvey from "./components/UxSurvey";



import Profile from "./components/Profile";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const App = () => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  

  /*
  const logOut = () => {
    AuthService.logout();
    //setShowModeratorBoard(false);
    //setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  */

  return (
    
      
    
      <div id="routes" className=" 
          bg-gradient-to-br from-neutral-200 via-white to-neutral-300
        z-10" >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            
            <Route path={"/mycompliance"} element={<MyCompliance />} />
            <Route path={"/myuserx"} element={<MyUserX />} />
            
            <Route path={"/login"} element={<Login />} />
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/UxSurvey"} element={<UxSurvey />} />
            
            
            {/*}
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          */}

          </Routes>
      </div>
       
      
      
      
    
  );
};

export default App;
