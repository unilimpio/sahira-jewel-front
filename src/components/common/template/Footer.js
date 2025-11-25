import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

let linkClass = `text-sahira-green text-[11px] sm:text-sm md:text-base lg:text-lg no-underline hover:text-zinc-500 hover:underline p-2`;

const Footer = () => {

  


  return (
    
      <footer className="fixed w-full z-40 bottom-0 h-9 sm:h-16 md:h-20 lg:h-24 bg-white">
        <div className="flex justify-between w-full bg-sahira-beige ">
          <div className="flex-col m-1">
          <h6 className="m-0 text-sahira-green text-[10px] sm:text-base md:text-lg lg:text-2xl font-light">
            Sahira Jewels Co. ,
          </h6>
          <p className="text-[8px] font-extralight m-0 text-sahira-green">All rights Reserved. &copy; 2025 </p>        
        </div>
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
        
        </div> 
      </footer>
      
   
  );
};

export default Footer;
