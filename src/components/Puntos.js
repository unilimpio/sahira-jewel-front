import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";



export default function Puntos (evalId, instance) {
  
 
   
  const user = AuthService.getCurrentUser();

  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

  const RenderForm = (content)=> { 
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setMessage("");
      //setContent(false);
      setLoading(true);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        UserService.setPunto(evalId, instance).then(
          (response) => {
            
                setContent(response.data);
                
                console.log(response);              
                console.log(response.status);
                console.log(response.statusText)
  
                console.log(response);              
                console.log(response.status);
                console.log(response.statusText)
  
                if(response.data.message){
                  console.log(response.data.message)
                  setMessage(response.data.message)
                }
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
            setContent(false);
          }
        );
      } else {
        setLoading(false);
      }
    };
  
    return(

      <Form onSubmit={handleSubmit} ref={form}>
        <div className=" flex flex-col sm:flex-row  sm:justify-start sm:w-fit sm:pl-12 my-2">
            <span className="">Pasa el criterio establecido?</span>
            <label htmlFor={`criteria-`+content.instance+`-pasa`} className="mx-2">Pasa:</label>
          
          
            <Input
              type="radio"
              className="text-lg  border border-zinc-600 h-10 p-3 "
              id={`criteria-`+content.instance+`-pasa`}
              name="criteria"
              
              value={criteria}
              onChange={onChangeCriteria}
              validations={[required]}
            />
            <label htmlFor={`criteria-`+content.instance+`-nopasa`} className="mx-2">No Pasa:</label>
          
          
          <Input
            type="radio"
            className="text-lg  border border-zinc-600 h-10 p-3 "
            name="criteria"
            id={`criteria-`+content.instance+`-nopasa`}
            value={!criteria}
            onChange={onChangeCriteria}
            validations={[required]}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:pl-12 justify-center sm:justify-start my-2">
          <label htmlFor="obs" className="mx-2">Observaciones:</label>
          <textarea
            
            className=" rounded-md border border-zinc-600 h-10 p-3"
            
            name="obs"
            id={`obs-`+content.instance}
            defaultValue="Por favor agregue un comentario para enriquecer la evaluacion."
            value={obs}
            onChange={onChangeObs}
            rows={4} cols={40}
          />
        </div>

        <div className=" flex sm:pl-12 sm:w-8/12 justify-center sm:justify-start my-2">
          
            {loading && (
            <button className="bg-slate-400 border-2 rounded-md py-2 w-[7rem] relative text-left" disabled={loading}>
              <svg className="absolute left-1 animate-spin h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
              </svg>
              <span className="text-white ml-8">Loading</span>
            </button>
            )} 
            {!loading && (
              <>
                <button type="submit" className="bg-sky-800 hover:shadow-lg hover:bg-sky-600 rounded-md w-[7rem] text-left py-2" disabled={loading}>
                  <span className="text-white ml-8">Grabar y continuar</span>
                </button>
                <Link to="/myevals" className="bg-sky-800 hover:shadow-lg hover:bg-sky-600 rounded-md w-[7rem] text-left py-2" >
                  <span className="text-white ml-8">[x] Cancelar</span>
                </Link>
              </>
            
            )}
          
        </div>

        {message && (
          <div className="">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        <CheckButton style={{ display: "none" }} ref={checkBtn}  className=""/>
      </Form>
    
    );

  }

  const form = useRef();
  const checkBtn = useRef();

  const [criteria, setCriteria] = useState("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState(false);

  const navigate = useNavigate();

  const onChangeCriteria = (e) => {
    const criteria = e.target.value;
    setCriteria(criteria);
  };

  const onChangeObs = (e) => {
    const obs = e.target.value;
    setObs(obs);
  };
  
      
    useEffect(() => {
  
      function createOptions() {
        return {
          
          evalId: evalId
                   
        };
      }
  
      const options = createOptions();
      
      if(!options.evalId){
        
        setContent("");
        
      
      } else {
  
        UserService.getEvalState(options.evalId).then(
  
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
  
    }, [ evalId]);

  
  
    return (
      <div className="flex flex-col p-3 bg-neutral-100 rounded-sm">       
          
            <h2 className="text-base md:text-lg text-slate-600">Evaluación ({evalId}) - Punto de Evaluacion </h2>
        
          
            <div className="m-1">
              {user && (
                <RenderForm content={content}/>
              
              )}
              {!user &&
          
                  <p>Favor <Link to="/Login"> ingrese </Link> continuar con el proceso de evaluacion.</p>
          
              }
            </div>
          
      </div>
    );
  


};

