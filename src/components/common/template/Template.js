import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";

import Logo from "../Logo";

import NavBottom from "./NavBottom";
import Header from "./Header";
import Footer from "./Footer";


import logoUni from '../../../logo-unilimpio.svg';

const user = AuthService.getCurrentUser();
//const cart = UserService.getCart();


//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const Template = ({message, cart, setCart, deleteCourseFromCartFunction, totalAmountCalculationFunction, addCourseToCartFunction, children}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  


  useEffect(() => {
    
    

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    
    }

   
  }, []);

 

  return (
    
  <div className="relative ">

    <Header  isLoggedIn={isLoggedIn} />
    
   

    <div id="main" className="bg-white min-h-screen dark:bg-slate-900 ">
      {children}
    </div>

    <NavBottom isLoggedIn={isLoggedIn} user={user}/>
    <Footer />
    
  </div>
    
     
  );
};

export default Template;
