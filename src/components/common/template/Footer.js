import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import logoUni from '../../../logo-unilimpio.svg';


//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

let linkClass = `text-zinc-600 text-[11px] sm:text-sm md:text-base lg:text-lg no-underline hover:text-zinc-900 hover:underline p-2`;

const Footer = () => {

  


  return (
    
      <footer className="fixed w-full flex justify-between z-40 bottom-0 right-0 bg-neutral-300 h-12 sm:h-16 md:h-20 lg:h-24">
        
          <p className="p-2 text-zinc-800 text-sm sm:text-base md:text-lg lg:text-2xl font-light">
            Sahira Jewels CO. ,<br/> <span className="text-[9px] font-extralight mb-2">All rights Reserved. 2025 </span>
          </p>        
        
        <div className="grow  ">  
          <div className="flex justify-end">
             <Link to={"/home"} className={` `+ linkClass}>
                          Politica de Privacidad
             </Link>
             <Link to={"/home"} className={` `+ linkClass}>
                          Politica de Entrega
             </Link>
          </div>
        </div>  
        
         
      </footer>
      
   
  );
};

export default Footer;
