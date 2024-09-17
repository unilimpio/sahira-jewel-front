import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo_clean_verify.png"
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Logout from "./components/Logout";

import Register from "./components/Register";
import Home from "./components/Home";
import Evals from "./components/Evals";

import Profile from "./components/Profile";

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
    <div className="container mx-auto pt-3">
      <header className="container bg-gradient-to-tr from-sky-600 to-white border-1 rounded-t-md border-slate-700">
      <nav className="flex flex-col sm:flex-row w-full   ">
        <div className=" flex flex-nowrap relative mx-2 grow-0">
            {/*<img src={logo} alt="CLEANVerif Compliance Verification App." 
                className=" sm:w-20 w-10 mb-2"/>*/}
            <svg viewBox="0 0 509.604 509.604" className="fill-white w-6 h-6 sm:w-7 sm:h-7 md:h-8 md:w-8 mt-2">
                <path d="M34.262,333.282c8.119,6.75,14.793,15.223,14.143,20.988c-0.382,3.443-0.593,6.943-0.593,10.5
                  c0,52.393,41.3,94.861,92.24,94.861c6.292,0,12.431-0.65,18.37-1.885c10.002-2.074,21.812,1.941,28.888,9.793
                  c16.82,18.646,40.803,30.342,67.492,30.342c28.19,0,53.426-13.016,70.342-33.518c6.723-8.146,18.103-11.533,28.22-8.5
                  c8.166,2.447,16.811,3.768,25.751,3.768c50.939,0,92.24-42.477,92.24-94.861c0-5.861-0.535-11.59-1.549-17.145
                  c-1.712-9.371,2.85-21.047,10.471-28.363c18.025-17.289,29.328-41.883,29.328-69.242c0-29.787-13.368-56.323-34.263-73.698
                  c-8.118-6.751-14.793-15.224-14.143-20.99c0.383-3.442,0.593-6.942,0.593-10.5c0-52.393-41.301-94.86-92.24-94.86
                  c-6.292,0-12.431,0.65-18.369,1.884c-10.002,2.075-21.812-1.941-28.889-9.792c-16.82-18.647-40.803-30.342-67.492-30.342
                  c-26.688,0-50.671,11.695-67.492,30.342c-7.076,7.841-18.886,11.867-28.888,9.792c-5.938-1.234-12.078-1.884-18.37-1.884
                  c-50.939,0-92.24,42.477-92.24,94.86c0,5.049,0.392,10.002,1.147,14.832c1.262,8.128-4.447,18.149-12.747,24.681
                  C14.219,201.663,0,228.887,0,259.583C0,289.37,13.368,315.907,34.262,333.282z M131.475,263.016
                  c2.046-3.625,7.268-3.672,12.049,0.479l48.119,33.918c2.61,1.588,5.106,2.4,7.506,2.4c4.963,0,8.893-3.576,12.689-7.02
                  l153.985-154.138c9.629-10.471,18.99-14.162,25.102-10.146c2.82,1.855,4.646,4.647,5.135,7.87
                  c0.583,3.825-0.756,7.946-3.768,11.599l-185.149,224.91c-2.687,3.26-6.11,5.059-9.629,5.059c-4.179,0-7.965-2.516-10.404-6.895
                  l-54.344-97.969C130.519,269.422,130.021,265.618,131.475,263.016z"/>
	          </svg>
            <Link to={"/"} className="m-2 text-white">
              
              <h1 className="font-bolder text-lg md:text-2xl mr-1">
                CLEANVerif<span className="text-xs font-extralight">®</span> 
              </h1>
              
              
            </Link>
            <span className="absolute bottom-0 text-white text-xs md:text-sm font-extralight overline">Compliance Verification App.</span>
        </div>
        
        <div className="w-1/3  sm:w-2/3 content-end ">

          <div className="flex flex-col sm:flex-row">
          
            <Link to={"/home"} className="m-1 text-white">
              Home
            </Link>
          
          
            <Link to={"/evals"} className="m-1 text-white">
              Evaluaciones
            </Link>
          
          
          
          

          
            {currentUser ? (
          
              <>  
                <Link to={"/profile"} className="m-1 text-white">
                  Mi Perfil
                </Link>
              
                {/*
                <li className="nav-item">
                  <a href="/logout" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>


              */}
              
                <Link to={"/logout"} className="m-1 text-white">
                  Logout
                </Link>
            

              </>  
            ) : (
              <>
            
                <Link to={"/login"} className="m-1 text-white">
                  Login
                </Link>
              

              
                <Link to={"/register"} className="m-1 text-white">
                  Sign Up
                </Link>
            
              </>
            )}
        
          </div>
        </div>
      </nav>
    </header>
    
      <div className="border border-1 border-slate-800 
      h-fit p-2 bg-gradient-to-br from-white to-zinc-300" id="routes">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/evals"} element={<Evals />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/logout"} element={<Logout />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/profile"} element={<Profile />} />
          
          
          {/*}
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        */}

        </Routes>
      </div>
      
      <footer className="p-2 bg-slate-700 h-[10vh] rounded-b-md">
        <p className="text-white text-xs font-light">
          &copy;Unilimpio S.A. 2024 - All rights reserved.
        </p>
        
      </footer>
      
    </div>
  );
};

export default App;
