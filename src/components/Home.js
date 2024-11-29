import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import AuthService from "../services/auth.service";


export default function Home () {
  
  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();  


  if (!user ){
     localStorage.removeItem("user");
  } 
  
    return (
    
      <div className="container mx-auto py-2 mb-10">
        
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Bienvenido, 
            {user &&
              <span>{user.fullname}</span>
            }
          </h1>
          {user 
              
            ? <p className="text-zinc-600">Ver <Link to="/myevals" className="text-cyan-600 hover:text-slate-600">Mis evaluaciones</Link> disponibles.</p>
            : <p className="text-zinc-600">Para empezar, <Link to="/login" >ingrese a su cuenta.</Link></p>
           
           }
          
           
      
        
      </div>
    ); 

    
  
  
};


