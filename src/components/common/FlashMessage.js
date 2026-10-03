// FlashMessage.jsx
import React, { useEffect, useState } from 'react';

import AlertBox from './template/AlertBox';

const FlashMessage = ({ flashMessage,  setFlashMessage, duration = 8000 , divCss=' fixed bottom-36 left-0 w-full z-50    ' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the message
    const timer = setTimeout(() => {
      console.log('inside timeout')
        setIsVisible(false);
        
        localStorage.removeItem('sj_flashMessage')
        setFlashMessage(false)
      //console.log(typeof clearMessage)
      //clearMessage()
      

      
    }, duration);

    // Cleanup function to clear the timeout if the component unmounts early
    return () => {
      clearTimeout(timer);
      //console.log('this is on the clenaup function of useeffect',flashMessage)
      //setFlashMessage(false)
      localStorage.removeItem('sj_flashMessage')
      //setFlashMessage(false)

    }
  }, [duration,setFlashMessage]);//empty brackets ensure the useEffect runs ONLY on page load 

 console.log('is there a flashMessage? before return of  FlashMEssage compoenent?',JSON.parse(flashMessage))
 const options = JSON.parse(flashMessage);

  return (
    <>
      {options && (
        
          <div className={`   ${divCss}   ${!isVisible?('hidden'):('')}`}>
            
            <div className="w-10/12 mx-auto opacity-70 h-18">
              <AlertBox message={options.message} type={options.type} setFlashMessage={setFlashMessage}/>
            </div>
            
          </div>


        )


      }
    
    </>
    
    

  );
};

export default FlashMessage;
