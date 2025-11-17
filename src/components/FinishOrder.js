import React from "react";
import { Navigate } from "react-router";
import AuthService from "../services/auth.service";
import Template from "./common/template/Template";

const FinishOrder = () => {
  
  const wrapperClass = `w-full h-full p-4 mx-auto border border-slate-600  rounded-lg md:rounded-b-none  shadow-md bg-gradient-to-br from-neutral-200 via-white to-neutral-200`;

  const currentUser = AuthService.getCurrentUser();

  return (
    <Template>
      <div className={wrapperClass}>
        
          <h4 className="text-zinc-600">
            Profile
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="w-20 sm:w-32 rounded-full opacity-75 z-10 float-right"
            /> 
          </h4>
          
           
        {
           currentUser ? ( 
           <>
              <p>
                <h4 className="text-secondary">{currentUser.fullname}</h4> 
              </p>
              <p>
                <strong className="text-secondary">Id:</strong> {currentUser.uId}
              </p>
              <p>
                <strong className="text-secondary">Email:</strong> {currentUser.email}
              </p>
              <p className="text-xs text-secondary">
                Valoramos mucho tu privacidad, por eso intentamos manter la cantidad de datos personales que recolectamos al minimo.
              </p>
           
           
           </>
        
           ) : (<Navigate to="/login" replace={true} state={{ from: "/profile" }} />)
      
        }
        
        {/*
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
          */}
      </div>
    </Template>
  );
};

export default FinishOrder;
