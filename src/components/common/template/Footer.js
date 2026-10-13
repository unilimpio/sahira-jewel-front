import React  from "react";
import {  Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import InstagramIcon from "./icons/InstagramIcon";

import WhatsAppConcierge from "../WhatsAppConcierge";


//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

let linkClass = ` align-text-bottom text-zinc-600 font-extralight  text-[9px] sm:text-xs hover:text-zinc-600 hover:no-underline px-2 `;

const Footer = () => {

  const year = new Date().getFullYear();
 
  



  return (
    
      <footer className=" w-full flex-col z-40  bg-white content-end mb-24 sm:mb-0">
        <div className="mx-auto w-[85vw] sm:w-full mt-24 mb-20   md:mb-44">
              <div className="flex flex-col justify-center items-center">
                <h2 className={'text-center font-light text-zinc-400 text-4xl my-8'}>For personalized guidance, our jewelry concierge is at your service.</h2>
                <WhatsAppConcierge className="w-fit "/>
              </div>
              <div className="flex flex-col">
                <h2 className={'text-center font-light text-zinc-400 text-4xl my-8'}>Follow Us</h2>
                <a href={'https://www.instagram.com/sahirajewelry.ec'} className={'text-center text-4xl'}>
                  <InstagramIcon className={'transition-all  hover:scale-110 delay-75'} 
                  iconClassName={'w-10 h-10 mx-auto stroke-zinc-400 fill-none stroke-1'} />
                </a>
              </div>

        </div> 
        <div className="text-center text-xs text-zinc-600 font-light my-2">
          Made with ❤️ in Ecuador.  
        </div>
        <div className="flex justify-between w-full   m-0 p-0 ">
          <div className="flex-col content-end  p-0 -mb-3 ml-4 ">
            <h6 className="  font-light  text-[9px] sm:text-base text-zinc-600  ">
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
        
        {/* 2. Tiny invisible sentinel element at the absolute bottom */}
      
      </footer>

      
   
  );
};

export default Footer;
