import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import AuthService from "../services/auth.service";

import Template from "./common/template/Template";


export default function Home () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-full p-4 mb-4 mx-auto border border-slate-600  rounded-lg md:rounded-b-none  shadow-md bg-gradient-to-br from-neutral-200 via-white to-neutral-200`;

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
                    Ver <Link to="/myuserx" className="text-cyan-600 hover:text-slate-600">Mi experiencia de usuario</Link> de los servicios disponibles.<br/>
                    Ver <Link to="/mytasks" className="text-cyan-600 hover:text-slate-600">Mis Tareas</Link> asignadas a su usuario.
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


