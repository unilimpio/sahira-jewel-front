import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";


export default function Home () {
  
  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();  


  if (!user ){
     localStorage.removeItem("user");
  } 
  
    return (
    
      <div className="container">
        
          <h4 className="text-zinc-600">Bienvenido, 
            {user &&
              <span>{user.fullname}</span>
            }
          </h4>
          {user 
              
            ? <p className="text-zinc-600">Ver <Link to="/campanas" >campañas</Link> disponibles.</p>
            : <p className="text-zinc-600">Para empezar, <Link to="/login" >ingrese a su cuenta.</Link></p>
           
           }
          
           
      
        
      </div>
    ); 

    
  
  
};


