import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const Footer = () => {

  


  return (
    
      <footer className="mb-12 p-2 md:bg-slate-700 md:shadow-md h-fit rounded-b-md ">
        <p className="text-zinc-800 md:text-white text-xs font-light">
          &copy;Unilimpio S.A. 2024 - All rights reserved.
        </p>
        
      </footer>
      
   
  );
};

export default Footer;
