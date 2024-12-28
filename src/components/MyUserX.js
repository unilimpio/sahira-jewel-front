import React, { useState, useEffect, useId} from "react";
import { Link } from "react-router";





import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';



export default function MyUserX () {

  const user = AuthService.getCurrentUser();
  
  const [serviceId, setServiceId] = useState(false);
  
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  

  
  function ServicesList({uId}){   
    
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

          UserService.getServices(options.uId).then(

              (response) => {

                if(!ignore){
                
                  setListContent(response?.data);
                  
                  

                  if(response?.data.message){
                    
                    
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

    const RunButton = ({serviceId}) => {

      function handleClick (){
      
        setMessage(false);
        setError(false);
        setLoading(true);
        setListContent(''); 
        
        setServiceId(serviceId);
        console.log(serviceId)
        
        
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
                        Ubicacion
                      </td>
                      <td className="p-2"  >
                        Nombre</td> 
                      
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
                      { row.ubicacion_name+`[${row.ubicacion_id}]` }
                    </td>
                    <td className="p-2 " id={'td-verif_name'+row.id}   >
                      { row.name }
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
          
              <p className="text-sm md:text-md mb-0">Estas son los servicios habilitadas para su usuario / organización ({uId}): </p>
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


  function FeedBackLive(){   
    
    
    
    
    
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState(false);
    const [content, setContent] = useState('');//the whole data object returned by the api call
    const [service, setService] = useState(false);//the service state (name, etc)
    const [uxValue, setUxValue] = useState("");//stores the user selection (THE feedback)
    const [comments, setComments] = useState("");
    //const [badUxValue, setbadUxValue] = useState("");//stores the user selection after he gives bad feedback (example which options to show after a bad feedback)
    

    //simple strings for the buttons, choose your own!
    const emoji5 = `😄`;
    const label5 = `Muy Satisfecho`;

    const emoji4 = `🙂`;
    const label4 = `Satisfecho`;

    const emoji3 = `😐`;
    const label3 = `Neutral`;

    const emoji2 = `😠`;
    const label2 = `Insatisfecho`;

    const emoji1 = `🤬`;
    const label1 = `Muy Insatisfecho`;    

    const emojiClose = `❌`;
    const labelClose = `Cerrar`;

    const emojiSave = `✅`;
    const labelSave = `Guardar`;

    
   



    
  
    useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
      try { 

        UserService.getService(serviceId).then(

            (response) => {

              setContent(response?.data);
              setService(response.data?.service);
              setService(response.data?.message);
              
              console.log(content);
              
              console.log(response?.data);              
              
            
            
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
        setServiceId(false);
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

    


    

    const RenderInterface = () => { 
   


      
      
      

      function CancelProcessing() {
                  
                  setUxValue(null);
                  setComments("");
                  setLoading(false);
                  setServiceId(null);
                
                  

      }
      

      function handleSubmit(event) {

        event.preventDefault();

        const form = event.target;

        const formData = new FormData(form);
        const values = [...formData.entries()];
        const formElements = form.elements;
        
        const onSubmitComments = formData.get("comments");
        const onSubmitUxValue = formData.get("ux-feedback-value");

        
        
        console.log(values);
        
        console.log(form);
        
        console.log(formElements);
        
        console.log(onSubmitComments);

        console.log(onSubmitUxValue);
        
       

        if (!error) {
                    
          const data = {

            feedback_value: parseInt(formData.get("ux-feedback-value")),
            comments: formData.get("comments"),
  
          }
          console.log(data);
              
          UserService.setUx(serviceId, data )
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
        

        
        
      }     

      
       

      const RadioButton = ({className, children, clave}) => {       
        
        const [isChecked, setIsChecked] = useState(false);
        
        const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 rounded-md flex items-center `;
        const inputClassName = ` mr-2 ` + className;
        
        const id = useId();

        
          return (  
            
          <div className="">
            <label htmlFor={`ux-feedback-radio-`+id} className={`` + labelClassName}>    
              <input type="radio"
                    id={`ux-feedback-radio-`+id}
                    name={`ux-feedback-value`}
                    value={clave}
                    
                    className={
                                        
                      inputClassName + ` `
  
                    } 
                    
                    onChange={(e)=>{
                      //setIsPasaChecked(false);
                      //setIsNoPasaChecked(true);
                      //handleCheck(e);
                      setIsChecked(!isChecked);
                      setUxValue(clave);
                      console.log('selected Check noted! value:'+clave );
  
                    
                    }}
                  
                  
                    
                    
              />
              
                {children}
            </label> 
            
            
          </div>   
      
          );
        
        

      } 

      const CommentsInput = ({className, children}) => {

        const [comments, setComments] = useState("");
        
        
        function handleChange(e){

          const value = e.target.value;
  
          console.log(value);
  
          return setComments(value);
  
          
  
        }
        

        return (

          <label htmlFor="comments" className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">{children}:
                    
          <br/>  <textarea 
              className={className + 
                `text-sm font-thin 
                border-zinc-800 
                border rounded-md 
                focus:shadow-sm 
                focus:ring-slate-500 focus:ring-1 focus:outline-none
                
                
              `}
              name="comments" 
              id="comments"
              
              
              value={comments}
              cols="32"
              onChange={ handleChange }
             
                      
                      
            /> 
          </label>
        );
      }

      
    
      return(
    
          <form id="ux-feedback-form" onSubmit={handleSubmit}  className="">

            <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 text-wrap ">
                    <h3 className="text-sm font-thin bg-slate-200">
                      Por favor califique su experiencia en este servicio. &nbsp;
                      <span className="text-zinc-500 font-extrathin">
                        {`${service.service_name} ${service.service_reference} [${service.service_id}]`}
                        
                      </span>.
                      
                    </h3>
                    
                    
                    

                    <div className="flex flex-row justify-evenly">

                      
                        <RadioButton className="w-8 h-8 " clave="1">{`${emoji1} ${label1}`}</RadioButton>
                        <RadioButton className="w-8 h-8 " clave="2">{`${emoji2} ${label2}`}</RadioButton>
                        <RadioButton className="w-8 h-8 " clave="3">{`${emoji3} ${label3}`}</RadioButton>
                        <RadioButton className="w-8 h-8 " clave="4">{`${emoji4} ${label4}`}</RadioButton>
                        <RadioButton className="w-8 h-8 " clave="5">{`${emoji5} ${label5}`}</RadioButton>
                        
                        
                        
                        
                    </div>
                    <div className="mx-auto">
                      <CommentsInput className="">Comentarios (opcional)</CommentsInput>


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
                        `}>{`${emojiSave} ${labelSave}`}
                        
                    </SaveButton>
                    
                    <CancelButton 
                      className=" ">
                        
                        {`${emojiClose} ${labelClose}`}
                    </CancelButton>           
                    
                  </>
                
                )}
              
            </div>
    
    
            
          </form>
        
      );

      
  
    }

    const RenderFinal = ()=> { 
   
      

      
      
      return(
  
          
        <>
            <div className=" flex flex-col 
                  sm:flex-row sm:justify-start 
                  sm:w-fit sm:pl-12 my-2
                  ">
                    <p className="text-sm font-thin ">
                      <span className="text-lime-500 font-bold text-lg">
                        Gracias por su feedback.&nbsp;
                        
                          
                      </span>.<br/>
                      Servicio calificado:  {`${service.service_name} ${service.service_reference} [${service.service_id}]`}
                    </p>
                                             
            </div>   
                  
    
            <div className=" flex sm:pl-12 sm:w-8/12 justify-evenly sm:justify-start my-2">
                
                    
                    <CancelButton 
                      className=" ">
                        {`${emojiClose} ${labelClose}`}
                    </CancelButton>           
                    
                  
              
            </div>
    
        </>
            
          
        
      );


      
      
  
    }




  
    return (
        
        
          <div className="w-11/12 mx-auto p-2 ">
              
              
              {content && (

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

                  <div id="app-logo" className="justify-center opacity-50">  
                    <Link to={"/"} className="hover:no-underline">
                          <div id="brand" className="container flex-col  px-1 py-1 m-0">
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
                  </div>

                  <div className="flex flex-row p-1 ">
                      
                      
                    <div className="flex flex-col">

                        

                        <h2 className="m-1 grow                       
                        text-stone-500 text-xl md:text-4xl text-left
                          font-black ">
                          📢FeedBackLive!
                        </h2>

                    </div>
                    

                     

                      

                    
                    <div className="z-50" >  
                             
                             
                              {(serviceId) ? (

                                <RenderInterface />

                              ) : (

                                
                                  <RenderFinal  />
                                
                                

                              )}
                    </div>        
                    {<img src={logoUni} alt="logo Unilimpio" className="w-64 h-64 opacity-5 absolute right-2 bottom-2 z-20" />}        
                                              

                                                     
                        
                      
                    

                  </div>
            
                              
                </div>
          
            )}                 
          </div>
    );
 


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


                  <ServicesList uId={user.uId} />


                }
                {!user &&
          
                  <p>Favor <Link to="/Login"> ingrese </Link> para ver servicios disponibles.</p>
          
                }
                               
        
        </div>   
        
        {serviceId &&(

          <div className="absolute flex top-0 left-0 m-0 w-full  h-screen">
            
            {/**/}
            <div id="overlay" className="absolute z-30 bg-slate-600 opacity-80 w-full h-screen"></div>
            <FeedBackLive />

          </div>


        )}

       
            
      </div>
  );

  
};


