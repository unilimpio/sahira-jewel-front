import React, { useState } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const AlertBox = ({message, type = 'info', setFlashMessage}) => {

  const [isVisible,setIsVisible] = useState(true);
  
  const CloseButton = () => {

    

    function handleClick (){
    
      console.log("toggle visibility: "+!isVisible)
      setIsVisible(!isVisible);
      setFlashMessage(false)
    
    }
  
    return (     


      <button  
              type="button"
              className={
                ` 
                  absolute top-1 right-2                
                   
                  text-zinc-700
                  
                `
              } 
              
              onClick={handleClick}
              >
        
        <svg className="w-5 h-5 fill-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="fill-inherit" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
          
      </button>

    );
  } 

  console.log(type);
  console.log(message);

if(type === 'info' && isVisible){

  return (
    
    <div className={isVisible ? (`relative `) : (` hidden`) }>
      <div className={`alert  alert-info`} 
        role="alert">
          <div className={`flex flex-row justify-left`}>
            <div className={' content-center'}>
              <svg className={`w-5 h-5  fill-sky-600`} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
            </div>
            
            <p className="m-3 text-left text-xs">
              
              <span className=""> {message}</span> 
            </p>

            
            <CloseButton />
          </div>
      </div>
    </div>
      
   
  );

}

if(type === 'success' && isVisible){

  return (
    
    <div className={``+isVisible ? (``) : (` hidden`) }>
      <div className={`alert  alert-success`} 
        role="alert">
          <div className={`flex flex-row justify-left`}>
            <div className="content-center">
              <svg className="w-5 h-5 fill-lime-600 " viewBox="0 0 1024 1024"  ><path fill="fill-inherit" d="M512 64a448 448 0 110 896 448 448 0 010-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 10-54.336 54.336l126.72 126.72a38.272 38.272 0 0054.336 0l262.4-262.464a38.4 38.4 0 10-54.272-54.336L456.192 600.384z"/></svg>

            </div>
            <p className="m-3 text-left text-xs">              
              <span className=""> {message}</span> 
            </p>
            
            <CloseButton />
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
          <div className={`flex flex-row justify-left`}>
            <div className="content-center">
              <svg className="w-5 h-5" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                
                <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g  fill="#FB2C36" transform="translate(64.000000, 64.000000)">
                        <path d="M192,1.42108547e-14 C298.038672,1.42108547e-14 384,85.961328 384,192 C384,298.038672 298.038672,384 192,384 C85.961328,384 1.42108547e-14,298.038672 1.42108547e-14,192 C1.42108547e-14,85.961328 85.961328,1.42108547e-14 192,1.42108547e-14 Z M273.018158,80.8239578 L192.012,161.83 L111.156702,80.9748073 L80.9868126,111.144697 L161.842,192 L80.9868126,272.855303 L111.156702,303.025193 L192.012,222.17 L273.018158,303.176042 L303.188047,273.006153 L222.182,192 L303.188047,110.993847 L273.018158,80.8239578 Z" id="Combined-Shape">

                          </path>
                    </g>
                </g>
            </svg>
            </div>
            <p className="m-3 text-left text-xs">
              
              <span className="" >{message}</span> 
            </p>
            
            <CloseButton />
          </div>
      </div>
    </div>
      
   
  );

}

if(type === 'warning' && isVisible){

  return (
    
    <div className={``+ isVisible ? (``) : (` hidden`) }>
      <div className={`alert alert-warning`} 
        role="alert">
          <div className={`flex flex-row justify-left`}>
            <div className="content-center">
                <svg className="w-5 h-5 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="17" r="1" fill="#F0B100"/>
                  <path d="M12 10L12 14" stroke="#F0B100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path stroke="#F0B100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z" />
                </svg>
            </div>
            <p className="m-3 text-left text-xs">
              
              <span className="" >{message}</span> 
            </p>
            
            <CloseButton />
          </div>
      </div>
    </div>
      
   
  );

}
  
};

export default AlertBox;
