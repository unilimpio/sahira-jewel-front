import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import logoUni from '../../../logo-unilimpio.svg';


//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const Footer = () => {

  


  return (
    
      <footer className="fixed w-full flex justify-between z-40 bottom-0 right-0 bg-slate-800">
        
          <p className="content-end text-sky-900 text-[8px] font-light mb-0 opacity-90">
            &copy;MFC - All rights reserved.
          </p>
        
        
        <div className="w-1/3 p-1 bg-gradient-to-r from-transparent to-sky-600">  
          <div className="flex justify-end ">
            <p className="text-white text-[8px] font-thin text-shadow-lg">
              powered by:
            </p>
            <a href="https://unilimpio.com/"> <img src={logoUni} alt="logo Unilimpio" className="z-30 w-8 h-8 sm:w-12 sm:h-12 " /></a>
          </div>
        </div>  
        


        
         
      </footer>
      
   
  );
};

export default Footer;
