import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import AuthService from "../../../services/auth.service";


import Logo from "../Logo";

import NavBottom from "./NavBottom";
import Header from "./Header";
import Footer from "./Footer";


import logoUni from '../../../logo-unilimpio.svg';



//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const Template = ({children}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  

  useEffect(() => {
    
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    //  setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
    //  setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    /*
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
    */
  }, []);

 

  return (
    
  <div className="lg:container  mx-auto ">

    <Header isLoggedIn={isLoggedIn}/>

    <div id="main" className="bg-white dark:bg-slate-900 p-4 md:p-12 lg:p-18 mb-20">
      {children}
    </div>

    <NavBottom isLoggedIn={isLoggedIn}/>
    <Footer />
    
  </div>
    
     
  );
};

export default Template;
