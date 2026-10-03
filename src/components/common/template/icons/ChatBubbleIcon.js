import React from "react";
import { MessageCircle } from 'lucide-react'; // Instala lucide-react si no lo tienes


const ChatBubbleIcon = ({className='', iconClassName='w6 h-6 stroke-zinc-600'}) => {
  
   

  return (
    
                
    <div className={` ${className}  `}>
    
            <MessageCircle 
                    size={24} 
                    strokeWidth={1.2} 
                    className="transform group-hover:rotate-6 transition-transform duration-300"
                  />

    </div>       
              
             
           
  );
};

export default ChatBubbleIcon;