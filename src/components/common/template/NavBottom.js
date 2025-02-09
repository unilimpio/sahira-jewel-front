import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";
import HomeIcon from "../template/icons/HomeIcon"
import ComplianceIcon from "../template/icons/ComplianceIcon"
import UxIcon from "../template/icons/UxIcon"
import UserIcon from "../template/icons/UserIcon"
import LogoutIcon from "../template/icons/LogoutIcon"
import LoginIcon from "../template/icons/LoginIcon"
import SignupIcon from "../template/icons/SignupIcon"


const NavBottom = ({isLoggedIn}) => {

  const linkClass = `m-1 hover:text-slate-800 text-white text-center`;

  return (
       
      <nav id="responsive-bottom-nav" 
            className="w-full content-start h-20 bg-gradient-to-b from-slate-500 to-slate-800 md:hidden fixed bottom-0 left-0 z-20 px-4">

          <div className="flex flex-row justify-between font-light text-xs ">
            
              <Link to={"/home"} className={` `+linkClass}>
                <HomeIcon/>
                Home
              </Link>
            
              {isLoggedIn ? (
            
                <>
                  <Link to={"/mycompliance"} className={` `+linkClass}>
                    <ComplianceIcon/>
                    Compliance
                  </Link>
                  <Link to={"/myuserx"} className={` `+linkClass}>
                    <UxIcon/>
                    UX
                  </Link>
                  <Link to={"/profile"} className={` `+linkClass}>
                  <UserIcon/>
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
                    <LogoutIcon/>
                    Logout
                  </Link>
              

                </>  
              ) : (
                <>
              
                  <Link to={"/login"} className={` `+linkClass}>
                    <LoginIcon/>
                    Login
                  </Link>
                

                
                  <Link to={"/register"} className={` `+linkClass}>
                    <SignupIcon/>
                    Sign Up
                  </Link>
              
                </>
              )}
          
          </div>
      </nav>
      
      
    
  );
};

export default NavBottom;
