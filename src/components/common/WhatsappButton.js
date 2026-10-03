import React from "react";

import WhatsappIcon from "./template/icons/WhatsappIcon";

export default function WhatsappButton({ mobileNumber = '593988012665', message = 'Hola, necesito info sobre tus joyas de autor...' }) {
    
   
    const url = `https://wa.me/${mobileNumber}?text=${encodeURIComponent(message)}`;
    

    return (
        <a 
             // <--- Crucial para evitar submits accidentales
            className={``}
            href={url}
        >
            <span className="sr-only">Concierge</span>
            <WhatsappIcon 
                aria-hidden="true" 
                className={`mx-auto group-focus:fill-red-500 stroke-zinc-600 transition-all delay-150 duration-100 group-focus:-translate-y-1`} 
            />
        </a>
    );
}
