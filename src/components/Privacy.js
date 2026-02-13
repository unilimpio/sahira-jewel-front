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
    
      <Template>

      <div className={`  ${wrapperClass}`}>

        
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">We care about your privacy!</h1>
      
        

        {/* Content section */}
        <p className="font-light">This is a privacy statement that we shall never share or use your private information (such as name, email) for any other purpose outsied of your customer reltion with Sahira Jewels, therefore, we might use it to keep you informed about new items(if you accept to receivehtis type of notifications), but we will never share your info such that a third party may use your information for marketing purposes or any other purpose.

        </p>

        
        

        
      </div>
      </Template>
    );

  

    
    

    
  
  
};


