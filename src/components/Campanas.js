import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";



export default function Campanas () {
  
  
  
  
  function CampanasList({clientID}){
  
    const [content, setContent] = useState("");
    
    const [message, setMessage] = useState("");

    const user = AuthService.getCurrentUser();
    
  
    useEffect(() => {

      function createOptions() {
        return {
          clientID: user.cid,
          
                   
        };
      }
      const options = createOptions();
      
      if(!options.clientID){
        setContent("");
        setMessage("no se recibio el id del cliente ")
        
      } else {
  
        UserService.getIndex(options.clientID).then(

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
              setMessage(_content);
              setContent(_content);
            
            }
          
        )
      }  
  
    }, [clientID]);
  
    return (
      <>
        
        <p>Estas son las campanas habilitadas para su usuario ({clientID}): </p>
        <div className="container">
          
          <div className="flex flex-row ">
          
          {content.campanas 
            ? <RenderCampanas content={content}/>
            : <p>Loading...</p>          
                
    
          }
          </div>
          <div className="flex flex-row">
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          </div>
          
          
        </div>
      </>
    );
  
  }

  
  function RenderCampanas({content}){
  
    
    if(content){
  
      return(
        <>
                
                <label>
              Campanas disponibles:
              
              <select className="text-zinc-800 font-normal text-md border-2 rounded-md bg-zinc-100"
                defaultValue={campanaId}
                onChange={e => setCampanaId(e.target.value) }
              >
                <option defaultValue={''} ></option>
          
            
            {
              content.campanas.map(campana => (
                
                <option key={'option'+campana.campana_id} value={campana.campana_id}>{campana.name+' ('+campana.campana_id+')'}</option> 
                
                
          
              ))
            }
            </select>
          </label>
          
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
  
  function CampanaDetail({campanaID}){
  
    const [content, setContent] = useState("");
    
    
    const user = AuthService.getCurrentUser();
    
      
    useEffect(() => {
  
      function createOptions() {
        return {
          clientID: user.cid,
          campanaID: campanaID
                   
        };
      }
  
      const options = createOptions();
      
      if(!options.campanaID){
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
  
    }, [campanaID]);
  
    return (
      <>
        <div className="container">
        
          <div className="flex flex-row">
            <p>Este es su estado de cuenta de la campana seleccionada ({campanaID}): </p>
          </div>
          
          <div className="flex flex-row">
          {content.puntos
            ? <RenderPoints content={content}/>
            : <p>Loading...</p>          
                
    
          }
          </div>
        </div>
      </>
    );
  
  
  }
  
  function RenderPoints({content}){
  
    if(content){
  
      return(
        <>  
          <table className="table-fixed border-collapse border border-slate-400">
            <thead>
                <tr className="border border-slate-400">
                  <th className="border border-slate-400">Fecha</th>
                  <th>dolares</th>
                  <th>puntos</th>
                </tr>
            </thead>
            <tbody>
            {
              content.puntos.map(row => (
                
                
                <tr className="border border-slate-400" 
                        key={"tr."+row.id}
                        
                        >  
                  <td className="border border-slate-400-" key={"dateCreated."+row.date_created}></td>
                  <td className="border border-salte-400" key={"dolares"+row.id}>{row.dolares}</td>
                  <td className="border border-slate-400" key={"puntos."+row.id}>{row.puntos}</td>
                  
                </tr>
          
              ))
            }
            </tbody>
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

  const user = AuthService.getCurrentUser();
  
  const onChangeCampana = (e) => {

    const campanaID  = e.target.value;
    setCampanaId(campanaID);
    setShowCampana(true);
 
  }

  const [campanaId, setCampanaId] = useState("");
  const [showCampana, setShowCampana] = useState(false);
  
  return (
    
      <div className="container">
        
          <h4 className="text-zinc-600">Campanas</h4>
      
        <div className="row flex-1">
          <div className="flex">
            
                {user &&

                  <CampanasList clientID={user.cid} />

                }
              
          </div>
        
        

        {!user &&
          
          <p>Favor <Link to="/Login"> ingrese </Link> para ver campañas disponibles.</p>
          
        }
        
        </div>
        
        
        {campanaId &&
          <div className="row">
           <CampanaDetail campanaID={campanaId} />
           </div>
        }
        
        
      </div>
  );

  
};


