import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate, Navigate} from "react-router";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";


const user = AuthService.getCurrentUser();

export default function Home () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-full p-4 mb-4 mx-auto `;

 


  if (!user ){
     localStorage.removeItem("cs_uxsurvey_session");
  }

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [content, setContent] = useState(false);//the whole data object returned by the api call
 

  useEffect(() => {

    
  }, [user]);
      
 
  
    return (
    

      <Template >

        <div className={`mt-16 `+wrapperClass}>
          
          
         
              <h1 className="text-zinc-600  font-serif text-2xl md:text-3xl lg:text-4xl">Hello!👋&nbsp;

              {user && (
                 
                  <span>{user?.fullname}</span>                           
             
              )
          
              }
              </h1>
              <h3 className="text-zinc-600 font-thin font-serif">
                 We got the best artist designed, hand-crafted, indigenous inspired jewels for you.<br />
                 You are amazing! 
              </h3>
              <p className="font-serif text-sm">Every piece is carefully conceptualized, designed, and then hand crafted in our own or with the support of local artisanal jewelers who preserve a millenary craft.</p>
        </div>
      
      
      </Template>
    
    
      
    ); 

};


