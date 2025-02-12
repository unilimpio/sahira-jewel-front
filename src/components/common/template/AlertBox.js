import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const AlertBox = ({message, type = 'info'}) => {

  const [isVisible,setIsVisible] = useState(true);
  
  const CloseButton = () => {

    

    function handleClick (){
    
      console.log("toggle visibility: "+!isVisible)
      setIsVisible(!isVisible);
      
    
    }
  
    return (     


      <button  
              type="button"
              className={
                `
                  
                  hover:text-zinc-400
                  text-zinc-300
                `
              } 
              
              onClick={handleClick}
              >
        
        <span className="font-semibold ">x</span>
          
      </button>

    );
  } 

  console.log(type);
  console.log(message);

if(type === 'info' && isVisible){

  return (
    
    <div className={``+isVisible ? (``) : (` hidden`) }>
      <div className={`alert alert-info `} 
        role="alert">
          <div className={`flex flex-row justify-between`}>
            {message} <CloseButton />
          </div>
      </div>
    </div>
      
   
  );

}
if(type === 'error' && isVisible){

  return (
    
    <div className={``+ isVisible ? (``) : (` hidden`) }>
      <div className={`alert alert-danger`} 
        role="alert">
          <div className={`flex flex-row justify-between`}>
            {message} <CloseButton />
            </div>
      </div>
    </div>
      
   
  );

}
  
};

export default AlertBox;
