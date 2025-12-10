import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

let linkClass = ` align-text-bottom text-sahira-green text-[9px] sm:text-sm md:text-base lg:text-lg no-underline hover:text-zinc-500 hover:underline px-2`;

const Footer = () => {

  


  return (
    
      <footer className="fixed w-full z-40 bottom-0  bg-white content-end">
        <div className="flex justify-between w-full   m-0 p-0">
          <div className="flex-col content-end pl-1">
            <h6 className="m-0 text-sahira-green text-[9px] sm:text-base md:text-lg lg:text-2xl font-light">
              Sahira Jewels Co. ,
               <span className="text-[7px] font-extralight m-0 text-sahira-green">All rights Reserved. &copy; 2025 </span>   
            </h6>
                
          </div>
        <div className="grow content-end ">  
          <div className="flex justify-end ">
             <Link to={"/privacy"} className={` `+ linkClass}>
                          Politica de Privacidad
             </Link>
             <Link to={"/delivery"} className={` `+ linkClass}>
                          Politica de Entrega
             </Link>
          </div>
        </div>  
        
        </div> 
      </footer>
      
   
  );
};

export default Footer;
