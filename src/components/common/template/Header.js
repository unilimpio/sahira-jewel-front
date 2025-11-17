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
import CartButton from "../Cart";
import WishlistButton from "../WishlistComponent";

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
    
      <header  className={`sticky top-0 z-40`}>
        <div className="flex place-content-between drop-shadow-md rounded-md bg-neutral-100            
            bg-opacity-75 h-fit">
        
          <Link to={"/"} className="hover:no-underline ">
            <Logo className={"w-36 sm:w-42 md:w-64"}/>
          </Link>
          <div className=" flex-col w-1/2 place-content-start justify-items-end ">
            <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 -z-50 justify-end">
                    
                          
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
            <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 -z-50 justify-end">
                    
                          
                
                <CartButton className={"transition hover:-translate-y-2 mx-1"} iconClassName={"w-8 h-8 fill-zinc-600  "}/>
                <WishlistButton className={"transition hover:-translate-y-2 mx-1"} iconClassName={"w-8 h-8 stroke-zinc-600 hover:fill-red-400"}/>
                
            
            </nav>

          </div>
        </div>

        <div id="mobile-top-menu" className="absolute top-2 right-2 visible sm:hidden place-content-center">
          <nav className="flex flex-row justify-center ">                      
              <CartButton className={"transition hover:-translate-y-1 p-1"} iconClassName={"w-6 h-6 fill-zinc-600   "}/>
              <WishlistButton className={"transition hover:-translate-y-1 p-1"} iconClassName={"w-6 h-6 stroke-zinc-600 hover:fill-red-400"}/>
                      {
                        hamIsOpen ? (
                          <CloseButton iconClassName={`w-6 h-6 fill-zinc-600 ${hamIsOpen ? ('') : ('')}`} buttonClassName={`transition delay-150 ${hamIsOpen ? ('') : ('')}`}/>
                        ) : (
                          <HamburguerButton iconClassName={`w-6 h-6 stroke-zinc-600 ${hamIsOpen ? ('') : ('')}`} buttonClassName={`transition delay-150 ${hamIsOpen ? ('') : ('')}`}/>
                        )

                      }

          </nav>
          {
            hamIsOpen && (
              <div id="mobile-drawer-open" className={`fixed top-16 right-0 w-screen h-96 z-30  ${hamIsOpen ? ('opacity-100'):('opacity-0')}`}>
                
                <div className={`flex bg-white rounded-md border border-zinc-600 shadow-md `}>
                  
                  <nav className="flex flex-col mx-auto">
                  
                        
                      <Link to={"/about"} className={` `+ linkDrawerClass}>
                        Our Story
                      </Link>
                      <Link to={"/contact"} className={` `+ linkDrawerClass}>
                        Contact
                      </Link>
                      {isLoggedIn ? (
                    
                                                                  
                          <Link to={"/logout"} className={` `+linkDrawerClass}>
                            <LogoutIcon/>
                            Logout
                          </Link>
                      
                         
                      ) : (
                      
                      
                          <Link to={"/login"} className={` `+linkDrawerClass}>
                            <LoginIcon iconClassName={"w-6 h-6 fill-lime-600"} textClassName={"text-center text-zinc-600"} > Login </LoginIcon>
                          
                          </Link>
                        
                        
                      )}
                              
                  </nav>
                      
                </div>
              </div>
              
            ) 

          }              

        </div>
        
        
        
      </header> 
    
     
  );
};

export default Header;
