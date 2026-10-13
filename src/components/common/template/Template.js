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
import WhatsAppConcierge from "../WhatsAppConcierge";

import logoUni from '../../../logo-unilimpio.svg';

const user = AuthService.getCurrentUser();
//const cart = UserService.getCart();


//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const Template = ({message, 
                    cart, setCart,
                    //isCartOpen, setIsCartOpen, 
                    deleteCourseFromCartFunction, totalAmountCalculationFunction, 
                    addCourseToCartFunction, bottomIsVisible, children}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   // ✨ LA SOLUCIÓN: El Template debe gobernar de forma autónoma si el modal está abierto o cerrado
  const [isCartOpen, setIsCartOpen] = useState(false); 


  useEffect(() => {
    
    

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    
    }

   
  }, []);

 

  return (
    
  <div className="relative ">

    <Header  isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
    
   

    <div id="main" className="bg-white min-h-[70vh] dark:bg-slate-900 ">
      {children}
      
    </div>
    <Footer />
    <NavBottom isLoggedIn={isLoggedIn} user={user}/>
    <WhatsAppConcierge className="fixed bottom-28 lg:bottom-32 right-6 lg:right-8 isVisible " isVisible={bottomIsVisible}/>
    
  </div>
    
     
  );
};

export default Template;
