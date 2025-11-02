import React, { useState, useEffect, useId} from "react";
import { Link } from "react-router";

import Logo from "./common/Logo";


import Template from "./common/template/Template";
import AlertBox from "./common/template/AlertBox";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';


export default function MyCompliance () {

  const user = AuthService.getCurrentUser();
  
  const [evalId, setEvalId] = useState(false);
  
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  const wrapperClass = `w-full h-full p-4 mb-4 mx-auto border border-slate-600  rounded-lg md:rounded-b-none  shadow-md bg-gradient-to-br from-neutral-200 via-white to-neutral-200`;


  
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
          <div className="mt-2 mb-4 max-h-48 overflow-y-auto">
                
            <table id="eval-display" 
              className="bg-white opacity-90 text-[10px] sm:text-sm shadow-md rounded-sm">
                             
            
                  <thead id="table-evals-display-head" 
                          className="border border-b-zinc-300 " >
                    <tr className="bg-gradient-to-b from-stone-300 to-white  font-semibold sticky top-0 z-40">
                      <td className="p-1"   >
                        id#
                      </td>
                      <td className="p-1"   >
                        Fecha de Inicio Planificada
                      </td>
                      <td className="p-1"  >
                        Lista de Verificación
                      </td> 
                      <td className="p-1">Estado</td>
                      <td className="p-1">Accion</td>
  
                    </tr>
  
  
  
                  </thead>
                  <tbody className="text-zinc-600 ">
            
              
              {
                listContent.evals.map(row => (
                  
                  <tr className="even:bg-gray-50 odd:bg-white" key={'tr-'+row.id} >
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

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
      try { 

        UserService.getEvalState(evalId).then(

            (response) => {

              setContent(response.data);
              setInstance(response.data.state.instance_key);
              setState(response.data.state);
              setCriterios(response.data.criterios);
              setCurrent(response.data.current);
              
              console.log(content);
              
              console.log(response);              
              
            
            
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
        
     
      // Clean up the event listener when the component unmounts
      return () => {
        //this is the reset state of the scroll blocking above
        //document.body.style.overflow = "scroll"

        

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

            <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 text-wrap ">
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
                    
                    <h4 className="text-sm font-thin text-zinc-700 bg-slate-100 text-left text-ellipsis overflow-hidden ">Descripcion: {current.descripcion}</h4>
                    

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
    
            <div className=" flex justify-evenly my-2">
                
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

    return (
        
        <>
          <div className="w-11/12 mx-auto p-2 ">
              
              
              {content ? (

                <div id="eval-modal" 
                    className="  my-2 flex flex-col   
                        bg-gradient-to-br from-white  to-zinc-200  
                        z-50 relative
                        rounded-md shadow-md 
                        border border-zinc-800 py-3 px-2
                        ">
                          
                      {message && (
                        
                          <div className="alert alert-info" role="alert">
                            {message}
                          </div>
                        
                      )}

                  <Logo mainColor={"cyan-500"}/>

                    <div className="flex flex-row p-1 place-content-between">
                      
                      
                      <div className="flex flex-col">

                        

                          <h2 className="m-1 grow                       
                        text-stone-500 text-xl md:text-4xl text-left
                          font-black ">
                          📋&nbsp;Eval. N°{evalId}
                        </h2>

                      </div>
                    

                     

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
                  {<img src={logoUni} alt="logo Unilimpio" className="w-64 h-64 opacity-5 absolute right-2 bottom-2 z-20" />}        
                                              

                                                     
                        
                      
                    

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

  } 
  
  return (
    
    <Template>
        <div 
        className={`      `+wrapperClass}>
        
      
        <div className={`flex flex-col
                    
                    ${showModal && (
                      `hidden`
                    )
                    }
                    
        `} >
          
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Mis Evaluaciones</h1>

              {message && (
                  
                  <AlertBox message={message} type="info"/>
                 
                )}
              {error && (
                  <AlertBox message={error} type="error"/>
                  
                )}
            
                {user &&


                  <EvalsList uId={user.uId} />


                }
                {!user &&
          
                  <p>Favor <Link to="/Login"> ingrese </Link> para ver evaluaciones disponibles.</p>
          
                }
                               
        
        </div>   
        
        {evalId &&(

          <div className="absolute flex top-0 left-0 m-0 w-full  h-screen">
            
            {/**/}
            <div id="overlay" className="absolute z-30 bg-slate-600 opacity-80 w-full h-screen"></div>
            <EvalRun />

          </div>


        )}

        
            
        </div>
      </Template>
  );

  
};


