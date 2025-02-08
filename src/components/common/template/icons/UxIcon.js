import React from "react";

const UxIcon = ({mainColor}) => {
  
  const textColor = `text-`+mainColor || `text-white`;
  const borderColor = `border-t-`+mainColor || `border-t-white`;  

  return (
    
                
    <div className="text-center mx-auto w-6 h-6 stroke-2 text-white">
    
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<circle cx="12" cy="12" r="10" stroke="#FFF"/>
	<path d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1" stroke="#FFF"/>
	<path d="M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5.448-1.5 1-1.5 1 .672 1 1.5" fill="#FFF"/>
	<ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#FFF"/>
</svg>
                
    </div>       
              
             
           
  );
};

export default UxIcon;