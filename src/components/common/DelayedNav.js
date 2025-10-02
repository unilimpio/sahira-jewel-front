



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


function DelayedNav({url,sID,c}) {
  
  
    const navigate = useNavigate();  
    const [seconds, setSeconds] = useState(5); // Initialize with 5 seconds
  
    useEffect(() => {
      // Exit if the countdown has finished
      if (seconds === 0) {
        //return navigate(url+'sID='+sID+'&c='+c)
        window.location.reload()
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