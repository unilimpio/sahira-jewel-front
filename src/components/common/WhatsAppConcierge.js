import React from 'react';
import { MessageCircle } from 'lucide-react'; // Instala lucide-react si no lo tienes

const WhatsAppConcierge = ({mobile = '593988012665', 
                            message = 'Hola, SAHIRA. Me gustaría recibir asesoría personalizada para elegir una joya. ¿Podrían ayudarme?',
                            className = 'fixed z-50 bottom-32 right-8',
                            isVisible = true
                          }) => {
  // Tu número con código de país de Ecuador (593) sin el cero inicial
  const whatsappUrl = `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
            ${className}  flex items-center gap-3  group bg-white border border-black text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out px-3 py-2 md:px-4 md:py-3 rounded-full  no-underline hover:underline
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ` }
      aria-label="Contact Private Concierge"
    >
      {/* Texto elegante que aparece sutilmente o se mantiene fijo */}
      <span className="text-xs font-light tracking-[0.2em] uppercase select-none">
        Concierge
      </span>
      
      {/* Icono minimalista de WhatsApp/Chat */}
      <MessageCircle 
        size={18} 
        strokeWidth={1.2} 
        className="transform group-hover:rotate-6 transition-transform duration-300"
      />
    </a>
  );
};

export default WhatsAppConcierge;