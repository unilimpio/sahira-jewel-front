import React, { useState, useEffect, useId} from "react";
import { Link } from "react-router";

import Logo from "./common/Logo";


import Template from "./common/template/Template";
import AlertBox from "./common/template/AlertBox";


import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';



export default function MyTasks () {

  const user = AuthService.getCurrentUser();
  
  const [taskId, setTaskId] = useState(false);
  
  const [showModal, setShowModal] = useState(false);

  

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  const wrapperClass = `w-full h-full p-4 mb-4 mx-auto border border-slate-600  rounded-lg md:rounded-b-none  shadow-md bg-gradient-to-br from-neutral-200 via-white to-neutral-200`;


  
  function TasksList({uId}){   
    
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

          UserService.getTasks(options.uId).then(

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

    const RunButton = ({taskId}) => {

      function handleClick (){
      
        setLoading(true); 
        setMessage(false);
        setError(false);
        
        setListContent(''); 
        
        setTaskId(taskId);
        console.log(taskId);
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

    const ViewButton = ({taskId}) => {

      function handleClick (){
      
        setLoading(true); 
        setMessage(false);
        setError(false);
        
        setListContent(''); 
        
        setTaskId(taskId);
        console.log(taskId);
        
        
        setShowModal(true);
      
      }
    
      return (
  
  
        <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                onClick={handleClick}>
          <svg viewBox="0 -4 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-260.000000, -4563.000000)" fill="#000000">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M216,4409.00052 C216,4410.14768 215.105,4411.07682 214,4411.07682 C212.895,4411.07682 212,4410.14768 212,4409.00052 C212,4407.85336 212.895,4406.92421 214,4406.92421 C215.105,4406.92421 216,4407.85336 216,4409.00052 M214,4412.9237 C211.011,4412.9237 208.195,4411.44744 206.399,4409.00052 C208.195,4406.55359 211.011,4405.0763 214,4405.0763 C216.989,4405.0763 219.805,4406.55359 221.601,4409.00052 C219.805,4411.44744 216.989,4412.9237 214,4412.9237 M214,4403 C209.724,4403 205.999,4405.41682 204,4409.00052 C205.999,4412.58422 209.724,4415 214,4415 C218.276,4415 222.001,4412.58422 224,4409.00052 C222.001,4405.41682 218.276,4403 214,4403" id="view_simple-[#815]"/>
                      </g>
                    </g>
                  </g>
                </svg>
          
          
  
        </button>
  
      );
    }  

    function RenderList({listContent}){
  
    
      if(listContent){
    
        return(
          <div className="mt-2 mb-4">
                
            <table id="eval-display" 
              className="bg-white opacity-90 text-[10px] sm:text-sm shadow-md rounded-sm">
                             
            
                  <thead id="table-evals-display-head" 
                          className="border border-b-zinc-300 " >
                    <tr className="bg-gradient-to-b from-stone-300 to-white  font-semibold">
                      <td className="p-1"   >
                        id#
                      </td>
                      <td className="p-1"   >
                        Fecha Plazo:
                      </td>
                      <td className="p-1"  >
                        Tarea
                      </td> 
                      <td className="p-1">Status</td>
                      <td className="p-1">Accion</td>
  
                    </tr>
  
  
  
                  </thead>
                  <tbody className="text-zinc-600 ">
            
              
              {
                listContent.tasks.map(row => (
                  
                  <tr className="" key={'tr-'+row.id} >
                    <td className="p-2" id={'td-id'+row.id}   >
                      { row.id  }
                    </td>
                    <td className="p-2 " id={'td-due_date'+row.id}   >
                      { row.due_date }
                    </td>
                    <td className="p-2 " id={'td-task'+row.id}   >
                      { row.task }
                    </td> 
                    <td className="p-2">
                    { row.is_complete && (
                       ` ✅`
                    ) }
                    </td>
                    <td className="p-2">
                      {row.is_complete ? (<ViewButton taskId={row.id}/>) : (<RunButton taskId={row.id}/>)}
                      
                      
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
          
              <p className="text-sm md:text-md mb-0">Estas son las tareas asignadas a su usuario ({uId}): </p>
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


  function TaskView({taskId}){   
    
    const [selectedCheck, setSelectedCheck] = useState("");
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState(false);
    const [content, setContent] = useState(null);

    

    console.log(taskId);
    //simple strings for the buttons, choose your own!
    const strSave = `✅ Aceptar y Continuar`;
    const strCancel = `❌ Cancelar`;
    const strBack = ` Regresar`;

  
    useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
      try { 

        UserService.getTask(taskId).then(

            (response) => {

              setContent(response.data);
              
              console.log(response);
              
              console.log(response.data);              
              
            
            
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
        //setContent(null);
        

    };
  
    }, [taskId]);

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
      
        setMessage('Operacion cancelada por el usuario.');
        
        //setError('Atención: la tarea no se ha completado! No olvide completarla más adelante.')
        console.log('cancelled by the user');
        setLoading(false);
        setContent(''); 
        setTaskId(false);
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
        setTaskId(false);
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
                  hover:bg-white bg-zinc-50 border border-zinc-400 
                  text-slate-700 text-sm font-thin hover:no-underline
                  `
                } 
                disabled={loading} onClick={handleClick}>
          
          <span className="   text-2xl -my-2 mx-1 ">⤺</span>{strBack}
            
        </button>
  
      );
    } 


    const CheckButton = ({className, children, idPrefix, checked, isView}) => {       

      const [isChecked, setIsChecked] = useState(checked);

      const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 rounded-md flex items-center `;
      const inputClassName = ` mr-2 ` + className;

      const id = useId();


      return (  

        <div className="">
          <label htmlFor={idPrefix+id} className={`` + labelClassName}>    
            <input type="checkbox"
                  id={idPrefix+id}
                  name={`is_complete`} 
                  value={1}
                  className={
                                      
                    inputClassName + ` `

                  }
                  onChange={(e)=>{
                    //setIsPasaChecked(false);
                    //setIsNoPasaChecked(true);
                    //handleCheck(e);
                    setIsChecked(!isChecked);
                    console.log('selected Check noted! value:Tarea CUmplida(1)' );
                  }}                
                  checked={isChecked}
                  disabled={isView}
            />
            
              {children}
          </label> 
          
          
        </div>   

      );



    } 

    const ObsInput = ({className, obsInitial, isView}) => {

    const [obs, setObs] = useState(obsInitial);


    function handleChange(e){

    const value = e.target.value;

    console.log(value);

    return setObs(value);



    }


    return (

    <label htmlFor="obs" className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">Comentarios(Opcional):
            
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
      disabled={isView}
              
              
    /> 
    </label>
    );
    }

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
      setLoading(true);
      const form = event.target;

      const formData = new FormData(form);
      const values = [...formData.entries()];
      const formElements = form.elements;

      const onSubmitObs = formData.get("obs");
      const onSubmitCheck = formData.get("is_complete");



      console.log(values);

      console.log(form);

      console.log(formElements);

      console.log(onSubmitObs);

      console.log(onSubmitCheck);



      if (!error) {
              
      const data = {

      is_complete: parseInt(formData.get("is_complete")),
      obs: formData.get("obs"),

      }
      console.log(data);
        
      UserService.updateTask(taskId, data )
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
              setShowModal(false);

              setTaskId(null);
              
              
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

    const RenderContent = ({task}) => { 

      const [isView, setIsView] = useState(task.task_is_complete);
    
      return(
    
          <form id="taskView" onSubmit={handleSubmit}  className="container mx-auto">

            <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 text-wrap ">
                    <h3 className="text-sm font-thin bg-slate-200">
                      
                        
                      <span className="text-slate-700 font-bold">
                      {"["+task.task_id+"]"}{task.task_task}
                        
                      </span>
                    </h3>
                    
                    <h4 className="text-sm font-thin text-zinc-700 bg-slate-100 text-left text-ellipsis overflow-hidden ">Descripcion: {task.task_description}</h4>
                    

                    <div className="flex flex-row justify-evenly">

                      
                        <CheckButton className="w-8 h-8 " idPrefix={`tarea-cumplida-`} checked={task.task_is_complete} isView={isView}>Tarea Cumplida</CheckButton>
                        
                        
                        {/*<PasaButton clave="1" isChecked={isPasaChecked}> Pasa</PasaButton>*/}   
                        {/*<NoPasaButton clave="0" isChecked={isNoPasaChecked}> No Pasa</NoPasaButton>*/}
                        
                    </div>
                    <div className="mx-auto">
                      
                      <ObsInput className="" obsInitial={task.task_obs ? (`${task.task_obs}`) : ``} isView={isView}/>
                      {
                        isView && (
                          
                          <span className="-mt-4 font font-extralight text-xs italic float-right">{`actualizado el :${task.task_obs ? (`${task.task_date_updated}`) : ``}`}</span>

                        )


                      }

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
                    {isView ? (<BackButton className="">Regresar</BackButton>)
                      :
                      (<>
                      <SaveButton 
                        className={`
                          `}>
                          {strSave}
                      </SaveButton>
                      
                      <CancelButton 
                        className=" ">
                          {strCancel}
                      </CancelButton>  
                      </>)
                    }
                             
                    
                  </>
                
                )}
              
            </div>
    
    
            
          </form>
        
      );

    }

    return (
        
        <>
          <div className="flex w-11/12 h-fit self-center mx-auto p-2  ">
              
              
              {content ? (

                <div id="taskView-modal" 
                    className="mx-auto  my-2 flex flex-col   
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
                          📋&nbsp;Task. N°{taskId}
                        </h2>

                      </div>
                    </div>

                    <div className="" >  
                             
                      <RenderContent task={content.task}/>

                    </div>  

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
          
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Mis Tareas</h1>

              {message && (
                  
                  <AlertBox message={message} type="info"/>
                 
                )}
              {error && (
                  <AlertBox message={error} type="error"/>
                  
                )}
            
                {user &&


                  <TasksList uId={user.uId} />


                }
                {!user &&
          
                  <p>Favor <Link to="/Login"> ingrese </Link> para ver evaluaciones disponibles.</p>
          
                }
                               
        
        </div>   
        
        {taskId &&(

          <div className="absolute flex top-0 left-0 m-0 w-full  h-screen">
            
         
            <div id="overlay" className="absolute z-30 bg-slate-600 opacity-80 w-full h-screen"></div>
            <TaskView taskId={taskId}/>

          </div>


        )}

        
            
        </div>
      </Template>
  );

  
};


