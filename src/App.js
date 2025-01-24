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
import Logo from "./components/common/Logo";



import Profile from "./components/Profile";

import logoUni from './logo-unilimpio.svg';



//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const App = () => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
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

  /*
  const logOut = () => {
    AuthService.logout();
    //setShowModeratorBoard(false);
    //setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  */

  return (
    <div className="m-1">
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
        <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 justify-evenly">
                
          

          
          
            <Link to={"/home"} className="m-1 md:mx-4 text-slate-800 hover:text-white md:text-lg lg:text-xl">
              Home
            </Link>
          
                    
            {currentUser ? (
          
              <> 
                <Link to={"/mycompliance"} className="m-1 text-slate-800 hover:text-white md:text-lg lg:text-xl">
                  My Compliance Mx
                </Link>
                <Link to={"/myuserx"} className="m-1 text-slate-800 hover:text-white md:text-lg lg:text-xl">
                  My User Xp
                </Link>

                <Link to={"/profile"} className="m-1 text-slate-800 hover:text-white md:text-lg lg:text-xl">
                  Mi Perfil
                </Link>
              
                {/*
                <li className="nav-item">
                  <a href="/logout" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>


              */}
              
                <Link to={"/logout"} className="m-1 text-slate-800 hover:text-white md:text-lg lg:text-xl">
                  Logout
                </Link>
            

              </>  
            ) : (
              <>
            
                <Link to={"/login"} className="m-1 text-slate-800 hover:text-white md:text-lg lg:text-xl">
                  Login
                </Link>
              

              
                <Link to={"/register"} className="m-1 text-slate-800 hover:text-white md:text-lg lg:text-xl">
                  Sign Up
                </Link>
            
              </>
            )}
        
          
        
        </nav>
        <div className="flex flex-col w-10 h-10">
          <span className="text-white text-xs font-thin mb-1">
            por:
          </span>
          <img src={logoUni} alt="logo Unilimpio" className="  z-30 mr-2" />
        </div>
        
      </header>
    
      <div id="routes" className=" border border-slate-600 
        h-fit p-2 bg-gradient-to-br from-white to-neutral-200
        rounded-b-md sm:rounded-none z-10" >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            
            <Route path={"/mycompliance"} element={<MyCompliance />} />
            <Route path={"/myuserx"} element={<MyUserX />} />
            
            <Route path={"/login"} element={<Login />} />
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/profile"} element={<Profile />} />
            
            
            
            {/*}
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          */}

          </Routes>
      </div>
       
      <nav id="responsive-bottom-nav" 
            className="container w-full content-start h-16 bg-slate-700 sm:hidden fixed bottom-0 left-0 z-20 ">

          <div className="flex flex-row justify-between font-extralight ">
            
              <Link to={"/home"} className="m-1 hover:text-slate-800 text-white">
                Home
              </Link>
            
            
              
            
              {currentUser ? (
            
                <>
                  <Link to={"/mycompliance"} className="m-1 hover:text-slate-800 text-white">
                    My Compliance
                  </Link>
                  <Link to={"/myuserx"} className="m-1 hover:text-slate-800 text-white">
                    My UX
                  </Link>
                  <Link to={"/profile"} className="m-1 hover:text-slate-800 text-white">
                    Mi Perfil
                  </Link>
                
                  {/*
                  <li className="nav-item">
                    <a href="/logout" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>


                */}
                
                  <Link to={"/logout"} className="m-1 hover:text-slate-800 text-white">
                    Logout
                  </Link>
              

                </>  
              ) : (
                <>
              
                  <Link to={"/login"} className="m-1 hover:text-slate-800 text-white">
                    Login
                  </Link>
                

                
                  <Link to={"/register"} className="m-1 hover:text-slate-800 text-white">
                    Sign Up
                  </Link>
              
                </>
              )}
          
          </div>
      </nav>
      <footer className="mb-12 p-2 sm:bg-slate-700 h-[10vh] rounded-b-md ">
        <p className="text-zinc-800 sm:text-white text-xs font-light">
          &copy;Unilimpio S.A. 2024 - All rights reserved.
        </p>
        
      </footer>
      
    </div>
  );
};

export default App;
