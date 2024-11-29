import React, { useState, useEffect } from "react";
import { Link } from "react-router";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";



export default function Evals () {
  
  
  
  function EvalsList({uId}){
  
    const [content, setContent] = useState("");
    
    const [message, setMessage] = useState("");

    const user = AuthService.getCurrentUser();
    
  
    useEffect(() => {

      function createOptions() {
        return {
          uId: user.uId,
          
                   
        };
      }
      const options = createOptions();
      
      if(!options.uId){
        setContent("");
        setMessage("no se recibieron los parametros correctos.")
        
      } else {
        try {
          
        } catch (error) {
          
        }
        UserService.getEvals(options.uId).then(

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
  
    }, [user.uId]);
  
    return (
      
        
        
      <div className="flex flex-col">
          
          
          <p className="text-sm md:text-md mb-0">Estas son las campanas habilitadas para su usuario ({uId}): </p>
          
          
          

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
            {content.evals 
            ? <RenderEvals content={content}/>
            : <div className="flex">
                <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                  <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                </svg>
                <span className="text-slate-700 font-extralight ml-2">Loading...</span>
              </div>    
                
    
            }
          
          
          
      </div>
      
    );
  
  }

  
  function RenderEvals({content}){
  
    
    if(content){
  
      return(
        <div className="m-1 pb-4">
                
              <label htmlFor="eval-select" className="text-xs md:text-sm mb-0">Seleccionar evaluación:</label>
              
              <select id="eval-select" 
                className="h-8 w-full text-zinc-600 text-xs text-ellipsis md:text-sm border border-slate-500  bg-white shadow-md rounded-sm"
                defaultValue={evalId}
                onChange={e => setEvalId(e.target.value) }
              >
                <option defaultValue={''} ></option>
          
            
            {
              content.evals.map(row => (
                
                <option className="" key={'option-'+row.id} value={row.id}>{'(id: ' + row.id + ')' + row.date_inicio_planif + ' - ' + row.verif_name}</option> 
                
                
          
              ))
            }
            </select>
          
          
        </div>
      );
  
    } else {
  
      return(
        <>
          <p>no se pudo cargar la info</p>
        </>
  
      );
  
    }
  
  }
  
  function EvalDetail({evalId}){
  
    const [content, setContent] = useState("");
    
    
    const user = AuthService.getCurrentUser();
    
      
    useEffect(() => {
  
      function createOptions() {
        return {
          uId: user.uId,
          evalId: evalId
                   
        };
      }
  
      const options = createOptions();
      
      if(!options.evalId){
        setContent("");
        
      
      } else {
  
        UserService.getPuntos(options.evalId).then(
  
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
  
    }, [user.uId, evalId]);
  
    return (
      <div className="flex flex-col p-3 bg-neutral-100 rounded-sm">       
          
            <h2 className="text-base md:text-lg text-slate-600">Evaluación ({evalId}) - Resumen </h2>
        
          
            <div className="m-1">
              {content.puntos
                ? <RenderPuntos content={content}/>
                : <div className="flex">
                    <svg className=" animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                      <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                    </svg>
                    <span className="text-slate-700 font-extralight ml-2">Loading ...</span>
                  </div>         
                    
        
              }
            </div>
          
      </div>
    );
  
  
  }
  
  function RenderPuntos({content}){
  
    if(content){
  
      return(
        <div className="flex flex-col"> 
          <p className="text-sm md:text-base my-1">Fecha Realizada: </p>
          <p className="text-sm md:text-base my-1">Ubicacion: </p>
          <p className="text-sm md:text-base my-1">Resultados: </p>
          <table className="table-fixed w-full border-separate border-spacing-2 bg-white border border-slate-500 rounded-sm shadow-md">
            <thead className="text-xs md:text-sm">
                <tr className="text-slate-800 font-semibold">
                  <th className="">Fecha</th>
                  <th className="">Criterio Cumplido</th>
                  <th className="">Observaciones</th>
                </tr>
            </thead>
            <tbody className="text-xs md:text-sm">
            {
              content.puntos.map(row => (
                
                
                <tr className="" 
                        key={"tr."+row.id}
                        
                        >  
                  <td className="" key={"dateCreated-"+row.date_created}>{row.date_created}</td>
                  <td className="" key={"dolares-"+row.id}>{row.criterio_cumplido}</td>
                  <td className="" key={"puntos-"+row.id}>{row.observaciones}</td>
                  
                </tr>
          
              ))
            }
            </tbody>
          </table>
        </div>
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
  
  const onChangeEval = (e) => {

    const evalId  = e.target.value;
    setEvalId(evalId);
    setShowEval(true);
 
  }

  const [evalId, setEvalId] = useState("");
  const [showEval, setShowEval] = useState(false);
  
  return (
    
      <div className="container mx-auto py-2 mb-10">
        
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Evaluaciones</h1>
      
        <div className="flex flex-col">
          <div className="">
            
                {user &&

                  <EvalsList uId={user.uId} />

                }
              
          </div>
        
        

        {!user &&
          
          <p>Favor <Link to="/Login"> ingrese </Link> para ver evaluaciones disponibles.</p>
          
        }
        
        </div>
        
        
        {evalId &&
          <div className="row">
           <EvalDetail evalId={evalId} />
           </div>
        }
        
        
      </div>
  );

  
};


