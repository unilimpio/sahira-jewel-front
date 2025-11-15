import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//navigate("/login");


export default function About () {
  
  const user = AuthService.getCurrentUser();

  
    return (
    
      <div className="container">
        
          <h1>About</h1>
      
        <div className="row">
        
        
        
        </div>
      </div>
    );

  

    
    

    
  
  
};


