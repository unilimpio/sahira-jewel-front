import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

import AuthService from "../services/auth.service";



const Logout = () => {
  

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user = AuthService.getCurrentUser();
  
  AuthService.logout().then(
          () => {
            localStorage.removeItem("user");
          console.log('local storage removed')
            navigate("/home");
            window.location.reload();
          },
          (error) => {
            

            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setLoading(false);
            setMessage(resMessage);

          }
    );
  

  return (
      <>
        {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
        )}

        {loading && (
            <div className="form-group">
              <div className="alert alert-info" role="alert">
                <p>Logging out...</p>
              </div>
            </div>
        )}
          
        
      </>
  );
     
}; 

  


export default Logout;
