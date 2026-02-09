// FlashMessage.jsx
import React, { useEffect, useState } from 'react';

import AlertBox from './template/AlertBox';

const FlashMessage = ({ flashMessage,  setFlashMessage, duration = 8000 , divCss='bottom-24'}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the message
    const timer = setTimeout(() => {
      console.log('inside timeout')
        setIsVisible(false);
        //setFlashMessage(false)
        //localStorage.removeItem('cmx_flashMessage')
      //console.log(typeof clearMessage)
      //clearMessage()
      

      
    }, duration);

    // Cleanup function to clear the timeout if the component unmounts early
    return () => {
      clearTimeout(timer);
      console.log('this is on the clenaup function of useeffect',flashMessage)
      //setFlashMessage(false)
      localStorage.removeItem('sj_flashMessage')
      setFlashMessage(false)

    }
  }, []);//empty brackets ensure the useEffect runs ONLY on page load 

 console.log('is there a flashMessage? before return of  FlashMEssage compoenent?',JSON.parse(flashMessage))
 const options = JSON.parse(flashMessage);

  return (
    <>
      {options && (
        
          <div className={`w-full  fixed ${divCss} right-0 z-50 ${!isVisible?('hidden'):('')}`}>
            
            <div className="w-10/12 mx-auto opacity-70">
              <AlertBox message={options.message} type={options.type} />
            </div>
            
          </div>


        )


      }
    
    </>
    
    

  );
};

export default FlashMessage;
