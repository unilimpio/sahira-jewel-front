import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

let linkClass = ` align-text-bottom text-zinc-400 font-extralight text-[9px] sm:text-xs   hover:text-black px-2`;

const Footer = () => {

  const year = new Date().getFullYear();
 
  



  return (
    
      <footer className=" w-full flex-col z-40  bg-white content-end mb-24 sm:mb-0">
        <div className="flex justify-between w-full   m-0 p-0">
          <div className="flex-col content-end  p-0 -mb-3 ml-4">
            <h6 className=" text-black font-light  text-[9px] sm:text-base  ">
              Sahira Jewels Co. ,
                  
            </h6>
            <p className="text-[7px] font-extralight  text-zinc-600 -mt-2">All rights Reserved. &copy; {year} </p>
                
          </div>
        <div className="grow content-end ">  
          <div className="flex justify-end mb-1 mr-2 ">
             <Link to={"/privacy"} className={` `+ linkClass}>
                          Politica de Privacidad
             </Link>
             <Link to={"/delivery"} className={` `+ linkClass}>
                          Politica de Entrega
             </Link>
          </div>
        </div>  
        
        </div> 
        <div className="text-center text-xs text-zinc-600 font-light my-2">
          Made with ❤️ in Ecuador.  
        </div>
      </footer>
      
   
  );
};

export default Footer;
