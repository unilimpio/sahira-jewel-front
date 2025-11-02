import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate, Navigate} from "react-router";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";

const user = AuthService.getCurrentUser();

export default function Home () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-full p-4 mb-4 mx-auto border border-slate-600  rounded-lg md:rounded-b-none  shadow-md bg-gradient-to-br from-neutral-200 via-white to-neutral-200`;

 


  if (!user ){
     localStorage.removeItem("cs_uxsurvey_session");
  }

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [content, setContent] = useState(false);//the whole data object returned by the api call
  const [countPending, setCountPending] = useState(false);//the whole data object returned by the api call
  const [countCompleted, setCountCompleted] = useState(false);//the whole data object returned by the api call

  useEffect(() => {

    if (user) {
      setLoading(true);
      UserService.getTasks(user.uId)
        .then((response) => {
          console.log(response)
          setContent(response.data);
          setCountPending(response.data?.tasks_count_pending+1);
          setCountCompleted(response.data?.tasks_count_completed+1);
          setMessage(response.data?.message);
        })
        .catch((error) => {
          const _content =
            (error?.response && error?.response.data) ||
            error?.message ||
            error?.toString();
          setContent(_content);
          setCountPending(false);
          setCountCompleted(false);
        })
        .finally(() => setLoading(false));
    }

  }, [user]);
      
 
  
    return (
    

      <Template >

        <div className={` `+wrapperClass}>
          
          
          {user ? (
            <>
              <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Hola&nbsp; 
                <span>{user.fullname}</span>
              </h1>
              <p className="text-zinc-600 text-sm">
                  Tienes <Link to="/mytasks" >{countPending}</Link> tareas asignadas pendientes.<br/>
                  Has completado <Link to="/mytasks" >{countCompleted}</Link> tareas asignadas este mes.
              </p>
            </> 
              ) : (
                <Navigate to="/login" replace={true} state={{ from: "/mytasks" }} />
              )
          
          }
      
        </div>
      
      
      </Template>
    
    
      
    ); 

};


