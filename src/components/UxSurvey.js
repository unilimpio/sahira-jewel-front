import React, { useState, useEffect, useRef} from "react";

import { Link, Navigate} from "react-router";
import { useNavigate } from "react-router";

import { useSearchParams } from "react-router";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';

import Logo from "./common/Logo";
import { use } from "react";





export default function UxSurvey () {

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365; 

    let navigate = useNavigate();

    const [message, setMessage] = useState(false);

    const [error, setError] = useState(false);
  
    const [showModal, setShowModal] = useState(false);


  //const user = AuthService.getCurrentUser();
  //const [user, setUser] = useState(AuthService.getCurrentUser());

    const [searchParams, setSearchParams] = useSearchParams();
  
    const [serviceId, setServiceId] = useState(searchParams.get("sID"));    

    const [code,setCode] = useState(searchParams.get("c"));

    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState(false);
    const [content, setContent] = useState(null);//the whole data object returned by the api call
    const [service, setService] = useState(null);//the service state (name, etc)
    const [feedbackValue, setFeedbackValue] = useState("");//stores the user selection (THE feedback)
    const [comments, setComments] = useState("");

    const [isBadUx, setIsBadUx] = useState(false);

    const [uxId, setUxId] = useState(false);

    const [badUxId, setBadUxId] = useState(null);
    const [badComments, setBadComments] = useState(null);
    
    const [alertCriterios, setAlertCriterios] = useState(null);
    //default values
    const [alertMode, setAlertMode] = useState(true);
    const [alertLevel, setAlertLevel] = useState(2);

    const [conn, setConn] = useState(false);
    const [name, setName] = useState('');

    const [location, setLocation] = useState(null);
    const [ip, setIp] = useState(null);

    const [verified,setVerified] = useState(false);

    const [isComplete, setIsComplete] = useState(false);

    

    const emojiClose = `❌`;
    const labelClose = `Cancelar`;

    const emojiSave = `✅`;
    const labelSave = `Enviar`;

    const [prevInstance, setPrevInstance] = useState(JSON.parse(localStorage.getItem("cs_uxsurvey_session")));

    console.log(prevInstance);
    console.log(prevInstance?.accessDate);

    

    function formatElapsedTime(elapsedtime, timeunit, base) {
      let time = base ? (elapsedtime / timeunit) % base : elapsedtime / timeunit;
      time = Math.floor(time);
      time = time < 10 ? '0' + time : time;
      return time;
    }

    function userLoc () {

      
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
       } else {
         console.log("Geolocation not supported");
       }
    
    

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log(` ${latitude}, ${longitude}`);
        //setLocation({ latitude, longitude });
        return `Latitude: ${latitude}, Longitude: ${longitude}`;
            
      }
    
      function error() {
        console.log("Unable to retrieve your location");
        return null;
      }

   
      return;
    }

    useEffect(() => {

      if(prevInstance){

        if(prevInstance.serviceId === serviceId){

          console.log(prevInstance.serviceId === serviceId);
          //trying to give ux of the same service as previous instance, lets check how long ago that was
          let elapsedMilliseconds = Date.now() - prevInstance.accessDate;

        
  
          console.log(formatElapsedTime(elapsedMilliseconds, minutes, 60));
          console.log((elapsedMilliseconds/1000/60) <= 15);
          
          if((elapsedMilliseconds/1000/60) <= 15){

            let verif = localStorage.getItem("cs_uxsurvey_verified");
            let comp = localStorage.getItem("cs_uxsurvey_complete")

            setVerified(verif);
            setIsComplete(comp);           
    
            //it was more than 15 minutes ago, delete old instance data and proceed to clean start
            
            //navigate(0);
    
          } else {

            localStorage.removeItem("cs_uxsurvey_verified");
            localStorage.removeItem("cs_uxsurvey_session");
            localStorage.removeItem("cs_uxsurvey_complete");

          }

        } else {
          //the user is tryin gto give ux of a different service, delete old intance data and proceed to clean start
            localStorage.removeItem("cs_uxsurvey_verified");
            localStorage.removeItem("cs_uxsurvey_session");
            localStorage.removeItem("cs_uxsurvey_complete");

        }

        
  
      } 

      setLoading(true);
  
        
      UserService.getServicePub(serviceId).then(
  
            (response) => {
              
              
              
              setAlertCriterios(response?.data?.alert_criterios);                
              setAlertMode(response?.data?.service.alert_mode);
              setAlertLevel(response?.data?.service.alert_value);
                
                
              setMessage(response.data?.message); 
              console.log(response);
              console.log(response.data?.alert_criterios);
              console.log(response.data?.service);
              console.log(response.data?.service.alert_mode);       
              console.log(response.data?.service.alert_value);
              console.log(response.data?.service.code_verifier);
              console.log(code);
  
              console.log(code === response.data?.service.code_verifier);
             
              
              if(code === response.data?.service.code_verifier){
                  
                setContent(response?.data);
                setService(response?.data.service);
                
                setVerified(code === response.data?.service.code_verifier);

                UserService.getIp().then(
  
                  (response) => {
                    console.log(response.data)
                    setIp(response.data.IPv4);
                    
                  },
          
                  (error) => {
          
                    console.log("unable to get IP information:"+error);
          
                  }
        
        
                )
                
                setLocation(userLoc());

                if(prevInstance === null){

                  localStorage.setItem("cs_uxsurvey_session", JSON.stringify({"serviceId":serviceId,"accessDate":Date.now()}));
                  localStorage.setItem("cs_uxsurvey_verified", true);
                  localStorage.setItem("cs_uxsurvey_complete", false);

                }

                

                setLoading(false);
                
              }

              
             

            },
  
            (error) => {
  
              console.log(error);
              const _content =
                (error?.response && error?.response.data) ||
                error?.message ||
                error?.toString();
              
              setError(_content);
              
              
            
            }
          
      )

      

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
        
         
     
      // Clean up the event listener when the component unmounts
      return () => {
        //this is the reset state of the scroll blocking above
        //document.body.style.overflow = "scroll"
        //setContent(null);
        //setService(null);
  
      };
  
    }, [serviceId, code, error, prevInstance, minutes]);

    console.log(serviceId);
    console.log(code);


    console.log(content);
    console.log(service);
    
    console.log(localStorage.getItem("cs_uxsurvey_verified"));
    console.log(localStorage.getItem("cs_uxsurvey_complete"));
    console.log(prevInstance);
    
    
    console.log(isComplete);
    console.log(verified);
  

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

          
        <button  type="submit" id="submit" name="button" value="submit"
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

    let navigate = useNavigate();

    function handleCancel (){
    
      //setMessage('Evaluación cancelada por el usuario. Puede continuar más tarde desde él último criterio verificado.');
      console.log('cancelled by the user');
      setLoading(false);
      setContent(''); 
      setServiceId(false);
      
      setShowModal(false);
      localStorage.removeItem("cs_uxsurvey_session");
      //localStorage.setItem("cs_uxsurvey_complete",true);
      localStorage.removeItem("cs_uxsurvey_verified");
      //localStorage.removeItem("cs_uxsurvey_complete");
      localStorage.setItem("cs_uxsurvey_complete", true);
      setIsComplete(true);
      //console.log(evalId)
      //console.log(instance)
      //console.log(showModal)
      navigate(0);
    
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
              disabled={loading}
              onClick={handleCancel}
              >
        
        <span className="mx-1 text-zinc-400 text-xs font-thin hover:no-underline">{children}</span>
          
      </button>

    );
  } 

  /*
  const Start = ()=> { 

       
    const TermsForm = () => {

      const [error, setError] = useState(false);
      const [message, setMessage] = useState(false);
      const [accept, setAccept] = useState(false);

      let navigate = useNavigate();

      function userLoc () {

      
      
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
         } else {
           console.log("Geolocation not supported");
         }
      
      

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log(` ${latitude}, ${longitude}`);
        //setLocation({ latitude, longitude });
        return `Latitude: ${latitude}, Longitude: ${longitude}`;
            
      }
      
      function error() {
        console.log("Unable to retrieve your location");
        return null;
      }

     
      return;
      }

      function Checkbox({ id, defaultChecked = false, children }) {
        
        const [checked, setChecked] = useState(defaultChecked);
        
        const labelClassname=`mx-2 text-sm  text-slate-700`;   
        const inputClassname=`w-8 h-8`; 
      
        const onChange = event => {
          //event.persist();

          const value = event.target.checked
          setChecked(!checked);
          setAccept(value);
          console.log("the checkbox has been checked!");
          console.log(value);
          
        };

        console.log(checked);
        console.log(accept);
  
         
        
        return (
          <div className="flex flex-row justify-center">
            <input id={id} type="checkbox" onChange={onChange} checked={checked} className={inputClassname} />
            <label htmlFor={id} className={labelClassname}>
              {children}
            </label>
          </div>
        );
      
      }

      const handleAccept = (e) => {
      
        console.log("the terms have been accepted, starting survey...")
        
        e.preventDefault();

        if(!accept){
          setError(true);
          setMessage("Debe aceptar los términos de uso para continuar.");
        }
        
        if(!error){

          setMessage("");
          setLoading(true);
    
          
          
          
          UserService.getIp().then(
  
            (response) => {
              console.log(response.data)
              setIp(response.data.IPv4);
              
            },
    
            (error) => {
    
              console.log("unable to get IP information:"+error);
    
            }
  
  
          )
          
          setLocation(userLoc());
            
          console.log("el acceso ha sido validado!");
        
          localStorage.setItem("cs_uxsurvey_session", JSON.stringify({"serviceId":serviceId,"accessDate":Date.now()}));
          localStorage.setItem("cs_uxsurvey_verified", true);
          localStorage.setItem("cs_uxsurvey_complete", false);

          setService(content.service);

          setContent(content);
            //setContent(response);  
          setLoading(false); 
            //navigate(0);

          


         /* UserService.getServicePub(serviceId).then(
    
              (response) => {               
                             
                
                console.log(response);
                console.log(response.data?.alert_criterios);
                console.log(response.data?.service.alert_mode);       
                console.log(response.data?.service.alert_value);
                console.log(response.data?.service.code_verifier);
                console.log(code);
    
                console.log(code === response.data?.service.code_verifier);
                
                if(code === response.data?.service.code_verifier){

                  setVerified(code === response.data?.service.code_verifier);
                  console.log("el acceso ha sido validado!");
              
                  localStorage.setItem("cs_uxsurvey_session", JSON.stringify({"serviceId":serviceId,"accessDate":new Date(8.64e15).toString()}));
                  localStorage.setItem("cs_uxsurvey_verified", true);
                  localStorage.setItem("cs_uxsurvey_complete", false);

                  setService(response.data?.service);

                  setAlertCriterios(response.data?.alert_criterios);                
                  setAlertMode(response.data?.service.alert_mode);
                  setAlertLevel(response.data?.service.alert_value);
                
                  setMessage(response.data?.message);
                  //setContent(response);  
                  setLoading(false); 
                  //navigate(0);

                }
                
                   
                
              },
    
              (error) => {
    
                console.log(error);
                const _content =
                  (error?.response && error?.response.data) ||
                  error?.message ||
                  error?.toString();
                
                setError(_content);
              }
  
            
          )*/
  
                   

          
          /*navigate(0);

        }
                
        
        
        
        
      }

      return(

        
        <form onSubmit={handleAccept} className="">
          <div className="p-2 border border-slate-700 bg-neutral-100 rounded-md shadow-md">
            <div className=" flex flex-col my-2  justify-center">
  
                <p className="text-sm text-slate-700 text-center">Para continuar, acepte nuestros términos y condiciones de uso.</p>
                
                <Checkbox id="accept" defaultChecked={true}>Acepto los términos de uso </Checkbox> 
                <div className={!error ? (` hidden`) : (` `)} role="alert">
                  <span className="alert alert-danger">{message}</span>
                </div> 
              
                
            </div>

            <div className=" flex justify-center my-2">
              
            <>
                            <SaveButton
                              loading={loading} 
                              className={`
                                `}>{`${emojiSave} Aceptar`}
                                
                            </SaveButton>
                            
                            <CancelButton 
                              className=" ">
                                
                                {`${emojiClose} ${labelClose}`}
                            </CancelButton>           
                            
                          </>
              
            </div>
  
          </div>  
        </form>
            
          
        
      );
      

    }

    return(
      
      <TermsForm/>
    
    );
  }*/

  const FeedBackLive = ({service, isVerified, isComplete}) => {   
    
   /* useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
      try { 
  
        
        UserService.getService(serviceId).then(
  
            (response) => {
  
              
              setService(response.data?.service);              
              
              console.log(response);
              console.log(response.data?.alert_criterios);
              console.log(response.data?.service.alert_mode);       
              console.log(response.data?.service.alert_value);
              console.log(response.data?.service.code_verifier);
              console.log(code);
  
              console.log(code === response.data?.service.code_verifier);
  
             if(code === response.data?.service.code_verifier){
                
                setAlertCriterios(response.data?.alert_criterios);                
                setAlertMode(response.data?.service.alert_mode);
                setAlertLevel(response.data?.service.alert_value);
                
                setMessage(response.data?.message);
                setContent(response);
                localStorage.setItem("cleanSmart_session", JSON.stringify(response.data));
              
              } else {
  
                setError(true);
                setErrorMessage("no se pudo validar el link utilizado.");
                console.log(errorMessage);
  
              }
            },
  
            (error) => {
  
              console.log(error);
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
  
        //setServiceId(false);
  
      };
  
    }, []);*/
    
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

   
    
    

    const RenderInterface = () => { 
   
      let navigate = useNavigate();
       //STATE
       const [isRadio, setIsRadio] = useState(0);
       const [isComments, setIsComments] = useState("");
       const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 m-1 rounded-md flex flex-row sm:flex-col items-center text-lg`;
       const inputClassName = ` m-2 w-8 h-8`;
      

      function CancelProcessing() {
                  
                  setFeedbackValue(null);
                  setComments("");
                  setLoading(false);
                  setServiceId(null);
                
                  

      }
      

      function handleSubmit(event) {

       // event.preventDefault();

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

        if(onSubmitFeedbackValue <= alertLevel){
          if(alertMode){            

            console.log("alert mode is on");
            setIsBadUx(true);
            return setLoading (false);


          } 
        //setLoading (false);
        } else {
          console.log("we are ready to go");

        }  


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
                
            UserService.setUxPub(serviceId, data )
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
                      
                      
                      setIsComplete(true);
                      localStorage.setItem("cs_uxsurvey_complete",true)
                      
                      setLoading (false);
                      
      
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

      
    
      return(
    
          <form id="ux-feedback-form" onSubmit={handleSubmit}  className="">

            <div className="flex flex-col ">                  
                     
                    
                    <div className="container" id="options-holder">
                      
                      <div className='flex flex-col sm:flex-row justify-evenly '>
                        
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
                            <span className={(isRadio === 1) ? `animate-bounce`: ' '}>{emoji1}</span>{` `+label1}
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
                            <span className={(isRadio === 2)? `animate-bounce`: ' '}>{emoji2}</span>{` `+label2}
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
                            <span className={(isRadio === 3)?`animate-bounce`:' '}>{emoji3}</span>{` `+label3}
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
                          <span className={(isRadio === 4)?`animate-bounce`:' '}>{emoji4}</span>{` `+label4}
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
                          <span className={(isRadio === 5)?`animate-bounce`:' '}>{emoji5}</span>{` `+label5}
                          </label>
                        
                      </div>  
                        
                    </div>
                    <div className="w-10/12 mx-auto">
                      
                      
                      <label htmlFor={`comments`} className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">
                        {`Comentarios (opcional):`}
                    
                        <br/>  
                        <textarea 
                          className={ 
                            `w-full text-xs font-thin 
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
   
      let navigate = useNavigate();

      //STATE
      const [isRadio, setIsRadio] = useState(0);
      const [isComments, setIsComments] = useState("");
      
      const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 m-1 rounded-md flex flex-row items-center text-xl`;
      const inputClassName = ` m-2 w-10 h-10`;
     

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
             
         UserService.setUxPub(serviceId, data )
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
                   
                   setIsComplete(true);
                   localStorage.setItem("cs_uxsurvey_complete",true)
                   setLoading(false);
                   
                   
                      
                    
   
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
                                 
                  <div className="container flex-col" id="bad-ux-options-holder">
                    <p className="text-red-400">Lamentamos que tu experiencia no haya sido positiva, podrías indicarnos por qué? Esto nos permitirá mejorar nuestro servicio!</p>
                    <div className='flex flex-col sm:flex-row justify-evenly overflow-y-scroll'>
                        
                        {alertCriterios && (
                          alertCriterios.map((criterio, index) =>
                        
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
                                <span className={(isRadio === criterio.id)?`animate-bounce`:' '}>{criterio.emoji}</span>{` `+criterio.label}
                              
                            </label>
                        
                          ))}

                    </div>
                  </div>  
                   
                   <div className="mx-auto">
                     {/*<CommentsInput className="">Comentarios (opcional)</CommentsInput>*/}
                     <label htmlFor={`bad-comments`} className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">
                       {`Comentarios (opcional):`}
                   
                       <br/>  
                       <textarea 
                         className={
                           `w-full text-xs font-thin 
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

                   
                   
                       
            
           {error && (
                         
                         <div className="alert alert-danger " role="alert">
                             {error}
                         </div>
                                 
               )}      
   
           
   
   
           
         </form>
       
     );

     
 
    }

    const Final = ()=> { 
      
      return(
  
          
        <div className="h-full">
            <div className=" flex flex-col 
                  sm:flex-row sm:justify-start 
                  sm:w-fit sm:pl-12 my-2 p-2
                  border-1 border-neutral-500 bg-neutral-100 rounded-md shadow-md
                  ">
                    <h1 className="text-3xl font-extrabold text-lime-500">Gracias!</h1>
                    <p className="text-sm font-thin m-1 ">
                      <span className="font-bold text-md text-sky-700">
                        
                        Apreciamos tu retroalimentación. Será utilizada para mejorar nuestros servicios. 
                          
                      </span>
                      <br/>
                      {service && (
                        <>Servicio calificado:  {`${service.name} ${service.referencia} [${service.id}]`}</>
                      )}
                      
                    </p>
                                             
            </div>   
                  
    
            <div className=" flex sm:pl-12 sm:w-8/12 justify-evenly sm:justify-start my-2">
                
                    
                    &nbsp;        
                    
                  
              
            </div>
    
        </div>
            
          
        
      );
  
  
    }

    if(isVerified){


        if(!isComplete){


          return (
        
        
            <div className="w-full mx-auto h-full">
                
                {error && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                )}
                
                
  
                    
                    <div className="w-full mx-auto md:container bg-neutral-100 border border-slate-700 rounded-md p-2 shadow-md">
                        
                        <h2 className="m-1  text-center                       
                          text-stone-500 text-xl md:text-4xl 
                            font-black ">
                            📢FeedBackLive!
                        </h2>
                        <div className="p-0">
                          <p className="text-sm font-thin mb-0">
                            Por favor califique su experiencia con este servicio:<br/>
                          </p>  
                          
                            {
                            !loading && (
                            <>
                              <span className="bg-white shadow-sm p-1text-zinc-500 font-extrathin  text-xs ">&nbsp;
                                {`${service?.name}  [id: ${service?.id}].`}
                              </span> 
                                          
                            </>)
                            }
                            {
                              loading && (
                                <div className="mr-8 flex flex-row ">
                              
                                <svg className=" animate-spin h-6 w-6 fill-slate-700" viewBox="0 0 24 24">
                                  <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                                  <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                                </svg>
                                <span className="text-slate-700">Loading</span>
  
                                          
                            </div>)
  
                            }
  
                        </div>
                            
                            
                            
                                                 
                        
                        
                               
                                {(serviceId) && (
  
                                  !isBadUx ? ( <RenderInterface />)
                                  
                                  : (<RenderBadUxInterface />)
                                   
                                ) }
  
                                
                                
                      
  
                              
                                                
  
                    </div>
              
            
                               
            
            </div>
          );

        } else {

          return (
      
            
      
              <div className="">
                    
                   
                <Final />
      
              </div>
      
      
                  
          
          );


        }




    } else {

      return (
      
        
  
          <div className="">
                
            <p>No se pudo autenticar la solicitud. Acceso denegado.</p>   
            
  
          </div>
  
  
              
        
      );

    }

    
 


  } //end const feedbacklive
 
  

  console.log(verified)
  console.log(isComplete)
  
  

  return (
      
        <div 
          className={`w-full mx-auto p-2 h-screen`}>
          
        
          <header className="flex flex-row place-content-between">
                      <Logo mainColor={"slate-600"}/>
                      <div className="flex flex-col w-12 h-12">
                        <span className="text-slate-700 text-xs font-thin mb-1">
                          por:
                        </span>
                        <img src={logoUni} alt="logo Unilimpio" className="  z-30 mr-2" />
                      </div>
          </header>
            
  
          <main className="">
                
                
            <FeedBackLive service={service} isVerified={verified} isComplete={isComplete}/>
                
  
          </main>
         
              
        </div>
    );

   

    

  }

  

  

  
  



