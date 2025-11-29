import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate, Navigate} from "react-router";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";

const user = AuthService.getCurrentUser();

export default function Wishlist () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-full p-4 mb-4 mx-auto `;

  

  

  
    return (
    

      <Template >

        <div className={`mt-16 `+wrapperClass}>
          
          <h1 className="text-zinc-600 font-serif text-2xl md:text-3xl lg:text-4xl">Wishlist</h1>
          
      
        </div>
      
      
      </Template>
    
    
      
    ); 

};


