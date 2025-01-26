import React from "react";
import AuthService from "../services/auth.service";
import Template from "./common/template/Template";

const Profile = () => {
  
  const wrapperClass = `w-full mx-auto border border-slate-600 p-2 rounded-b-lg md:rounded-b-none bg-white shadow-md`;

  const currentUser = AuthService.getCurrentUser();

  return (
    <Template>
      <div className={wrapperClass}>
        
          <h4 className="text-zinc-600">
            Profile
          </h4>
        
        <p>
          <strong>Id:</strong> {currentUser.uId}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
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

export default Profile;
