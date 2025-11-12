import React, { useState, useEffect} from "react";


import { useNavigate } from "react-router";

import { useSearchParams } from "react-router";

import UserService from "../services/user.service";


//import RenderPuntosForm from "./Puntos"

import logoUni from '../logo-unilimpio.svg';

import Logo from "./common/LogoUx";
import WeatherReport from "./common/template/WeatherReport";
import BokehGoldPink from "./common/template/BokehScreenSaver";


import DelayedNav from "./common/DelayedNav";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//const BACK = "https://cmx.unilimpio.com/";
const BACK = "http://cmxbk/";

export default function UxSurvey () {

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
    
    const emojiLike = `👍🏼`;
    const labelLike = `Me agrada`;

    const emojiNotLike = `👎🏼`;
    const labelNotLike = `Me desagrada`;

    const emojiSatisfied = `🙂`;
    const labelSatisfied = `Satisfecho`;

    const emojiNotSatisfied = `😠`;
    const labelNotSatisfied = `Insatisfecho`;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365; 

    let navigate = useNavigate();

    const [message, setMessage] = useState(false);

    const [error, setError] = useState(false);
  
    const [showModal, setShowModal] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
  
    const [serviceId, setServiceId] = useState(searchParams.get("sID"));    

    const [code,setCode] = useState(searchParams.get("c"));

    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState(false);

    const [content, setContent] = useState(null);//the whole data object returned by the api call
    const [service, setService] = useState(null);//the service state (name, etc)

    const [feedbackValue, setFeedbackValue] = useState(false);//stores the user selection (THE feedback)
    const [comments, setComments] = useState("");

    const [isBadUx, setIsBadUx] = useState(false);
    
    const [showBadUxModal, setShowBadUxModal] = useState(false)

    const [uxId, setUxId] = useState(false);

    const [badUxId, setBadUxId] = useState(null);
    const [badComments, setBadComments] = useState('');
    
    const [alertCriterios, setAlertCriterios] = useState(null);
    //default values
    const [alertMode, setAlertMode] = useState(true);
    const [alertLevel, setAlertLevel] = useState(false);
    
    const [scaleType, setScaleType] = useState('like-dislike')
    const [accountConfigs, setAccountConfigs] = useState(false)
    
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
    console.log(code);

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
      
      /*if(prevInstance){

        if(prevInstance.serviceId === serviceId){

          console.log(prevInstance.serviceId === serviceId);
          //trying to give ux of the same service as previous instance, lets check how long ago that was
          let elapsedMilliseconds = Date.now() - prevInstance.accessDate;

          console.log(formatElapsedTime(elapsedMilliseconds, minutes, 60));
          console.log((elapsedMilliseconds/1000/60) <= 15);
          
          if((elapsedMilliseconds/1000/60) <= 15){

            let verif = localStorage.getItem("cs_uxsurvey_verified");
            let comp = localStorage.getItem("cs_uxsurvey_complete")
            let ux_id = localStorage.getItem("cs_uxsurvey_ux_id")

            setVerified(verif);
            setIsComplete(comp);           
            setUxId(ux_id);
            //it was more than 15 minutes ago, delete old instance data and proceed to clean start
            
            //navigate(0);
    
          } else {

            localStorage.removeItem("cs_uxsurvey_verified");
            localStorage.removeItem("cs_uxsurvey_session");
            localStorage.removeItem("cs_uxsurvey_complete");
            localStorage.removeItem("cs_uxsurvey_ux_id");
            setIsComplete(false)
            setUxId(false)
          }

        } else {
          //the user is tryin gto give ux of a different service, delete old intance data and proceed to clean start
            localStorage.removeItem("cs_uxsurvey_verified");
            localStorage.removeItem("cs_uxsurvey_session");
            localStorage.removeItem("cs_uxsurvey_complete");
            localStorage.removeItem("cs_uxsurvey_ux_id");
            setIsComplete(false)
            setUxId(false)

        }

        
  
      }*/

      setLoading(true);
  
      const fetchService = async () => {
         
      const response = await UserService.getServicePub(serviceId).then(
  
            (response) => {
              
              
              
              setAlertCriterios(response?.data?.alert_criterios);                
              //setAlertMode(response?.data?.service.alert_mode);
              
              //setAlertLevel(response?.data?.service.alert_value);
              
              setScaleType(response?.data?.account_configs?.scale_type);
              setAccountConfigs(response?.data?.account_configs);  
              
              setContent(response?.data);
              setService(response?.data?.service);

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
                  
                setVerified(code === response.data?.service.code_verifier);

                /*UserService.getIp().then(
  
                  (response) => {
                    console.log(response.data)
                    setIp(response.data.IPv4);
                    
                  },
          
                  (error) => {
          
                    console.log("unable to get IP information:"+error);
          
                  }
        
        
                )*/
                
                //setLocation(userLoc());

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
         
         
      };
      fetchService();
   
        
      /*UserService.getServicePub(serviceId).then(
  
            (response) => {
              
              
              
              setAlertCriterios(response?.data?.alert_criterios);                
              setAlertMode(response?.data?.service.alert_mode);
              
              setAlertLevel(response?.data?.service.alert_value);
              
              setScaleType(response?.data?.account_configs?.scale_type);
              setAccountConfigs(response?.data?.account_configs);  
              
              setContent(response?.data);
              setService(response?.data?.service);

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
                
                //setLocation(userLoc());

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
          
      )*/

      

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
        
         
     
      // Clean up the event listener when the component unmounts
      return () => {
        //this is the reset state of the scroll blocking above
        //document.body.style.overflow = "scroll"
        //setContent(null);
        //setService(null);
        //setIsComplete(false)
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

          
        <button  type="submit" 
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


      <button  id="main-cancel-button"
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

  
  const FeedBackLive = ({service, isVerified, isComplete, scale}) => {   
    


    const RenderInterface = () => { 
   
      let navigate = useNavigate();
       //STATE
       const [isRadio, setIsRadio] = useState(false);
       const [isBadUxOther, setIsBadUxOther] = useState('');
       
       const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 m-1 
                                rounded-md flex flex-row sm:flex-col items-center text-lg 
                                transition delay-150 duration-300 ease-in-out visited:-translate-y-5
                                `;
       const inputClassName = `transition delay-150 duration-300 ease-in-out hover:scale-110 focus:-translate-y-5 `;

       const buttonClassName = `transition delay-100 duration-500 ease-in-out hover:scale-110 focus:-translate-y-8 focus:opacity-5`;
      

       const [badUxOther, setBadUxOther] = useState('');

      function CancelProcessing() {
                  
                  setFeedbackValue(false);
                  setIsBadUx(false)
                  setBadUxId(null)
                  setShowBadUxModal(false)
                  setComments("");
                  setLoading(false);
                  setServiceId(false);
                
                  localStorage.removeItem("cs_uxsurvey_verified");
            localStorage.removeItem("cs_uxsurvey_session");
            localStorage.removeItem("cs_uxsurvey_complete");

      }
      
      
      async function handleSubmit(event) {

        
        event.preventDefault();

        await sleep(500);
        // Access the submitter element
        const submitter = event.nativeEvent.submitter;

        // Get the value from the submitter
        const buttonValue = submitter.value;

        console.log(buttonValue)
        //lets prepare the data and the fields that will be send via API
        //these depend wether the user pressed a button that triggers BadUx mode

          
        console.log('User clicked the OK button... 1st screen button value:', buttonValue);
          // Perform further actions with the buttonValue
        setFeedbackValue(buttonValue);

        const data = {
  
              //feedback_value: parseInt(formData.get("ux-feedback-value")),
              //comments: formData.get("comments"),
              //feedback_value: parseInt(onSubmitUxValue, 10),
              feedback_value: buttonValue,
              bad_comments: badComments,
              bad_ux_id: 0,
            //  comments: comments,
  
    
        }
  
        console.log(data);

        setLoading (true);         
        console.log("beginning API post call");
        console.log(loading);
        //go ahead and go with the API call
                  
        console.log(data) 

        UserService.setUxPub(serviceId, data )
        .then(
                  (response) => {
                      console.log(response?.data?.ux_id)
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

      async function handleSubmitBadUx(event) {

        event.preventDefault();

        await sleep(500);

        //const onSubmitBadComments = null;
        
        // Access the submitter element
        const submitter = event.nativeEvent.submitter;

        const form = event.target;
        //console.log(form)
        const formData = new FormData(form);
        //console.log(formData)
        const onSubmitBadComments = formData.get("bad-ux-other");
        //console.log(onSubmitBadComments)
        // Get the value from the submitter
        const buttonValue = submitter.value;

        //console.log(buttonValue)
        //lets prepare the data and the fields that will be send via API
        //these depend wether the user pressed a button that triggers BadUx mode

                 
        console.log('2nd screen ("BAd Ux Mode") Submit button value:', buttonValue);

        setFeedbackValue(0)
        setBadUxId(buttonValue);
          // Perform further actions with the buttonValue

        if(buttonValue === '9999'){

              setBadComments(onSubmitBadComments)

        }
            
        const data = {
  
              //feedback_value: parseInt(formData.get("ux-feedback-value")),
              //comments: formData.get("comments"),
              //feedback_value: parseInt(onSubmitUxValue, 10),
              feedback_value: 0,
              bad_comments: onSubmitBadComments,
              bad_ux_id: buttonValue,
            //  comments: comments,
  
    
        }
  
        console.log(data);

          
            
            

        
        //console.log(feedbackValue)
        
       
        
        //setLoading(true);

        //const form = event.target;

        //const formData = new FormData(form);
        //const values = [...formData.entries()];
        //const formElements = form.elements;
        
        //const onSubmitComments = formData.get("comments");

        //const onSubmitFeedbackValue = formData.get("ux-feedback-value");
        //const onSubmitFeedbackValue = buttonValue;
        //const onSubmitBadUxId = formData.get("bad-ux-feedback-id");
       // const onSubmitComments = formData.get("comments");

        //setFeedbackValue(onSubmitFeedbackValue);
        //setComments(onSubmitComments);
        //setBadUxId(onSubmitBadUxId);
        //setComments(onSubmitComments);
                                
        //console.log(values);
        
       // console.log(form);
        
       // console.log(formElements);
        
       // console.log(onSubmitComments);

        //console.log(onSubmitFeedbackValue);
        //console.log(onSubmitFeedbackValue <= alertLevel)
        console.log(alertMode);

        //lets handle the alert system whic is triggered by the submision of a feedback value
        /*if(alertMode){   
          if(scaleType === '5-points'){

            if(buttonValue <= alertLevel){
            
              //setIsBadUx(true);
              
                      

                //TODO: here the app should send some kind of alert, an sms, or at least an email to the registered supervisor user of the org account
                console.log("alert mode is on");
                
              


            }

          } else {
            //all other scales are more lieka pass/no pass so they can be modeled similarly, we will assign 1/0 to represent these events
            //in any case, if you are here (handleSubmit + a state of isBadUx) then you already know that if alertmode is on you need top send an alert
              
                //TODO: here the app should send some kind of alert, an sms, or at least an email to the registered supervisor user of the org account
                console.log("alert mode is on we should send some warning to someone here...");
           
              
          }

        }*/
        
        
        setLoading (true);
         
        
        console.log("beginning API post call");
        console.log(loading);
        console.log(data)
  //go ahead and go with the API call
       
                      
        
        console.log(data)         
        UserService.setUxPub(serviceId, data )
        .then(
                  (response) => {
                      console.log(response?.data?.ux_id)
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

      
      // HANDLE THE ONCHANGE HERE

      const handleChange = (event) => {
        // string passed in
        // a string returned by default
        console.log(event.currentTarget.value);
        // add + to the event to make the value a number
        setIsRadio(+event.currentTarget.value);
      };

      const handleClickOk = async (event) => {
        // string passed in
        // a string returned by default
        //await sleep(3000);
        //console.log(event.currentTarget.value);
        console.log("user clicked the OK button");
        //await sleep(10000);
        
        //const handleButtonClick = async () => {
        //  setMessage('Pausing for 2 seconds...');
        //  await sleep(2000); // Pause execution for 2000 milliseconds (2 seconds)
        //  setMessage('After the pause!');
        //};
        // add + to the event to make the value a number
        //setFeedbackValue(+event.currentTarget.value);
       
        
      };

      const handleClickNotok = async (event) => {

        await sleep(500);
        // string passed in
        // a string returned by default
        //console.log(event.currentTarget.value);
        // add + to the event to make the value a number
        //setFeedbackValue(+event.currentTarget.value);
        console.log("user clicked the NOT OK button!...activating badUx mode")
        setIsBadUx(true)
        setShowBadUxModal(true)
      };

      const handleClickBadUx = (event) => {
        //event.preventDefault()// string passed in
        // a string returned by default
        console.log(event.currentTarget.value);
        console.log("the user clicked a BAD UX button")
        // add + to the event to make the value a number
        //setBadUxId(+event.currentTarget.value);
        
      };


      function handleBadUxOther (event)  {
       // string passed in
       //event.preventDefault()//
       // a string returned by default
       //console.log(event.currentTarget.value);
       
       // add + to the event to make the value a number
       setBadUxOther(event.target.value);
       //console.log(badUxOther)
       
      };

      
      //logic to show the style of scale for measurion user experience, by default it is set to like-dislike
      if (!loading && scale === '5-points'){

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

      } else if( scale === '12345' ){

        return(
    
          <form id="ux-feedback-form" onSubmit={handleSubmit}  className="">

            <div className="flex flex-col ">                  
                     
                    
                    <div className="container" id="options-holder">
                      
                      <div className='flex flex-col sm:flex-row justify-center'>
                        
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
                            <p className="text-xs" ><span className={`${(isRadio === 1) ? `text-6xl`: 'text-6xl'} `}>{emojiLike}</span><br/>
                              {` `+labelLike}
                            </p>
                          </label>
                          <label htmlFor='radio2'
                            className={labelClassName}>
                            <input
                              className={inputClassName}
                              type='radio'
                              id='radio2'
                              name="ux-feedback-value"
                              value='0'
                              onChange={handleChange}
                              checked={isRadio === 0}

                            />
                            <p className="text-xs" ><span className={`${(isRadio === 0) ? `text-6xl`: 'text-6xl'} `}>{emojiNotLike}</span><br/>
                              {` `+labelNotLike}
                            </p>
                          </label>
                          
                        
                      </div>  
                        
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

      } else if(!loading && scale === 'like-dislike' ){

        return(
    
          
            <div className=" mt-14 w-1/2 p-1 md:w-1/3 md:p-10 bg-neutral-100 bg-opacity-50 rounded-md shadow-lg">
                    <div className={isBadUx ? 'hidden' : 'p-4 '} >
                      <form id="ux-feedback-form" onSubmit={handleSubmit}  className="">

                        <div className="flex justify-center">                  
                                
                              <div className="relative " id="ux-options-holder">
                                
                                
                                  <div className="flex w-full mx-auto">
                                    <p className="text-sm font-thin -mt-4 bg-neutral-200 rounded-sm bg-opacity-75">
                                          Por favor califique su experiencia con este servicio:
                                          <span className="p-1 text-slate-900 font-extrathin  text-xs ">&nbsp;
                                              {`${service?.service_name}  [id: ${service?.service_id}], ${service?.ubicacion_name}`}
                                          </span> 
                                    </p>
                                  </div>
                                  <div className='flex flex-col sm:flex-row justify-center '>
                                    
                                      
                                      <button
                                          className={buttonClassName}
                                          type='submit'
                                        
                                          
                                          value='1'
                                          onClick={handleClickOk}
                                          
                                        >
                                        <p className="text-xs " ><span className={` text-8xl`}>{emojiLike}</span><br/>
                                          <span className="bg-neutral-200 rounded-sm bg-opacity-75 shadow-md">{` `+labelLike}</span>
                                        </p>
                                      </button>
                                      
                                      <button
                                          className={buttonClassName}
                                          type='button'
                                          
                                        
                                          value='0'
                                          onClick={handleClickNotok}
                                          

                                        >
                                        <p className="text-xs" ><span className={` text-8xl `}>{emojiNotLike}</span><br/>
                                          <span className="bg-neutral-200 rounded-sm bg-opacity-75 shadow-md">{` `+labelNotLike}</span>
                                        </p>
                                      </button>
                                      
                                      
                                  </div>
                                
                                                                    
                              </div>
                                
                                
                                    
                        </div>   
                        {error && (
                                      
                                      <div className="alert alert-danger " role="alert">
                                          {error}
                                      </div>
                                              
                        )}      
                
                        
                
                
                        
                      </form>
                    </div>


                    <div className={isBadUx ? 'p-4' : 'hidden'} >
                      <form id="ux-feedback-form" onSubmit={handleSubmitBadUx}  className="">

                        <div className="flex justify-center">                  
                                
                              <div className="" >
                                
                                <div className="" id="ux-options-holder" >
                                  
                                    <p className="bg-neutral-200 text-xs font-thin rounded-sm my-1 bg-opacity-75">
                                          Haz calificado:&nbsp;
                                          &nbsp;
                                          <span className="text-[9px]">    {`[${service?.service_id}]`} </span>
                                          {`${service?.service_name} , ${service?.ubicacion_name}`}
                                          
                                    </p>
                                  
                                  <div className={isBadUx ? '' : 'hidden'} id="bad-ux-options">
                                        <p className="text-red-600 bg-red-300 text-xs rounded-sm bg-opacity-75 shadow-md">Lamentamos que no estes satisfecho con este servicio, por favor dinos cual fue la razon?</p>
                                        <div className='grid sm:grid-cols-3 lg:grid-cols-4 '>
                                              
                                              {alertCriterios && (
                                                alertCriterios.map((criterio, index) =>
                                              
                                                  
                                                  <button
                                                        key={"button-bad-ux-"+index+criterio.id}
                                                        className={buttonClassName}
                                                        type='submit'
                                                        id={'button-bad-ux-'+criterio.id}
                                                        
                                                        value={criterio.id}
                                                        onChange={handleClickBadUx}
                                                        
                                                  >
                                                      <p className="text-xs font-thin" ><span className={(isRadio === criterio.id)?`text-6xl `:'text-6xl '}>{criterio.emoji}</span><br/>
                                                        <span className="bg-neutral-200 rounded-sm bg-opacity-75 shadow-md">{` `+criterio.label}</span>
                                                      </p>
                                                    
                                                  </button>
                                              
                                                ))}

                                                <label htmlFor={`bad-ux-other`} className="text-slate-700 border text-xs font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">
                                                    <span className="bg-neutral-200 rounded-sm bg-opacity-75 text-[9px] p-1">Otro:</span>        
                                                    <br/>
                                                    <input 
                                                      className={
                                                        `w-2/3 text-[10px] font-thin 
                                                        border-zinc-800 
                                                        border rounded-md 
                                                        focus:shadow-sm 
                                                        focus:ring-slate-500 focus:ring-1 focus:outline-none
                                                        h-5 
                                                        
                                                      `}

                                                      name="bad-ux-other" 
                                                      id="bad-ux-other"
                                                      
                                                      
                                                      value={badUxOther}
                                                      
                                                      onChange={ handleBadUxOther }
                                                    /> 
                                                    
                                                      <button value="9999" type="submit" 
                                                        className="border border-slate-400 bg-neutral-300 text-slate-800 
                                                                    m-0  rounded-md
                                                                    text-[9px] h-5
                                                                    
                                                                  ">
                                                          Enviar
                                                      </button> 
                                                    
                                                </label> 
                                                
                                          </div>
                                </div>  
                                  
                                </div>
                                  

                              </div>
                                
                                
                              

                                
                                
                                    
                        </div>   
                        {error && (
                                      
                                      <div className="alert alert-danger " role="alert">
                                          {error}
                                      </div>
                                              
                        )}      
                
                        
                
                
                        
                      </form>
                    </div>
            </div>
          
        
        );

      } else if (!loading && scale === 'satis-disatis'){

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
                            <span className={(isRadio === 1) ? `animate-bounce`: ' '}>{emojiSatisfied}</span>{` `+labelLike}
                          </label>
                          <label htmlFor='radio2'
                            className={labelClassName}>
                            <input
                              className={inputClassName}
                              type='radio'
                              id='radio2'
                              name="ux-feedback-value"
                              value='0'
                              onChange={handleChange}
                              checked={isRadio === 0}
                            />
                            <span className={(isRadio === 0)? `animate-bounce`: ' '}>{emojiNotSatisfied}</span>{` `+labelNotSatisfied}
                          </label>
                          
                        
                      </div>  
                        
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

      } else {

        return(
          
                            <div className=" flex mt-14 w-1/2 p-1 md:w-1/3 md:p-10 bg-neutral-100 bg-opacity-50 rounded-md shadow-md">
                              
                                <svg className=" animate-spin h-6 w-6 fill-slate-200" viewBox="0 0 24 24">
                                  <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                                  <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                                </svg>
                                <span className="text-slate-200">Loading</span>
  
                                          
                            </div>
        );
      }
    
  
    }

    
    const Final = ()=> { 
      
      const [isComments, setIsComments] = useState("");
      const [isLoading, SetIsLoading] = useState(false);

      function CancelProcessing() {
                  
                  setFeedbackValue(null);
                  setComments("");
                  setLoading(false);
                  setServiceId(null);
                
                  

      }
      

      function handleSubmitComments(event) {

       event.preventDefault();

        setLoading(true);
        SetIsLoading(true);

        const form = event.target;

        const formData = new FormData(form);
        const values = [...formData.entries()];
        const formElements = form.elements;
        
        const onSubmitComments = formData.get("comments");
                       
        setComments(onSubmitComments);
        
                                
        console.log(values);
        
        console.log(form);
        
        console.log(formElements);
        
        console.log(onSubmitComments);

    

        
        //setLoading (false);
        
          console.log("we are ready to go");

        


          console.log("beginning API post call");
          console.log(loading);

          if (!error) {
                      
            const data = {
  
              
              comments: onSubmitComments,
              
  
    
            }
  
            console.log(data);
                
            UserService.setUxComm(uxId, data )
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
                      
                      if(!error ){


                        localStorage.removeItem("cs_uxsurvey_verified");
                        localStorage.removeItem("cs_uxsurvey_session");
                        localStorage.removeItem("cs_uxsurvey_complete");
                        localStorage.removeItem("cs_uxsurvey_ux_id");
                        setIsComplete(false)
                        setUxId(false)
                        //navigate('uxsurvey?'+serviceId) 
                        
                        setFeedbackValue(false);
                        setIsBadUx(false)
                        setBadUxId(null)
                        setShowBadUxModal(false)
                        setComments("");
                        setLoading(false);


                      }
                        
                    // setServiceId(false);
                
                    
      
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


      const handleCommentsField = (event) => {
        // string passed in
        // a string returned by default
        console.log(event.currentTarget.value);
        // add + to the event to make the value a number
        setIsComments(event.currentTarget.value);
      };


      return(
  
          
        <div className="flex flex-col  sm:flex-row mt-14 w-1/2 p-1 md:w-1/3 md:p-10 bg-neutral-100 bg-opacity-50 rounded-md shadow-md" id="final-message">
            
                    <div className="p-4" >
                      <h1 className="text-3xl font-extrabold text-lime-500">Gracias!</h1>

                      <p className=" text-sm font-thin m-1 ">
                        <span className="text-xs bg-neutral-200 rounded-sm bg-opacity-75">
                        Haz calificado:&nbsp; 
                        
                        {service && (
                          <>
                            <span className="text-[9px]">
                              {`[${service.service_id}]`}
                            </span>
                          {`${service.service_name} ,  ${service.ubicacion_name} `}
                          </>
                        )}
                        </span>
                        <br/>
                        <span className="bg-neutral-200 rounded-sm font-bold text-md text-sky-600 bg-opacity-75">
                          
                          Apreciamos tu retroalimentación. Será utilizada para mejorar nuestros servicios. 
                            
                        </span>
                        
                        
                        
                      </p>
                      <p className="text-sm font-thin text-slate-800 bg-neutral-200 rounded-sm bg-opacity-75"> 
                        Cerrando&nbsp; 
                        <DelayedNav secs={3} url={'/uxsurvey?'} sID={serviceId} c={code} className="" active={true}/> 
                      </p>
                      
                    </div>
                    {/*
                      <div className="p-4">
                      
                      <p className="text-xs font-thin m-1 text-md text-sky-700">
                        Tienes un minuto? puedes dejar un comentario mas detallado en el espacio debajo, tu informacion sera muy apreciada para nuestros esfuerzos de mejora continua:
                      </p>
                      <form onSubmit={handleSubmitComments} >
                      <label htmlFor={`comments`} className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">
                        {`Comentarios (opcional):`}
                    
                        <br/>  
                        <textarea 
                          className={ 
                            `w-5/6 h-12 text-xs font-thin 
                            border-zinc-800 
                            border rounded-md 
                            focus:shadow-sm 
                            focus:ring-slate-500 focus:ring-1 focus:outline-none
                            
                            
                          `}
                          name="comments" 
                          id="comments"
                          
                          cols="32"
                          value={isComments}
                          
                          onChange={ handleCommentsField }
                        
                                  
                                  
                        /> 
                      </label>

                      <div className=" flex justify-evenly my-2">
                
                      
                        <>
                          <button  type="submit" 
                                    className={ 
                                      `m-1 p-1 rounded-md border border-white 
                                      
                                      bg-gradient-to-b from-sky-400 to-sky-800 
                                      hover:shadow-md hover:bg-sky-600 
                                      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-150
                                      `                    
                                    } 
                                    disabled={loading} >
                              
                              <span className="mx-1 text-white font-semibold text-sm">Enviar</span>
                              
                            
                          </button>
                          
                          <CancelButton 
                            className=" ">
                              
                              {`${emojiClose} ${labelClose}`}
                          </CancelButton>           
                          
                        </>
                      
                   
              
                      </div> 
                     

                      </form>
                    </div>
                    */}
                    
                                             
             
                  
    
                      
    
        </div>
            
          
        
      );
  
  
    }


    //next is the return of the FeedBackLive component

    if(isVerified){

      if(!isComplete){

        return (        
        
          <div className="flex justify-center  mx-auto ">
                
                {error && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                )}
                                                
                               
                {
                                
                  service && (

                    <RenderInterface />

                  )


                }  
                                
            
          </div>

        );
      } else {

        return (              
      
          <div className={!isComplete?'hidden':'flex justify-center mx-auto '}>                   
                <Final />      
          </div>
      
      
        );
      }

    } else {

      //the qr has not YET been verified, for better UX, show show loading animation or placeholder:
      return (  
          <div className="flex-row">
                  <svg className="animate-spin h-10 w-10 fill-slate-200" viewBox="0 0 24 24">
                      <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
              <span className="text-slate-200 font-extralight ml-2">Loading...</span>
          </div>
  
        
      );

    }

    
  } //end const feedbacklive
  

  console.log(verified)
  console.log(isComplete)
  

  return (
      
    <div className={`w-full relative h-screen bg-none content-start `}>
          
          {
            service && service?.ubicacion_bg_mode === 'weather-report' &&(
                                                          
              <WeatherReport location={service.ubicacion_location} bgMode = {true} color = {service.ubicacion_wr_text_color}/>
                          
            )

          }
          
          {
            service && service?.ubicacion_bg_mode === 'bokeh-gold-pink' &&(
              <>
                <WeatherReport location={service.ubicacion_location} color = {service.ubicacion_wr_text_color}/>                                            
                <div className="-z-40">    
                  <BokehGoldPink />
                </div>
              </>            
            )

          }
          {
            service && service?.ubicacion_bg_mode === 'custom' && service?.ubicacion_custom_bg !== null &&(
              <>
              <WeatherReport location={service.ubicacion_location} color = {service.ubicacion_wr_text_color}/>                                            
              <div className="-z-50">    
                 
                    <img src={BACK+`assets/images/`+service?.ubicacion_custom_bg} 
                        alt="imagen de fondo personalizado para la ubicacion" 
                        className="fixed -top-6 left-0 w-screen -z-40"
                    />
                 
              </div>
              </>            
            )

          }

          
                 
          <div className="place-content-between">
            <Logo mainColor={"slate-600"}/>
            
          </div>            
          
                    
  
          <main className="relative ">
                
                
            <FeedBackLive service={service} isVerified={verified} isComplete={isComplete} scale={scaleType}/>
                
            {error && (

              <div className="">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}

          </main>

          <footer className="fixed w-full flex justify-between z-40 bottom-0 right-0 bg-slate-800">
        
                <p className="content-end text-sky-900 text-[8px] font-light mb-0 opacity-90">
                  &copy;MFC - All rights reserved.
                </p>
              
              
              <div className="w-1/3 p-1 bg-gradient-to-r from-transparent to-sky-600">  
                <div className="flex justify-end ">
                  <span className="text-white text-[7px] sm:text-[8px]  font-thin text-shadow-lg">
                    powered by:
                  </span>
                  <a href="https://unilimpio.com/"> <img src={logoUni} alt="logo Unilimpio" className="z-30 w-8 h-8 sm:w-10 sm:h-10 " /></a>
                </div>
              </div>  
        
          </footer>
         
              
    </div>
    
  );

   

    

  }

  

