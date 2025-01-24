import React, { useState, useEffect, useId} from "react";
import { Link, Navigate} from "react-router";


import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';

import Logo from "./common/Logo";





export default function MyUserX () {

  
  
  const [serviceId, setServiceId] = useState(false);
  
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  
  const user = AuthService.getCurrentUser();
  //const [user, setUser] = useState(AuthService.getCurrentUser());

  
  
 
  
  
  function ServicesList(){   
    
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
                  
                  

                  if(response?.data?.message){
                    
                    
                  }
                  console.log(response?.data?.message)

                }
              
              },

              (error) => {
                const _content =
                  (error?.response && error?.response.data) ||
                  error?.message ||
                  error?.toString();
                
                setListContent(_content);
                setError(true);
                
              
              }
            
          )

        
      }  

 
      return () => {

        ignore = true;
        
        if(error){
          return <Navigate to="/landingPage" replace={true} />
        }

      };
  
    }, []);

    const FblButton = ({serviceId}) => {

      function handleClick (){
      
        setMessage(false);
        setError(false);
        setLoading(true);
        setListContent(''); 
        
        setServiceId(serviceId);
        
        
        
        setShowModal(true);
      
      }
    
      return (
  
  
        <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                onClick={handleClick}>📢
          {/*<svg  className="w-4 h-4 " viewBox="0 0 512 512"> 
    
            <path className=" fill-green-400 " d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256
              C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031
              c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031
              l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"/>
  
          </svg>*/}
          
          
  
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
                listContent.services.map(row => (
                  
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
                      <FblButton serviceId={row.id}/>
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
          
              <p className="text-sm md:text-md mb-0">Estas son los servicios habilitadas para su usuario / organización ({user.uId}): </p>
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
    const [feedbackValue, setFeedbackValue] = useState("");//stores the user selection (THE feedback)
    const [comments, setComments] = useState("");

    const [isBadUx, setIsBadUx] = useState(false);

    const [uxId, setUxId] = useState(false);

    const [badUxId, setBadUxId] = useState(null);
    const [badComments, setBadComments] = useState(null);
    
    const [alertCriterios, setAlertCriterios] = useState("");
    //default values
    const [alertMode, setAlertMode] = useState(true);
    const [alertLevel, setAlertLevel] = useState(2);

    

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
    const labelClose = `Cancelar`;

    const emojiSave = `✅`;
    const labelSave = `Enviar`;

    
   
  
    useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
      try { 

        UserService.getService(serviceId).then(

            (response) => {

              setContent(response);
              setService(response.data?.service);
              setAlertCriterios(response.data?.alert_criterios);
              setMessage(response.data?.message);
              setAlertMode(response.data?.service.alert_mode);
              setAlertLevel(response.data?.service.alert_value);
              
              console.log(response);
              console.log(response.data?.alert_criterios);
              console.log(response.data?.service.alert_mode);       
              console.log(response.data?.service.alert_value);
            
            
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

    const SaveButton = ({loading, className, children}) => {

      if(loading){
        
        return (   
          <button className={className + ` bg-slate-600 border-1 border-white  rounded-md m-1 p-1 relative text-left`} disabled={loading}>
            <svg className="absolute left-1 animate-spin h-6 w-6 fill-white" viewBox="0 0 24 24">
              <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
            </svg>
            <span className="text-white ml-8">Loading</span>
          </button>   
        );
      
      } else {

        return (   
  
            
          <button  type="submit" id="submit"
                  className={className + 
                    `m-1 p-1 rounded-md border border-white 
                    
                    bg-gradient-to-b from-sky-400 to-sky-800 
                        hover:shadow-md hover:bg-sky-600 
                    transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-150
                    `                    
                  } 
                  disabled={loading} >
            
            <span className="mx-1 text-white font-semibold text-sm">{children}</span>
            
            
            
    
          </button>
                
        );

      }      
      
    
    }

    const CancelButton = ({className, children}) => {

      function handleCancel (){
      
        //setMessage('Evaluación cancelada por el usuario. Puede continuar más tarde desde él último criterio verificado.');
        setError('Feedback cancelado por el usuario.')
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
   

       //STATE
       const [isRadio, setIsRadio] = useState(0);
       const [isComments, setIsComments] = useState("");
       const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 m-1 rounded-md flex flex-row items-center `;
       const inputClassName = ` m-2 w-8 h-8`;
       const [ready2Go, setReady2Go] = useState(false);
      

      function CancelProcessing() {
                  
                  setFeedbackValue(null);
                  setComments("");
                  setLoading(false);
                  setServiceId(null);
                
                  

      }
      

      function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);

        const form = event.target;

        const formData = new FormData(form);
        const values = [...formData.entries()];
        const formElements = form.elements;
        
        const onSubmitComments = formData.get("comments");
        const onSubmitFeedbackValue = formData.get("ux-feedback-value");
        const onSubmitBadUxId = formData.get("bad-ux-feedback-id");
        const onSubmitBadComments = formData.get("bad-comments");

        setFeedbackValue(onSubmitFeedbackValue);
        setComments(onSubmitComments);
        setBadUxId(onSubmitBadUxId);
        setBadComments(onSubmitBadComments);
                                
        console.log(values);
        
        console.log(form);
        
        console.log(formElements);
        
        console.log(onSubmitComments);

        console.log(onSubmitFeedbackValue);
        console.log(onSubmitFeedbackValue <= alertLevel)
        console.log(alertMode);
        console.log(ready2Go);

        if(onSubmitFeedbackValue <= alertLevel){
          if(alertMode){            

            console.log("alert mode is on");
            setIsBadUx(true);
            return setLoading (false);


          } 
        //setLoading (false);
        } else {
          console.log("we are ready to go");
          setReady2Go(1);
          console.log(ready2Go);
          


        }  //setReady2Go(true);

          console.log(ready2Go);

        

          console.log("beginning API post call");
          console.log(loading);

          if (!error) {
                      
            const data = {
  
              //feedback_value: parseInt(formData.get("ux-feedback-value")),
              //comments: formData.get("comments"),
              //feedback_value: parseInt(onSubmitUxValue, 10),
              feedback_value: onSubmitFeedbackValue,
              comments: onSubmitComments,
              bad_ux_id: badUxId,
              bad_comments: badComments,
  
    
            }
  
            console.log(data);
                
            UserService.setUx(serviceId, data )
                .then(
                  (response) => {
                  
                      console.log(response);
                      
                      if(response.status === 204){
                        setError(error + response.statusText)
                        CancelProcessing();
                      
                      }
  
                      setUxId(response.data?.ux_id);

                      console.log(response.status);
                      console.log(response.statusText)
                      
                      
                      console.log(response.data?.message)
                      
                      setMessage(response.data?.message)
                      
                      setLoading (false);
                      return setContent(response.data);
      
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

      

      // HANDLE THE ONCHANGE HERE

      const handleChange = (e) => {
        // string passed in
        // a string returned by default
        console.log(e.currentTarget.value);
        // add + to the event to make the value a number
        setIsRadio(+e.currentTarget.value);
      };

      const handleComments = (e) => {
        // string passed in
        // a string returned by default
        console.log(e.currentTarget.value);
        // add + to the event to make the value a number
        setIsComments(e.currentTarget.value);
      };

      
       

      /*const RadioButton = ({className, children, clave}) => {       
        
        const [isChecked, setIsChecked] = useState(false);
        
        const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 m-1 rounded-md flex flex-col items-center `;
        const inputClassName = ` m-2 ` + className;
        
        const id = useId();
        function handleCheck(e){

          const value = e.target.value;
          
          setIsChecked(!isChecked);
          
          console.log('selected Check noted! value:'+value);
          
  
          return setUxValue(value);
  
          
  
        }
        
          
          
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
                      
                      onChange={handleCheck}
                    
                    
                      
                         
                />
                
                  {children}
              </label> 
              
              
            </div>   
        
          );

        
          
        
        

      }*/

      /*const CommentsInput = ({className, children}) => {

        const [comments, setComments] = useState("");
        
        const id = useId();

        function handleChange(e){

          const value = e.target.value;
  
          console.log(value);
  
          return setComments(value);
  
          
  
        }
        

        return (

          <label htmlFor={`comments`+id} className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">{children}:
                    
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
              cols="64"
              onChange={ handleChange }
             
                      
                      
            /> 
          </label>
        );
      }*/

      
    
      return(
    
          <form id="ux-feedback-form" onSubmit={handleSubmit}  className="">

            <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 text-wrap bg-opacity-50">
                    <h2 className="m-1  text-center                       
                        text-stone-500 text-xl md:text-4xl 
                          font-black ">
                          📢FeedBackLive!
                    </h2>
                    
                    
                    
                    <h3 className="text-sm font-thin ">
                      Por favor califique su experiencia con este servicio:<br/>
                      <span className="text-zinc-500 font-extrathin  text-xs">Sevicio:
                        <span className="bg-slate-200">
                          {`${service.name}  [id: ${service.id}]`}
                        </span>
                        
                      </span>. 
                      
                    </h3>
                    
                    
                    <div className="container" id="options-holder">

                      
                      <div className='flex flex-col sm:flex-row justify-evenly overflow-y-scroll'>
                        
                          <label htmlFor='radio1' className={labelClassName}>
                            <input
                              className={inputClassName}
                              type='radio'
                              id='radio1'
                              name="ux-feedback-value"
                              value='1'
                              onChange={handleChange}
                              checked={isRadio === 1}
                            />
                            <span className={(isRadio === 1)&&`animate-bounce`}>{emoji1}</span>{` `+label1}
                          </label>
                          <label htmlFor='radio2'
                            className={labelClassName}>
                            <input
                              className={inputClassName}
                              type='radio'
                              id='radio2'
                              name="ux-feedback-value"
                              value='2'
                              onChange={handleChange}
                              checked={isRadio === 2}
                            />
                            <span className={(isRadio === 2)&&`animate-bounce`}>{emoji2}</span>{` `+label2}
                          </label>
                          <label htmlFor='radio3' 
                            className={labelClassName}>
                            <input
                              className={inputClassName}
                              type='radio'
                              id='radio3'
                              name="ux-feedback-value"
                              value='3'
                              onChange={handleChange}
                              checked={isRadio === 3}
                            />
                            <span className={(isRadio === 3)&&`animate-bounce`}>{emoji3}</span>{` `+label3}
                          </label>
                          <label htmlFor='radio4' 
                          className={labelClassName}>
                          <input
                            className={inputClassName}
                            type='radio'
                            id='radio4'
                            name="ux-feedback-value"
                            value='4'
                            onChange={handleChange}
                            checked={isRadio === 4}
                          />
                          <span className={(isRadio === 4)&&`animate-bounce`}>{emoji4}</span>{` `+label4}
                          </label>
                          <label htmlFor='radio5' className={labelClassName}>
                          <input
                            className={inputClassName}
                            type='radio'
                            id='radio5'
                            name="ux-feedback-value"
                            value='5'
                            onChange={handleChange}
                            checked={isRadio === 5}
                          />
                          <span className={(isRadio === 5)&&`animate-bounce`}>{emoji5}</span>{` `+label5}
                          </label>
                        
                      </div>  
                        
                        
                        
                    </div>
                    <div className="mx-auto">
                      
                      
                      <label htmlFor={`comments`} className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">
                        {`Comentarios (opcional):`}
                    
                        <br/>  
                        <textarea 
                          className={ 
                            `text-xs font-thin 
                            border-zinc-800 
                            border rounded-md 
                            focus:shadow-sm 
                            focus:ring-slate-500 focus:ring-1 focus:outline-none
                            
                            
                          `}
                          name="comments" 
                          id="comments"
                          
                          cols="32"
                          value={isComments}
                          
                          onChange={ handleComments }
                        
                                  
                                  
                        /> 
                      </label>


                    </div>
                    
                    <div className=" flex justify-evenly my-2">
                
                      
                        <>
                          <SaveButton
                            loading={loading} 
                            className={`
                              `}>{`${emojiSave} ${labelSave}`}
                              
                          </SaveButton>
                          
                          <CancelButton 
                            className=" ">
                              
                              {`${emojiClose} ${labelClose}`}
                          </CancelButton>           
                          
                        </>
                      
                   
              
                    </div>

                    
                    
                        
            </div>   
            {error && (
                          
                          <div className="alert alert-danger " role="alert">
                              {error}
                          </div>
                                  
            )}      
    
            
    
    
            
          </form>
        
      );

      
  
    }

    const RenderBadUxInterface = () => { 
   

      //STATE
      const [isRadio, setIsRadio] = useState(0);
      const [isComments, setIsComments] = useState("");
      
      const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 m-1 rounded-md flex flex-row items-center `;
      const inputClassName = ` m-2 w-8 h-8`;
     

     function CancelProcessing() {
                 
                 setFeedbackValue(null);
                 setComments("");
                 setLoading(false);
                 setServiceId(null);
               
                 

     }
     

     function handleSubmit(event) {

       event.preventDefault();
       setLoading(true);

       const form = event.target;

       const formData = new FormData(form);
       const values = [...formData.entries()];
       const formElements = form.elements;
       
       const onSubmitBadComments = formData.get("bad-comments");
       const onSubmitBadUxId = formData.get("bad-ux-feedback-id");

       setBadUxId(onSubmitBadUxId);
       setBadComments(onSubmitBadComments);
       
       
       console.log(values);
       
       console.log(form);
       
       console.log(formElements);
       
       console.log(onSubmitBadComments);

       console.log(onSubmitBadUxId);
       
      

       if (!error) {
                   
         const data = {

           //feedback_value: parseInt(formData.get("ux-feedback-value")),
           //comments: formData.get("comments"),
           //feedback_value: parseInt(onSubmitUxValue, 10),
           feedback_value: feedbackValue,
           comments: comments,
           bad_ux_id: onSubmitBadUxId,
           bad_comments: onSubmitBadComments,

 
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

     // HANDLE THE ONCHANGE HERE

     const handleChange = (e) => {
       // string passed in
       // a string returned by default
       console.log(e.currentTarget.value);
       // add + to the event to make the value a number
       setIsRadio(e.currentTarget.value);

     };

     const handleComments = (e) => {
       // string passed in
       // a string returned by default
       console.log(e.currentTarget.value);
       // add + to the event to make the value a number
       setIsComments(e.currentTarget.value);
     };

     
   
     return(
   
         <form id="ux-feedback-form" onSubmit={handleSubmit}  className="">

           <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 text-wrap bg-opacity-50">
                   <h2 className="m-1  text-center                       
                       text-stone-500 text-xl md:text-4xl 
                         font-black ">
                         📢FeedBackLive!
                   </h2>
                   
                   
                   
                   <h3 className="text-sm font-thin ">
                     Lamentamos que tu experiencia no haya sido positiva, podrías indicarnos por qué? Esto nos permitirá mejorar nuestro servicio!<br/>
                     <span className="text-zinc-500 font-extrathin  text-xs">Servicio:
                      <span className="bg-slate-200">  
                        {`${service.name}  [id: ${service.id}]`}
                      </span>
                       
                     </span>. 
                     
                   </h3>                   
                                 
                  <div className="container" id="bad-ux-options-holder">
                    <div className='flex flex-col sm:flex-row justify-evenly overflow-y-scroll'>
                        
                        {alertCriterios.map((criterio, index) =>
                        
                          <label 
                            key={criterio.id} htmlFor={'radio-'+criterio.id} className={labelClassName}>
                              <input
                                
                                className={inputClassName}
                                type='radio'
                                id={'radio-'+criterio.id}
                                name="bad-ux-feedback-id"
                                value={criterio.id}
                                onChange={handleChange}
                                checked={isRadio === criterio.id}
                              />
                              <span className={(isRadio === criterio.id)&&`animate-bounce`}>{criterio.emoji}</span>{` `+criterio.label}
                              
                          </label>
                        
                        )}

                    </div>
                   </div>  
                   
                   <div className="mx-auto">
                     {/*<CommentsInput className="">Comentarios (opcional)</CommentsInput>*/}
                     <label htmlFor={`bad-comments`} className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">
                       {`Comentarios (opcional):`}
                   
                       <br/>  
                       <textarea 
                         className={ 
                           `text-xs font-thin 
                           border-zinc-800 
                           border rounded-md 
                           focus:shadow-sm 
                           focus:ring-slate-500 focus:ring-1 focus:outline-none
                           
                           
                         `}

                         name="bad-comments" 
                         id="bad-comments"
                         
                         cols="32"
                         value={isComments}
                         
                         onChange={ handleComments }
                       /> 
                     </label>


                   </div>
                   
                   <div className=" flex justify-evenly my-2">
                     
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
                     
                     
             
                   </div>

                   
                   
                       
           </div>   
           {error && (
                         
                         <div className="alert alert-danger " role="alert">
                             {error}
                         </div>
                                 
               )}      
   
           
   
   
           
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
        
        
          <div className="w-full mx-auto p-1 ">
              
              
              {content && (

                <div id="eval-modal" 
                    className="flex flex-col   
                        bg-gradient-to-br from-white  to-zinc-200  
                        z-50 relative
                        rounded-lg shadow-lg
                        border border-zinc-800
                        overflow-hidden
                        ">
                          
                      {message && (
                        
                          <div className="alert alert-info" role="alert">
                            {message}
                          </div>
                        
                      )}

                  <Logo mainColor={"slate-600"}/>

                  <div className="container p-2">
                      
                      
                    
                    <div className="z-50" >  
                             
                             
                              {(serviceId) ? (

                                !isBadUx ?( <RenderInterface />)
                                
                                : (<RenderBadUxInterface />)
                                 
                              ) : (

                                <RenderFinal  />

                              )}
                    </div> 

                    {<img src={logoUni} alt="logo Unilimpio" className="min-w-96 h-auto opacity-10 absolute bottom-0 left-1 -z-20" />}        
                                              

                  </div>
            
                              
                </div>
          
            )}                 
          </div>
    );
 


  } 
 
  
  return (
    
      <div 
        className={`p-2 h-max   `}>
        
      
        <div className={`flex flex-col h-max
                    
                    ${showModal && (
                      `hidden`
                    )
                    }
                    
        `} >
          
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Mi Experiencia de Usuario</h1>

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


                  <ServicesList  />


                }
                {!user &&
          
                  <p>Favor <Link to="/Login"> ingrese </Link> para ver servicios disponibles.</p>
          
                }
                               
        
        </div>   
        
        {serviceId &&(

          <div className="absolute flex top-0 left-0 m-0 p-2 w-full h-max  ">
            
            {/*<div id="overlay" className="absolute z-30 bg-slate-600 opacity-80 w-full h-full "></div>*/}
            
            <FeedBackLive />

          </div>


        )}

       
            
      </div>
  );

  
};


