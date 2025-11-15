import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import LogoutIcon from "../template/icons/LogoutIcon"
import LoginIcon from "../template/icons/LoginIcon"
import HamburguerIcon from "../template/icons/HamburguerIcon"
import CloseIcon from "../template/icons/CloseIcon"


import AuthService from "../../../services/auth.service";


import Logo from "../Logo";


const user = AuthService.getCurrentUser();

const Header = ({isLoggedIn}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  

  const linkClassIcons = `p-2 md:mx-4 text-slate-800 hover:text-white sm:text-xs md:text-lg lg:text-lg hover:-translate-y-1 hover:transition`;
  const linkClass = `p-3 text-zinc-600 no-underline hover:text-zinc-800 hover:underline text-sm sm:text-md md:text-lg lg:text-xl `;
  const linkDrawerClass = `p-3 text-zinc-600 no-underline hover:text-zinc-800 hover:underline text-lg  `;

  const [hamIsOpen,setHamIsOpen] = useState(false);

  const HamburguerButton=({iconClassName,buttonClassName})=>{

    function handleClick(){

      setHamIsOpen(true);
      
    }

    return(
      
        <button  
          className={`p-2 ${buttonClassName}`} 
          onClick={handleClick}>
            <HamburguerIcon className={iconClassName}/>
        </button>
      
    );
  }

  const CloseButton=({iconClassName,buttonClassName})=>{

    function handleClick(){

      setHamIsOpen(false);
      
    }

    return(
      
        <button  
          className={`p-2 ${buttonClassName}`} 
          onClick={handleClick}>
            <CloseIcon className={iconClassName}/>
        </button>
      
    );
  }

  return (
    
      <header  
        className={
          `
            flex sticky top-0 z-20
            place-content-between
            bg-stone-400
            rounded-md

            bg-opacity-50 
         
          
          `
          
        }
        
        >
        
        <Link to={"/"} className="hover:no-underline ">
          <Logo />
        </Link>
        <div className=" flex-col w-1/2 place-content-start justify-items-end collapse sm:visible ">
          <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 justify-end">
                  
                        
              <Link to={"/about"} className={` `+ linkClass}>
                About
              </Link>
              <Link to={"/contact"} className={` `+ linkClass}>
                Contact
              </Link>
               {isLoggedIn ? (
            
                <> 
                                  
                  <Link to={"/logout"} className={` `+linkClass}>
                    <LogoutIcon/>
                    Logout
                  </Link>
              
                </>  
              ) : (
                <>
              
                  <Link to={"/login"} className={` `+linkClass}>
                    <LoginIcon iconClassName={"w-6 h-6 fill-lime-600"} textClassName={"text-center text-zinc-600"} > Login </LoginIcon>
                   
                  </Link>
                
                </>
              )}
                      
          </nav>
          <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 justify-end">
                  
                        
              <Link to={"/cart"} className={` `+ linkClassIcons}>
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 fill-zinc-600  ">
                  <path fill="fill-inherit" fillRule="evenodd" clipRule="evenodd" d="M16.5285 6C16.5098 5.9193 16.4904 5.83842 16.4701 5.75746C16.2061 4.70138 15.7904 3.55383 15.1125 2.65C14.4135 1.71802 13.3929 1 12 1C10.6071 1 9.58648 1.71802 8.88749 2.65C8.20962 3.55383 7.79387 4.70138 7.52985 5.75747C7.50961 5.83842 7.49016 5.9193 7.47145 6H5.8711C4.29171 6 2.98281 7.22455 2.87775 8.80044L2.14441 19.8004C2.02898 21.532 3.40238 23 5.13777 23H18.8622C20.5976 23 21.971 21.532 21.8556 19.8004L21.1222 8.80044C21.0172 7.22455 19.7083 6 18.1289 6H16.5285ZM8 11C8.57298 11 8.99806 10.5684 9.00001 9.99817C9.00016 9.97438 9.00044 9.9506 9.00084 9.92682C9.00172 9.87413 9.00351 9.79455 9.00718 9.69194C9.01451 9.48652 9.0293 9.18999 9.05905 8.83304C9.08015 8.57976 9.10858 8.29862 9.14674 8H14.8533C14.8914 8.29862 14.9198 8.57976 14.941 8.83305C14.9707 9.18999 14.9855 9.48652 14.9928 9.69194C14.9965 9.79455 14.9983 9.87413 14.9992 9.92682C14.9996 9.95134 14.9999 9.97587 15 10.0004C15 10.0004 15 11 16 11C17 11 17 9.99866 17 9.99866C16.9999 9.9636 16.9995 9.92854 16.9989 9.89349C16.9978 9.829 16.9957 9.7367 16.9915 9.62056C16.9833 9.38848 16.9668 9.06001 16.934 8.66695C16.917 8.46202 16.8953 8.23812 16.8679 8H18.1289C18.6554 8 19.0917 8.40818 19.1267 8.93348L19.86 19.9335C19.8985 20.5107 19.4407 21 18.8622 21H5.13777C4.55931 21 4.10151 20.5107 4.13998 19.9335L4.87332 8.93348C4.90834 8.40818 5.34464 8 5.8711 8H7.13208C7.10465 8.23812 7.08303 8.46202 7.06595 8.66696C7.0332 9.06001 7.01674 9.38848 7.00845 9.62056C7.0043 9.7367 7.00219 9.829 7.00112 9.89349C7.00054 9.92785 7.00011 9.96221 7 9.99658C6.99924 10.5672 7.42833 11 8 11ZM9.53352 6H14.4665C14.2353 5.15322 13.921 4.39466 13.5125 3.85C13.0865 3.28198 12.6071 3 12 3C11.3929 3 10.9135 3.28198 10.4875 3.85C10.079 4.39466 9.76472 5.15322 9.53352 6Z" />
                </svg> 
              </Link>
              <Link to={"/wishlist"} className={` `+ linkClassIcons}>
                <svg viewBox="0 0 64 64" 
                      strokeWidth="4"                      
                      fill="none"
                      className="w-8 h-8 stroke-zinc-600 hover:fill-red-400"
                      >
                  <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"/>
                </svg>
              </Link>
          
          </nav>

        </div>
        <div id="mobile-menu-drawer" className="visible sm:hidden m-12">

          {
            hamIsOpen ? (
              <>
                
                <div className={`fixed flex flex-col top-0 right-0 bg-white w-2/3 h-screen rounded-lg border border-zinc-300 ${hamIsOpen ? ('bg-opacity-75'):('hidden')}`}>
                  <CloseButton iconClassName={"w-8 h-8"} buttonClassName={""}/>
                  <nav className="flex flex-row  items-center justify-center">
                  
                        
                      <Link to={"/cart"} className={` `+ linkClassIcons}>
                        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 fill-zinc-600  ">
                          <path fill="fill-inherit" fillRule="evenodd" clipRule="evenodd" d="M16.5285 6C16.5098 5.9193 16.4904 5.83842 16.4701 5.75746C16.2061 4.70138 15.7904 3.55383 15.1125 2.65C14.4135 1.71802 13.3929 1 12 1C10.6071 1 9.58648 1.71802 8.88749 2.65C8.20962 3.55383 7.79387 4.70138 7.52985 5.75747C7.50961 5.83842 7.49016 5.9193 7.47145 6H5.8711C4.29171 6 2.98281 7.22455 2.87775 8.80044L2.14441 19.8004C2.02898 21.532 3.40238 23 5.13777 23H18.8622C20.5976 23 21.971 21.532 21.8556 19.8004L21.1222 8.80044C21.0172 7.22455 19.7083 6 18.1289 6H16.5285ZM8 11C8.57298 11 8.99806 10.5684 9.00001 9.99817C9.00016 9.97438 9.00044 9.9506 9.00084 9.92682C9.00172 9.87413 9.00351 9.79455 9.00718 9.69194C9.01451 9.48652 9.0293 9.18999 9.05905 8.83304C9.08015 8.57976 9.10858 8.29862 9.14674 8H14.8533C14.8914 8.29862 14.9198 8.57976 14.941 8.83305C14.9707 9.18999 14.9855 9.48652 14.9928 9.69194C14.9965 9.79455 14.9983 9.87413 14.9992 9.92682C14.9996 9.95134 14.9999 9.97587 15 10.0004C15 10.0004 15 11 16 11C17 11 17 9.99866 17 9.99866C16.9999 9.9636 16.9995 9.92854 16.9989 9.89349C16.9978 9.829 16.9957 9.7367 16.9915 9.62056C16.9833 9.38848 16.9668 9.06001 16.934 8.66695C16.917 8.46202 16.8953 8.23812 16.8679 8H18.1289C18.6554 8 19.0917 8.40818 19.1267 8.93348L19.86 19.9335C19.8985 20.5107 19.4407 21 18.8622 21H5.13777C4.55931 21 4.10151 20.5107 4.13998 19.9335L4.87332 8.93348C4.90834 8.40818 5.34464 8 5.8711 8H7.13208C7.10465 8.23812 7.08303 8.46202 7.06595 8.66696C7.0332 9.06001 7.01674 9.38848 7.00845 9.62056C7.0043 9.7367 7.00219 9.829 7.00112 9.89349C7.00054 9.92785 7.00011 9.96221 7 9.99658C6.99924 10.5672 7.42833 11 8 11ZM9.53352 6H14.4665C14.2353 5.15322 13.921 4.39466 13.5125 3.85C13.0865 3.28198 12.6071 3 12 3C11.3929 3 10.9135 3.28198 10.4875 3.85C10.079 4.39466 9.76472 5.15322 9.53352 6Z" />
                        </svg> 
                      </Link>
                      <Link to={"/wishlist"} className={` `+ linkClassIcons}>
                        <svg viewBox="0 0 64 64" 
                              strokeWidth="4"                      
                              fill="none"
                              className="w-8 h-8 stroke-zinc-600 hover:fill-red-400"
                              >
                          <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"/>
                        </svg>
                      </Link>
                  
                  </nav>
                  <nav className="flex flex-col items-center justify-center">
                  
                        
                      <Link to={"/about"} className={` `+ linkDrawerClass}>
                        About
                      </Link>
                      <Link to={"/contact"} className={` `+ linkDrawerClass}>
                        Contact
                      </Link>
                      {isLoggedIn ? (
                    
                        <> 
                                          
                          <Link to={"/logout"} className={` `+linkDrawerClass}>
                            <LogoutIcon/>
                            Logout
                          </Link>
                      
                        </>  
                      ) : (
                        <>
                      
                          <Link to={"/login"} className={` `+linkDrawerClass}>
                            <LoginIcon iconClassName={"w-6 h-6 fill-lime-600"} textClassName={"text-center text-zinc-600"} > Login </LoginIcon>
                          
                          </Link>
                        
                        </>
                      )}
                              
                  </nav>

                </div>
              </>
              
            ) : (
              
              <HamburguerButton iconClassName={"w-8 h-8"} buttonClassName={""}/>
              
            )

          }
              

        </div>
        
        
        
      </header> 
    
     
  );
};

export default Header;
