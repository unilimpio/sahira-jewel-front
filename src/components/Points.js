import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//navigate("/login");
function CampanasList({clientID, campanaID}){
  
  const [content, setContent] = useState("");

  useEffect(() => {

    function createOptions() {
      return {
        clientID: clientID,
        campanaID: campanaID
      };
    }

    const options = createOptions();
    
    if(!options.clientID){
      setContent("");
    } else {

      UserService.getPoints(options.clientID, options.campanaID).then(

          (response) => {
            setContent(response.data);
            console.log(response);
            
            console.log(response.status);
            console.log(response.statusText)
            if(response.data.message)
              console.log(response.data.message)
          
          
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
  
            setContent(_content);
          
          }
        
      )
    }  

  }, [clientID, campanaID ]);

  return (
    <>
      
      <p>Estos son los puntos acumulados en la campana {campanaID} para el cliente {clientID}  </p>
      <div className="container">
        
        <div className="flex flex-row ">
        {content.campanas
          ? <RenderList content={content}/>
          : <p>Loading...</p>          
              
  
        }
        </div>
      </div>
    </>
  );

}

function RenderList({content}){

  if(content){

    return(
      <>
        <table>
          <tr>
            <th>dolares</th>
            <th>puntos</th>
            <th>fecha</th>
          </tr>
          
                  
          {
            content.puntos.map(row => (
                
              <tr>
                <td>{row.puntos}</td>
                <td>{row.dolares}</td>
                <td>{row.date_created}</td>
              </tr>
        
            ))
          }
        </table>
      </>
    );

  } else {

    return(
      <>
        <p>no se pudo cargar la info</p>
      </>

    );

  }

}

export default function Points () {
  
  const user = AuthService.getCurrentUser();

  
    return (
    
      <div className="container">
        
          <h4>Estado de cuenta del cliente :</h4>
      
        <div className="row">
        
        {user 
          ? <CampanasList clientID={user.cid} campanaID={campanaID} />
          : <p>No hay datos para mostrar...</p>
           
        }
        
        </div>
      </div>
    );

  

    
    

    
  
  
};


