import React from "react";
import {  Link, NavLink } from "react-router";
 //import { NavLink } from 'react-router-dom';

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
import TasksIcon from "./icons/TasksIcon";


const NavBottom = ({isLoggedIn}) => {
  //HERE YOU CAN CHANGE THE ICONS AND LINKS COLORS AND HOVERS
const linkClass = `m-1 hover:text-slate-600 focus:text-slate-400 text-blue-500 text-center drop-shadow-sm`;
const linkClassActive = `m-1  text-slate-400 text-center drop-shadow-md`;

  return (
       
      <nav id="responsive-bottom-nav" 
            className="w-full mt-4 mb-3 content-start h-20 bg-gradient-to-b from-neutral-200 to-neutral-200 via-white  md:hidden fixed bottom-2 left-0 z-30 px-4 shadow-lg">

          <div className="flex flex-row justify-between font-light text-xs ">
            
              <NavLink to={"/home"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <HomeIcon/>
                Home
              </NavLink>
            
              {isLoggedIn ? (
            
                <>
                  <NavLink to={"/mycompliance"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                    <ComplianceIcon/>
                    Compliance
                  </NavLink>
                  <NavLink to={"/myuserx"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                    <UxIcon/>
                    UX
                  </NavLink>
                  <NavLink to={"/mytasks"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                    <TasksIcon/>
                    Tasks
                  </NavLink>
                  <NavLink to={"/profile"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                  <UserIcon/>
                    Mi Perfil
                  </NavLink>
                
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
                

                
                  
              
                </>
              )}
          
          </div>
      </nav>
      
      
    
  );
};

export default NavBottom;
