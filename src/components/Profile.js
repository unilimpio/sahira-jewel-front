import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      
        <h4 className="text-zinc-600">
          Profile
        </h4>
      
      <p>
        <strong>Id:</strong> {currentUser.id}
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
  );
};

export default Profile;
