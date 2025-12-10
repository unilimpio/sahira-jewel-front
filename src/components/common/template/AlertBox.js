import React, { useState } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const AlertBox = ({message, setMessage, divClassName}) => {





  return (

    <div className={`fixed top-20 sm:top-36 w-11/12 z-50 opacity-75 ${divClassName}`}>
                <div className={`alert ${message.includes('error') ?('alert-danger'):('alert-info')}  alert-dismissible`} role="alert">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={(event)=>{event.preventDefault(); setMessage(false)}}></button>
                  {message}
                </div>
    </div>

  );
  
};

export default AlertBox;
