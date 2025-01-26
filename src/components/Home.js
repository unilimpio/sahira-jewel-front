import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import AuthService from "../services/auth.service";

import Template from "./common/template/Template";


export default function Home () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full mx-auto border border-slate-600 p-2 rounded-b-lg md:rounded-b-none bg-white shadow-md`;

  const user = AuthService.getCurrentUser();  


  if (!user ){
     localStorage.removeItem("user");
  } 
  
    return (
    

      <Template >

        <div className={` `+wrapperClass}>
          
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Bienvenido, 
            {user &&
              <span>{user.fullname}</span>
            }
          </h1>
          {user 
              
            ? (
                <>
                  <p className="text-zinc-600">
                    Ver <Link to="/mycompliance" className="text-cyan-600 hover:text-slate-600">Mis evaluaciones internas</Link> disponibles.<br/>
                    Ver <Link to="/myuserx" className="text-cyan-600 hover:text-slate-600">Mi experiencia de usuario</Link> de los servicios disponibles.
                  </p>
                </>
              )
            : (
                <p className="text-zinc-600">Para empezar, <Link to="/login" >ingrese a su cuenta.</Link></p>
              )
          
          }
          
          
      
        
        </div>
      
      
      </Template>
    
    
      
    ); 

    
  
  
};


