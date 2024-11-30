import React, { useState, useEffect, useRef, useId} from "react";
import { Link } from "react-router";


import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';



export default function MyEvals () {

  const user = AuthService.getCurrentUser();
  
  const [evalId, setEvalId] = useState(false);
  
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  

  
  function EvalsList({uId}){   
    
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState("");
    const [listContent, setListContent] = useState(false);

   
    
    
  
    useEffect(() => {
      // Add scroll event listener when the component mounts
   

    
      let ignore = false;

      function createOptions() {
        return {
          uId: user.uId,           
                   
        };
      }
      
      const options = createOptions();
      
      if(!options.uId){
        setListContent("");
        setError("no se recibieron los parametros correctos.")
        //setMessage("no se recibieron los parametros correctos.")
        
      } else {

          UserService.getEvals(options.uId).then(

              (response) => {

                if(!ignore){
                
                  setListContent(response?.data);
                  
                  //console.log(response);              
                  //console.log(response?.status);
                  //console.log(response?.statusText)

                  if(response?.data.message){
                    
                    //setMessage(response?.data.message)
                  }
                  console.log(response?.data.message)

                }
              
              },

              (error) => {
                const _content =
                  (error?.response && error?.response.data) ||
                  error?.message ||
                  error?.toString();
                
                setListContent(_content);

                
              
              }
            
          )

        
      }  

 
      return () => {

        ignore = true;
        

      };
  
    }, [uId]);

    const RunButton = ({evalId}) => {

      function handleClick (){
      
        setMessage(false);
        setError(false);
        setLoading(true);
        setListContent(''); 
        
        setEvalId(evalId);
        console.log(evalId)
        //setInstance(instance);
        
        setShowModal(true);
      
      }
    
      return (
  
  
        <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                onClick={handleClick}>
          <svg  className="w-4 h-4 " viewBox="0 0 512 512"> 
    
            <path className=" fill-green-400 " d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256
              C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031
              c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031
              l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"/>
  
          </svg>
          
          
  
        </button>
  
      );
    }  

    function RenderList({listContent}){
  
    
      if(listContent){
    
        return(
          <div className="mt-2 mb-4">
                
            <table id="eval-display" 
              className="bg-white opacity-90 text-xs sm:text-sm shadow-md rounded-sm">
                             
            
                  <thead id="table-evals-display-head" 
                          className="border border-b-zinc-300 " >
                    <tr className="bg-gradient-to-b from-stone-300 to-white  font-semibold">
                      <td className="p-2"   >
                        id#
                      </td>
                      <td className="p-2"   >
                        Fecha de Inicio Planificada
                      </td>
                      <td className="p-2"  >
                        Lista de Verificación
                      </td> 
                      <td className="p-2">Estado</td>
                      <td className="p-2">Accion</td>
  
                    </tr>
  
  
  
                  </thead>
                  <tbody className="text-zinc-600 ">
            
              
              {
                listContent.evals.map(row => (
                  
                  <tr className="" key={'tr-'+row.id} >
                    <td className="p-2" id={'td-id'+row.id}   >
                      { row.id  }
                    </td>
                    <td className="p-2 " id={'td-date_inicio_planif'+row.id}   >
                      { row.date_inicio_planif }
                    </td>
                    <td className="p-2 " id={'td-verif_name'+row.id}   >
                      { row.verif_name }
                    </td> 
                    <td className="p-2">
                    { row.estado }
                    </td>
                    <td className="p-2">
                      <RunButton evalId={row.id}/>
                    </td>    
                  
                  </tr> 
                  
            
                ))
              }
              </tbody>
              </table>
            
            
          </div>
        );
    
      } else {
    
        return(
          
            <p>no se pudo cargar la info</p>
          
    
        );
    
      }
    
    }
  
    return (
      
      
      
        
      <div className="flex flex-col relative z-1">
          
              <p className="text-sm md:text-md mb-0">Estas son las evaluaciones habilitadas para su usuario ({uId}): </p>
              {loading && (
                <div className="flex">
                  <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>

              )}
              {listContent && (   

              <RenderList listContent={listContent}/>
              )}
            
                           
      </div>
 
    );
  
  }


  function EvalRun(){   
    
    
    
    const [instance, setInstance] = useState(false);
    
    const [selectedCheck, setSelectedCheck] = useState("");
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState(false);
    const [content, setContent] = useState('');
    const [state, setState] = useState(false);
    const [criterios, setCriterios] = useState('');
    const [current, setCurrent] = useState('');

    //simple strings for the buttons, choose your own!
    const strSave = `✅ Aceptar y Continuar`;
    const strCancel = `❌ Cancelar`;



    
  
    useEffect(() => {

      document.body.style.overflow = "hidden";
        
      try { 

        UserService.getEvalState(evalId).then(

            (response) => {

              setContent(response.data);
              setInstance(response.data.state.instance_key);
              setState(response.data.state);
              setCriterios(response.data.criterios);
              setCurrent(response.data.current);
              
                //const criteriosArray = Object.entries(criterios);
              
              //console.log(Object.entries(response.data.criterios));
              //console.log(criterios);
                //setCriterio(criteriosArray[content.instance_key])
              /*
              response.data.criterios.map((criterio, index) => {

                if(index === response.data.eval.instance_key){
                   
                  return setCriterio(criterio); 
                
                } else {

                  return null;

                }

              })
              */
              //console.log(criterio); 

              
              //setInstance(content.instance_key)
              console.log(content);
              //console.log(instance);
              console.log(response);              
              //console.log(response?.status);
              //console.log(response?.statusText)

              //if(response?.data.message){
                //console.log(response.data.message)
                //setMessage(response.data.message)
              //}
            
            
            },

            (error) => {
              const _content =
                (error?.response && error?.response.data) ||
                error?.message ||
                error?.toString();
              
              setError(_content);
              
              
            
            }
          
        )
          
        } catch (error) {
          
        }
        
      //}  
      // Clean up the event listener when the component unmounts
      return () => {
        document.body.style.overflow = "scroll"
        //window.removeEventListener('scroll', handleScroll);

    };
  
    }, []);

    const SaveButton = ({className, children}) => {

             
      return (   
  
        <button  type="submit" id="submit"
                className={className + 
                  `m-1 p-1 rounded-md border border-white 
                  
                  bg-gradient-to-b from-sky-400 to-sky-800 
                      hover:shadow-md hover:bg-sky-600 
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-150
                  `                    
                } 
                disabled={loading} >
          
          <span className="mx-1 text-white font-semibold text-sm">{children}</span>
          
          
          
  
        </button>
  
      );
    
    }

    const CancelButton = ({className, children}) => {

      function handleCancel (){
      
        setMessage('Evaluación cancelada por el usuario. Puede continuar más tarde desde él último criterio verificado.');
        setError('Atención: la evaluación no se ha completado! No olvide completarla más adelante.')
        console.log('cancelled by the user');
        setLoading(false);
        setContent(''); 
        setEvalId(false);
        //setInstance(false);
        setShowModal(false);
        //console.log(evalId)
        //console.log(instance)
        //console.log(showModal)
        
      
      }
    
      return (  
        
  
  
        <button  
                type="button"
                className={className +
                  `m-1 p-2 flex flex-row  
                   rounded-md 
                  hover:bg-white bg-zinc-50  border border-zinc-400 font-semibold
                  
                  `
                } 
                disabled={loading} onClick={handleCancel}>
          
          <span className="mx-1 text-zinc-400 text-xs font-thin hover:no-underline">{children}</span>
            
        </button>
  
      );
    } 

    const BackButton = ({className, children}) => {

      function handleClick (){
      
        setMessage("Proceso finalizxado correctamente");
        console.log('proceso finalizado correctamente');
        setLoading(false);
        setContent(''); 
        setEvalId(false);
        //setInstance(false);
        setShowModal(false);
        //console.log(evalId)
        //console.log(instance)
        //console.log(showModal)
        
      
      }
    
      return (  
        
  
  
        <button  
                type="button"
                className={className +
                  `m-1 p-2 flex flex-row  
                   rounded-md 
                  hover:bg-white bg-zinc-50 border border-zinc-400 font-semibold
                  
                  `
                } 
                disabled={loading} onClick={handleClick}>
          
          <span className="mx-1 text-zinc-400 text-xs font-thin hover:no-underline">{children}</span>
            
        </button>
  
      );
    } 


    const RenderStart = ()=> { 
   
      
      

      const options = createOptions();
      console.log(options);
      
      
      function createOptions() {
        return {
          //evalId: inputEvalId.current.value, 
          //instance: inputInstanceKey.current.value,
          evalId: evalId, 
          instance: content.instance_key,
          
          selectedCheck: selectedCheck,
          obs: '',     
                   
        };
      }

      function CancelProcessing() {

                  setLoading(false);
                                  
                 // setContent(false);              
                
                  //setObs(null);
                  setSelectedCheck(null);
                
                  //setInstance(null);
                
                  //setShowModal(false);
                  //setEvalId(null);
                  //setMessage('Cancel processing...');
                  //setError('Error detected, processing halted...');
                  //console.log(message);

      }
      

      function handleSubmit() {

       // e.preventDefault();

        setSelectedCheck(1);
        //setObs(''); 
        setInstance(0);  
         
        
        const data = {

          criterio: selectedCheck,
          obs: ''

        }
            
        UserService.setPunto(options.evalId, options.instance, data )
            .then(
              (response) => {
              
  
                  setContent(response.data);
                  
                  
                  if(response.status === 204){
                    setError(error + response.statusText)
                    CancelProcessing();
                   
                  }
                    
                  
                  console.log(response);              
                  //console.log(response.status);
                  //console.log(response.statusText)
    
                  //console.log(response);              
                  console.log(response.status);
                  console.log(response.statusText)
                  
                  //if(response.data.message !== undefined){
                    console.log(response.data?.message)
                  setMessage(response.data?.message)
                  //}
                  return content;
  
              })
              .catch( 
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message || error.statusText ||
                    error.toString();
                  //setMessage(resMessage);
                  let errorMsg = 'No se pudo procesar la operacion: ';
                  setError(errorMsg + resMessage)
                  CancelProcessing();
                }
              );

        
        
      }     
    
      

      return(
  
          <form onSubmit={handleSubmit} >
  
            <div className=" flex flex-col 
                  sm:flex-row sm:justify-start 
                  sm:w-fit sm:pl-12 my-2
                  ">
                    <p className="text-sm font-thin ">
                      Usted esta a punto de comenzar la evaluacion&nbsp;
                      <span className="text-red-500 font-bold">
                        Nº  {evalId} [{instance}]
                      </span>.<br/>
                      <span className="text-slate-700 font-bold">
                      A partir de este punto el tiempo de inicio y transcurrido hasta finalizar la evaluacion sera registrado. 
                      </span>
                    </p>
                    
                    
                         
            </div>   
            {error && (
                          
                          <div className="alert alert-danger " role="alert">
                              {error}
                          </div>
                                  
                )}      
    
            <div className=" flex sm:pl-12 sm:w-8/12 justify-evenly sm:justify-start my-2">
                
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
                    <SaveButton 
                      className={`
                        `}>
                         {strSave}
                    </SaveButton>
                    
                    <CancelButton 
                      className=" ">
                        {strCancel}
                    </CancelButton>           
                    
                  </>
                
                )}
              
            </div>
    
    
            
          </form>
        
      );

      
      
  
    }

    const RenderInstance = () => { 
   

      const [isPasaChecked, setIsPasaChecked] = useState(false);
      const [isNoPasaChecked, setIsNoPasaChecked] = useState(false);

      //var steps = Object.keys(criterios).length;
      
      

      function CancelProcessing() {

                  setLoading(false);
                                  
                 // setContent(false);              
                
                  
                  setSelectedCheck(null);
                
                  //setInstance(null);
                
                  //setShowModal(false);
                  //setEvalId(null);
                  //setMessage('Cancelando operación debido a un error.');
                  //setError('Error detected, processing halted...');
                  //console.log(message);

      }
      

      function handleSubmit(event) {

        event.preventDefault();

        const form = event.target;

        const formData = new FormData(form);
        const values = [...formData.entries()];
        const formElements = form.elements;
        
        const onSubmitObs = formData.get("obs");
        const onSubmitRadio = formData.get("criterio-verif");

        
        
        console.log(values);
        
        console.log(form);
        
        console.log(formElements);
        
        console.log(onSubmitObs);

        console.log(onSubmitRadio);
        
       

        if (!error) {
                    
          const data = {

            criterio: parseInt(formData.get("criterio-verif")),
            obs: formData.get("obs"),
  
          }
          console.log(data);
              
          UserService.setPunto(evalId, instance, data )
              .then(
                (response) => {
                
    
                    setContent(response.data);
                    
                    if(response.status === 204){
                      setError(error + response.statusText)
                      CancelProcessing();
                     
                    }
                    
                    console.log(response);              
                    //console.log(response.status);
                    //console.log(response.statusText)
      
                    //console.log(response);              
                    console.log(response.status);
                    console.log(response.statusText)
                    
                    //if(response.data.message !== undefined){
                      console.log(response.data?.message)
                    setMessage(response.data?.message)
                    //}
                    if(!response.data.current){
                      setCurrent(null);
                      
                    } else {
                      
                      setCurrent(response.data.current);
                    }
                    
                    setCriterios(response.data.criterios);
                    setState(response.data.state)
                    setInstance(response.data.state.instance_key)
                    
                    return content;
    
                })
                .catch( 
                  (error) => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message || error.statusText ||
                      error.toString();
                    //setMessage(resMessage);
                    let errorMsg = 'No se pudo procesar la operacion: ';
                    setError(errorMsg + resMessage)
                    CancelProcessing();
                  }
                );
        }       
        

        
        
      }     

      
      
      function handleCheck(event) {

        const value = event.target.value;

        if(value === "1" ){

              setIsPasaChecked(true);
              setIsNoPasaChecked(false);
              console.log('selected Check noted! value:'+ "Pasa" + value );
                   
              return setSelectedCheck(value);


        } else if(value === "0"){

              setIsPasaChecked(false);
              setIsNoPasaChecked(true);
              
              console.log('selected Check noted! value:'+ "NOPasa" + value );

              return setSelectedCheck(value);

        } else 
          return null;
         
        
      } 

      /*
      const PasaButton = ({className, children}) => {       
        
        const [isChecked, setIsChecked] = useState(false);

        return (  
             
          <button  
                  type="button"
                  className={
                    isChecked ? 
                      className + ` flex flex-row m-2 p-2 hover:bg-zinc-200 hover:shadow-md  rounded-md border-2 border-zinc-600 bg-zinc-300 
                    `
                    :                    
                    className + ` flex flex-row m-2 p-2 hover:bg-zinc-200 hover:shadow-md  rounded-md border-2 border-zinc-600` + ` bg-zinc-100 
                    `

                  } 
                  onClick={(e)=>{
                    //setIsPasaChecked(!isChecked);
                    //setIsNoPasaChecked(isChecked);
                   
                    //setSelectedCheck("1");
                    console.log('selected Check noted! value:'+ "Pasa" + "(1)" );
                    setIsChecked(!isChecked);
                  }}
                  
                  
          >
            {isChecked && ' ✅'}
            <span className="mx-2"> {children}</span>

              
          </button>
    
        );

      } 

      const NoPasaButton = ({className, children}) => {       
        
        const [isChecked, setIsChecked] = useState(false);

        return (  
             
          <button  
                  type="button"
                  className={
                    isChecked ? 
                      className + ` flex flex-row m-2 p-2 hover:bg-zinc-200 hover:shadow-md  rounded-md border-2 border-zinc-600 bg-zinc-300 
                    `
                    :                    
                    className + ` flex flex-row m-2 p-2 hover:bg-zinc-200 hover:shadow-md  rounded-md border-2 border-zinc-600 bg-zinc-100 
                    `

                  } 
                  onClick={(e)=>{
                    //setIsPasaChecked(false);
                    //setIsNoPasaChecked(true);
                    handleCheck(e);
                    setIsChecked(!isChecked);
                    console.log('selected Check noted! value:'+ "NOPasa" + "(0)" );
                  }}
                  
                  
          >
            
            <span className="mx-2">{isChecked ? ' ❌' + children  : children}</span>

              
          </button>
    
        );

      }
      */ 

      const RadioButton = ({className, children, clave}) => {       
        
        const [isChecked, setIsChecked] = useState(false);
        
        const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 rounded-md flex items-center `;
        const inputClassName = ` mr-2 ` + className;
        
        const id = useId();

        if(clave === "1"){
          return (  
            
          <div className="">
            <label htmlFor={`criterio-pasa-`+id} className={`` + labelClassName}>    
              <input type="radio"
                    id={`criterio-pasa-`+id}
                    name={`criterio-verif`}
                    value={clave}
                    
                    className={
                                        
                      inputClassName + ` `
  
                    } 
                    
                    onChange={(e)=>{
                      //setIsPasaChecked(false);
                      //setIsNoPasaChecked(true);
                      //handleCheck(e);
                      setIsChecked(!isChecked);
                      console.log('selected Check noted! value:Pasa(1)' );
  
                    
                    }}
                  
                  
                    
                    
              />
              
                {children}
            </label> 
            
            
          </div>   
      
          );
        } else if(clave === "0"){
          return (  
             
            <label htmlFor={`criterio-nopasa-`+id} className={`` + labelClassName}>
               
              <input type="radio"
                    id={`criterio-nopasa-`+id}
                    name={`criterio-verif`}
                    value={clave}
                    
                    className={
                                        
                      inputClassName + ``
  
                    } 
                    
                    onChange={(e)=>{
                      //setIsPasaChecked(false);
                      //setIsNoPasaChecked(true);
                      //handleCheck(e);
                      setIsChecked(!isChecked);
                      console.log('selected Check noted! value: NOPasa (0)' );
  
                    
                    }}
                  
                  
                    
                    
            /> 
              
                {children}
              
            
            </label> 
      
          );
        }
        

      } 

      const ObsInput = ({className, children}) => {

        const [obs, setObs] = useState("");
        
        
        function handleChange(e){

          const value = e.target.value;
  
          console.log(value);
  
          return setObs(value);
  
          
  
        }
        

        return (

          <label htmlFor="obs" className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">{children}:
                    
          <br/>  <textarea 
              className={className + 
                `text-sm font-thin 
                border-zinc-800 
                border rounded-md 
                focus:shadow-sm 
                focus:ring-slate-500 focus:ring-1 focus:outline-none
                
                
              `}
              name="obs" 
              id="obs"
              
              value={obs}
              cols="32"
              onChange={ handleChange }
             
                      
                      
            /> 
          </label>
        );
      }

      
    
      return(
    
          <form id="eval" onSubmit={handleSubmit}  className="">

            <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 ">
                    <h3 className="text-sm font-thin bg-slate-200">
                      Criterio &nbsp;
                      <span className="text-red-500 font-bold">
                        Nº&nbsp;{parseInt(state.instance_key)+1}
                        <span className="text-thin text-slate-600 text-xs">[{current.id}]</span>
                      </span>: &nbsp; 
                      <span className="text-slate-700 font-bold">
                        {current.titulo}
                        
                      </span>
                    </h3>
                    <h4 className="text-sm font-thin text-zinc-700 bg-slate-100 ">Descripcion: {current.descripcion}</h4>

                    <div className="flex flex-row justify-evenly">

                      
                        <RadioButton className="w-8 h-8 " clave="1">Pasa</RadioButton>
                        <RadioButton className="w-8 h-8 " clave="0">No Pasa</RadioButton>
                        
                        {/*<PasaButton clave="1" isChecked={isPasaChecked}> Pasa</PasaButton>*/}   
                        {/*<NoPasaButton clave="0" isChecked={isNoPasaChecked}> No Pasa</NoPasaButton>*/}
                        
                    </div>
                    <div className="mx-auto">
                      <ObsInput className="">Comentarios (opcional)</ObsInput>


                    </div>
                    
                    

                    
                    
                        
            </div>   
            {error && (
                          
                          <div className="alert alert-danger " role="alert">
                              {error}
                          </div>
                                  
                )}      
    
            <div className=" flex sm:pl-12 sm:w-8/12 justify-evenly sm:justify-start my-2">
                
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
                    <SaveButton 
                      className={`
                        `}>
                        {strSave}
                    </SaveButton>
                    
                    <CancelButton 
                      className=" ">
                        {strCancel}
                    </CancelButton>           
                    
                  </>
                
                )}
              
            </div>
    
    
            
          </form>
        
      );

      
  
    }

    const RenderFinish = ()=> { 
   
      

      
      
      return(
  
          
        <>
            <div className=" flex flex-col 
                  sm:flex-row sm:justify-start 
                  sm:w-fit sm:pl-12 my-2
                  ">
                    <p className="text-sm font-thin ">
                    <span className="text-lime-500 font-bold text-lg">
                      Esta evaluación ha terminado.&nbsp;
                      
                        Nº  {evalId} [{instance}]
                    </span>.<br/>
                      <span className="text-slate-700 font-bold">
                      A continuacion un resumen de los resultados: 
                      </span>
                    </p>
                                             
            </div>   
                  
    
            <div className=" flex sm:pl-12 sm:w-8/12 justify-evenly sm:justify-start my-2">
                
                    
                    <BackButton 
                      className=" ">
                        ↩️ Volver
                    </BackButton>           
                    
                  
              
            </div>
    
        </>
            
          
        
      );


      
      
  
    }




/*
    const RenderFinish = (content, selectedCheck, obs)=> { 
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        setMessage("");
        //setContent(false);
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {

          UserService.setPunto(evalId, instance, selectedCheck, obs).then(
            (response) => {
              
                  setEvalContent(response.data);
                  
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
              setEvalContent(false);
            }
          );
        } else {
          setLoading(false);
        }
      };      

      const CancelButton = () => {

        function handleCancel (){
        
          setMessage("Process cancelled by the user");
          console.log(message);
          setLoading(false);
          setEvalContent(''); 
          setEvalId(false);
          setInstance(false);
          setShowModal(false);
          
        
        }
      
        return (
          
    
    
          <button  
                  className="m-2 p-2 flex flex-row  hover:underline rounded-md border border-zinc-600" 
                  disabled={loading} onClick={handleCancel}>
            
            <span className="mx-2">[X] Cancelar</span>
            
            
            
    
          </button>
    
        );
      }       
    
      return(
  
        <Form onSubmit={handleSubmit} ref={form}>
          <div className=" flex flex-col 
                sm:flex-row sm:justify-start 
                sm:w-fit sm:pl-12 my-2
                ">
                  <p className="text-sm">La evaluacion {evalContent.data.eval_id} ha concluido.</p>      
          
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
                
                  
                  
                  <CancelButton />
                  
                  
                
              
              )}
            
          </div>
  
  
          <CheckButton style={{ display: "none" }} ref={checkBtn}  className=""/>
        </Form>
      
      );
  
    }
*/
//    if(content.data.instance_key === -1) {
  
    return (
        
        <>
          <div className="flex p-2">
              
              
              {content ? (

                <div id="eval-modal" 
                    className=" flex flex-col   my-2
                        bg-gradient-to-br from-white  to-zinc-200  
                        z-50 relative
                        rounded-md shadow-md 
                        border border-zinc-800 py-6 px-2
                        ">
                          
                      {message && (
                        
                          <div className="alert alert-info" role="alert">
                            {message}
                          </div>
                        
                      )}

                    <Link to={"/"} className="hover:no-underline ">
                        <div id="brand" className="container flex-col  px-3 py-3 m-0 ">
                          {/*<img src={logo} alt="CLEANVerif Compliance Verification App." 
                              className=" sm:w-20 w-10 mb-2"/>*/}
                          <div id="brand-logo" className="flex flex-row -mb-4  sm:-mb-4 ">
                            <svg viewBox="0 0 509.604 509.604" 
                                  className="fill-green-500  mr-1 w-6 h-6 sm:w-7 sm:h-7 md:h-8 md:w-8 z-5">
                              <path d="M34.262,333.282c8.119,6.75,14.793,15.223,14.143,20.988c-0.382,3.443-0.593,6.943-0.593,10.5
                                c0,52.393,41.3,94.861,92.24,94.861c6.292,0,12.431-0.65,18.37-1.885c10.002-2.074,21.812,1.941,28.888,9.793
                                c16.82,18.646,40.803,30.342,67.492,30.342c28.19,0,53.426-13.016,70.342-33.518c6.723-8.146,18.103-11.533,28.22-8.5
                                c8.166,2.447,16.811,3.768,25.751,3.768c50.939,0,92.24-42.477,92.24-94.861c0-5.861-0.535-11.59-1.549-17.145
                                c-1.712-9.371,2.85-21.047,10.471-28.363c18.025-17.289,29.328-41.883,29.328-69.242c0-29.787-13.368-56.323-34.263-73.698
                                c-8.118-6.751-14.793-15.224-14.143-20.99c0.383-3.442,0.593-6.942,0.593-10.5c0-52.393-41.301-94.86-92.24-94.86
                                c-6.292,0-12.431,0.65-18.369,1.884c-10.002,2.075-21.812-1.941-28.889-9.792c-16.82-18.647-40.803-30.342-67.492-30.342
                                c-26.688,0-50.671,11.695-67.492,30.342c-7.076,7.841-18.886,11.867-28.888,9.792c-5.938-1.234-12.078-1.884-18.37-1.884
                                c-50.939,0-92.24,42.477-92.24,94.86c0,5.049,0.392,10.002,1.147,14.832c1.262,8.128-4.447,18.149-12.747,24.681
                                C14.219,201.663,0,228.887,0,259.583C0,289.37,13.368,315.907,34.262,333.282z M131.475,263.016
                                c2.046-3.625,7.268-3.672,12.049,0.479l48.119,33.918c2.61,1.588,5.106,2.4,7.506,2.4c4.963,0,8.893-3.576,12.689-7.02
                                l153.985-154.138c9.629-10.471,18.99-14.162,25.102-10.146c2.82,1.855,4.646,4.647,5.135,7.87
                                c0.583,3.825-0.756,7.946-3.768,11.599l-185.149,224.91c-2.687,3.26-6.11,5.059-9.629,5.059c-4.179,0-7.965-2.516-10.404-6.895
                                l-54.344-97.969C130.519,269.422,130.021,265.618,131.475,263.016z"/>
                            </svg>
                            
                            
                              <h1 className="text-sky-400  font-bolder text-xl md:text-2xl">
                                CLEANVerif<span className="text-xs font-extralight">®</span> 
                              </h1>
                            
                            
                          
                          </div>
                          
                          <span id="brand-slogan" 
                            className="-z-5 text-sky-400 text-xs md:text-sm font-light border-t border-t-white text-nowrap">
                            Compliance Verification App.
                          </span>
                        
                        </div>
                    </Link>
                    
                    <div className="flex flex-row p-2 ">
                      
                      

                     <h2 className="m-2 grow                       
                      text-sky-500 text-xl md:text-4xl text-left
                         font-black ">
                        📋&nbsp;Eval. N°{evalId}
                      </h2>

                      <div className="w-1/2 bg-stone-100 rounded-md border  border-slate-700 p-2 ">
                        
                        <p className="text-zinc-600 text-xs sm:text-sm font-thin ">
                          <span className="font-bold">Fecha Planificada:&nbsp;</span> 
                          {state.date_inicio_planif}
                          
                        </p>
                        <p className="text-zinc-600 text-xs sm:text-sm font-thin">
                          <span className="font-bold">Estado:&nbsp;</span> 
                          {state.estado}
                          
                        </p>
                        {state.estado === 'Iniciada' ? (
                            <p className="text-zinc-600 text-xs sm:text-sm font-thin">
                            <span className="font-bold">Criterio:&nbsp; </span>
                            <span className="font-thin">{parseInt(state.instance_key)+1} de {Object.keys(criterios).length}</span>
                              
                            
                            </p> 
                          ) : ('')

                         

                        }
                      </div>
                    </div>

                    
                    <div className="z-50" >  
                             
                             
                              {(current) ? (

                                <RenderInstance />

                              ) : (

                                (state.estado === 'Finalizada') ? (
                                  <RenderFinish  />
                                ) : (
                                  <RenderStart  />
                                )  
                                

                              )}
                  </div>        
                  <img src={logoUni} alt="logo Unilimpio" className="w-64 h-64 opacity-15 absolute right-2 bottom-2 z-20" />        
                                              

                                                     
                        
                      
                    

                </div>
              ) : (
                
                <div className="flex flex-row">
                  <svg className="animate-spin h-10 w-10 fill-stone-200" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <p className="text-slate-500">Loading...</p>
                </div>

              
              )}
                              
          </div>
        </>
        
    );
  //  } else if(content.data.instance_key === 9999){
  /*    
      return (
        
        <>
          <div className="flex flex-col p-6">
              
              {content ? (

                <div id="eval-modal" 
                    className="flex flex-col mx-auto w-full 
                        bg-gradient-to-br from-zinc-100 to-zinc-300  
                        z-30 p-2
                        rounded-md shadow-md 
                        border border-zinc-800">
                  
                      {message && (
                        <div className="form-group">
                          <div className="alert alert-info" role="alert">
                            {message}
                          </div>
                        </div>
                      )} 
                      <div className="m-0 p-0 bg-stone-100 rounded-md p-2">
                        <h2 className="text-red-500 text-xs font-black">Ev.N°000{content.data.eval_id}</h2>
                        <h3 className="text-zinc-600 text-xs sm:text-sm font-thin">
                          <span className="font-bold">Fecha Planificada:&nbsp;</span> 
                          {content.data.date_inicio_planif}
                        </h3>
                        <h4 className="text-xs sm:text-sm">
                          <span className="">Criterio n°</span>
                          {content.data.instance_key+1}
                        </h4>
                        

                            <RenderFinish content={content} />

                          
                      </div>
                    

                </div>
              ) : (
                
                <div className="flex">
                  <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>

              
              )}
                              
          </div>
        </>
        
      );
*/

  //  } else {
      /*
      return (
        
        <>
          <div className="flex flex-col p-6">
              
              {content ? (

                <div id="eval-modal" 
                    className="flex flex-col mx-auto w-full 
                        bg-gradient-to-br from-zinc-100 to-zinc-300  
                        z-30 p-2
                        rounded-md shadow-md 
                        border border-zinc-800">
                  
                      {message && (
                        <div className="form-group">
                          <div className="alert alert-info" role="alert">
                            {message}
                          </div>
                        </div>
                      )} 
                      <div className="m-0 p-0 bg-stone-100 rounded-md p-2">
                        <h2 className="text-red-500 text-xs font-black">Ev.N°000{content.data.eval_id}</h2>
                        <h3 className="text-zinc-600 text-xs sm:text-sm font-thin">
                          <span className="font-bold">Fecha Planificada:&nbsp;</span> 
                          {content.data.date_inicio_planif}
                        </h3>
                        <h4 className="text-xs sm:text-sm">
                          <span className="">Criterio n°</span>
                          {content.data.instance_key+1}
                        </h4>                       

                            <RenderInstance content={content} selectedCheck={selectedCheck} obs={obs} />                         
                        
                      </div>
                    

                </div>
              ) : (
                
                <div className="flex">
                  <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>

              
              )}
                              
          </div>
        </>
        
      );
  //  }
*/


  } 
 
  
  return (
    
      <div 
        className={`      `}>
        
      
        <div className={`flex flex-col
                    
                    ${showModal && (
                      `hidden`
                    )
                    }
                    
        `} >
          
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Mis Evaluaciones</h1>

              {message && (
                <div className="form-group">
                  <div className="alert alert-info" role="alert">
                    {message}
                  </div>
                </div>
              )}
              {error && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>
              )}
            
                {user &&


                  <EvalsList uId={user.uId} />


                }
                {!user &&
          
                  <p>Favor <Link to="/Login"> ingrese </Link> para ver evaluaciones disponibles.</p>
          
                }
                               
        
        </div>   
        
        {evalId &&(

          <div className="absolute flex top-0 left-0 m-0 w-full overflow-hidden h-screen">
            
            {/**/}
            <div id="overlay" className="absolute z-30 bg-slate-600 opacity-80 w-full h-screen"></div>
            <EvalRun />

          </div>


        )}

       
            
      </div>
  );

  
};


