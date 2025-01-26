import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";



const NavBottom = ({isLoggedIn}) => {

  const linkClass = `m-1 hover:text-slate-800 text-white`;

  return (
       
      <nav id="responsive-bottom-nav" 
            className="w-full content-start h-16 bg-slate-700 md:hidden fixed bottom-0 left-0 z-20 px-2">

          <div className="flex flex-row justify-between font-medium text-sm ">
            
              <Link to={"/home"} className={` `+linkClass}>
                Home
              </Link>
            
              {isLoggedIn ? (
            
                <>
                  <Link to={"/mycompliance"} className={` `+linkClass}>
                    My Compliance
                  </Link>
                  <Link to={"/myuserx"} className={` `+linkClass}>
                    My UX
                  </Link>
                  <Link to={"/profile"} className={` `+linkClass}>
                    Mi Perfil
                  </Link>
                
                  {/*
                  <li className="nav-item">
                    <a href="/logout" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>


                */}
                
                  <Link to={"/logout"} className={` `+linkClass}>
                    Logout
                  </Link>
              

                </>  
              ) : (
                <>
              
                  <Link to={"/login"} className={` `+linkClass}>
                    Login
                  </Link>
                

                
                  <Link to={"/register"} className={` `+linkClass}>
                    Sign Up
                  </Link>
              
                </>
              )}
          
          </div>
      </nav>
      
      
    
  );
};

export default NavBottom;
