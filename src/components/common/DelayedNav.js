



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


function DelayedNav({secs = 5,url,sID,c,active = true}) {
  
  
    const navigate = useNavigate();  
    const [seconds, setSeconds] = useState(secs); // Initialize with 5 seconds
  
    useEffect(() => {
      // Exit if the countdown has finished
      if (seconds === 0) {
        //return navigate(url+'sID='+sID+'&c='+c)
        if(active){
          window.location.reload()
        }
        
      }
  
      // Set up an interval to decrement the seconds every second
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
  
      // Clean up the interval when the component unmounts or seconds become 0
      return () => {clearInterval(timer);

      }
    }, [seconds]); // Re-run effect when 'seconds' changes
  
    return (
      <span>     
        {seconds === 0 ? <> ...</> :
          <>en {seconds} seg.</>}
      </span>
    );
}


export default DelayedNav;