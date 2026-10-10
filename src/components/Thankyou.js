import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, Link  } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Template from "./common/template/Template";

import { useParams } from 'react-router';

 const user = AuthService.getCurrentUser();

 
const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;


 function usePersistedState(key, defaultValue) {
   const [state, setState] = useState(() => {
     const storedValue = localStorage.getItem(key);
     return storedValue ? JSON.parse(storedValue) : defaultValue;
   });
 
   useEffect(() => {
     localStorage.setItem(key, JSON.stringify(state));
   }, [key, state]);
 
   return [state, setState];
 }
 
 
const Thankyou = () => {

   const { orderId } = useParams();
  
  const wrapperClass = `max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide `;

  const navigate = useNavigate();




  return (
    <Template >
      <div className={` ${wrapperClass} `}>
        {/* Page Header */}
        <header className="border-b border-zinc-100 pt-8 pb-4 ">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            THANK YOU!
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
            Your Order ID:{orderId} has been Received succesfully and is being processed!
          </p>
          <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-light">
            YOu should receive a confirmation e-mail soon as well with you order details!
          </p>

          <h2 className="text-[11px] text-zinc-400 uppercase tracking-widest font-light">
            Thank you for shopping with Us! Have a great day!
          </h2>
        </header>

          <div className="flex h-auto flex-col  bg-white ">
                  

                
          </div>
      </div>
      
    </Template>
  );

};

export default Thankyou;
