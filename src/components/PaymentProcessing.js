import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//navigate("/login");

import Template from "./common/template/Template";



import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import image1 from '../assets/sj-pulsera-tinku2.jpeg'
import image2 from '../assets/sj-amparito.jpeg'



const wrapperClass = `w-full h-full p-4 mb-4 mx-auto `;

export default function Privacy () {
  
  const user = AuthService.getCurrentUser();

  
    return (
    

      <div className={`  `}>

        
      
        

        {/* Content section */}
        <p className="font-light">
          Opening Payment Gateway...please wait
        </p>

        
        

        
      </div>
     
    );

  

    
    

    
  
  
};


