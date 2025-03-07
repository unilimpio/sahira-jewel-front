import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import AuthService from "../../../services/auth.service";


import Logo from "../Logo";




import logoUni from '../../../logo-unilimpio.svg';



//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";



const Header = ({isLoggedIn}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  

  const linkClass = `m-1 md:mx-4 text-slate-800 hover:text-white sm:text-xs md:text-lg lg:text-lg`;

  /*
  const logOut = () => {
    AuthService.logout();
    //setShowModeratorBoard(false);
    //setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  */

  return (
    
      <header  
        className={
          `
          flex sticky top-1 z-20
          place-content-between
          bg-gradient-to-tl from-sky-600 to-white border 
          rounded-t-md 
          border-slate-800`
          
        }
        
        >
        
        <Link to={"/"} className="hover:no-underline ">
          <Logo mainColor={"white"}/>
        </Link>
        
        <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed md:static -top-20 justify-evenly">
                
          

          
          
            <Link to={"/home"} className={` `+ linkClass}>
              Home
            </Link>
          
                    
            {isLoggedIn ? (
          
              <> 
                <Link to={"/mycompliance"} className={` `+ linkClass}>
                  My Compliance
                </Link>
                <Link to={"/myuserx"} className={` `+ linkClass}>
                  My UX
                </Link>
                <Link to={"/mytasks"} className={` `+ linkClass}>
                  My Tasks
                </Link>

                <Link to={"/profile"} className={` `+ linkClass}>
                  Mi Perfil
                </Link>
              
                {/*
                <li className="nav-item">
                  <a href="/logout" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>


              */}
              
                <Link to={"/logout"} className={` `+ linkClass}>
                  Logout
                </Link>
            

              </>  
            ) : (
              <>
            
                <Link to={"/login"} className={` `+ linkClass}>
                  Login
                </Link>
              

              
                <Link to={"/register"} className={` `+ linkClass}>
                  Sign Up
                </Link>
            
              </>
            )}
        
          
        
        </nav>
        <div className="flex flex-col w-12 h-12">
          <span className="text-white text-xs font-thin mb-1">
            por:
          </span>
          <img src={logoUni} alt="logo Unilimpio" className="  z-30 mr-2" />
        </div>
        
      </header>
    
     
  );
};

export default Header;
