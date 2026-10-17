import React, { useState, useEffect, useRef } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//navigate("/login");

import Template from "./common/template/Template";

// 1. Importa tu Hook de Autenticación Global
import { useAuth } from "../context/AuthContext"; 





import image1 from '../assets/sj-pulsera-tinku2.jpeg'
import image2 from '../assets/sj-amparito.jpeg'





const wrapperClass = `mt-12 w-full h-full p-2 mb-4  mx-auto `;

export default function About ({cart,setCart}) {
  
 // const user = AuthService.getCurrentUser();
  // 3. Extraemos el usuario actual directamente desde el Contexto de React
   const { user } = useAuth(); 

    const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick
    
     const bottomRef = useRef(null);
  

  useEffect(() => {

    
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the bottom sentinel is visible, hide the component. 
        // Otherwise, keep it visible.
        setBottomIsVisible(!entry.isIntersecting);
        console.log('the bottom of the page has been reached!!!!!!!!')
      },
      { 
        threshold: 0.1, // Triggers as soon as the bottom 10% of the sentinel enters
        rootMargin: "0px 0px 50px 0px" // Optional: Triggers 50px before reaching the exact bottom
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
          
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
    
  }, []);

  
    return (
    
      <Template bottomIsVisible={bottomIsVisible} cart={cart} setCart={setCart}>

      <div className={`  ${wrapperClass}`}>

        
          
      
        

        {/* Content section */}
        
              
              <div className="flex w-full mx-auto lg:h-[60vh] overflow-hidden items-center ">
                <picture className="w-full h-auto object-fill object-left-bottom">
                  
                  <source 
                    media="(min-width: 1440px)" 
                    srcSet="/assets/images/legacy-banner-desktop.jpg" 
                    type="image/jpeg"
                  />

                 
                  <source 
                    media="(min-width: 1024px)" 
                    srcSet="/assets/images/legacy-banner-tablet.jpg" 
                    type="image/jpeg"
                  />

                  
                  <source 
                    media="(min-width: 768px)" 
                    srcSet="/assets/images/legacy-banner-mobile.jpg" 
                    type="image/jpeg"
                  />

                  
                  <img 
                    src="/assets/images/legacy-banner-xlarge.jpg" 
                    alt="Close-up profile of a woman wearing structured geometric silver statement earrings" 
                    className="w-full h-auto object-fill object-bottom"
                    width="1024"
                    height="576"
                    loading="eager"
                    decoding="async"
                  />
                </picture>

                
                
              </div>
        <div className="w-full mx-auto mt-2 max-w-7xl px-2 sm:mt-0 lg:px-3 xl:-mt-8">
          <div className="w-full mx-auto max-w-2xl lg:mx-0 lg:max-w-none p-1">
            
            <h1 className="p-8 text-zinc-600 text-4xl font-serif  md:text-5xl lg:text-6xl text-center">THE LEGACY</h1>
            
            <div className="w-full mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full flex-col">
                
                  <h2 className="italic font-serif my-40 mx-4 p-2 text-zinc-600 text-justify">
                    "Two generations, one shared essence. A mother and daughter united by a lifelong devotion to art, design, and the alchemy of metalsmithing."
                  </h2>

                  <p className="text-xl/12  text-justify font-serif leading-loose p-1   ">
                      We began this journey following our hearts, creating pieces that modernize our pre-Columbian culture through a timeless lens. Our purpose is to design contemporary fine jewelry that defies eras and trends—treasures meant to be worn, shared, and passed down across generations.

                      When a woman wears a SAHIRA piece, she is not just wearing a sculpture of silver and light; she carries a symbol of her own power. We create to remind every woman that she is strong, resilient, brave, and fierce—capable of everything for those she loves. It is art turned into armor.

                      In Kichwa, Sahira means Goddess of Creation.</p> 
                  <p className="text-xl/12  text-justify font-serif leading-loose p-1   ">
For years, I questioned why my family chose an ancient, uncommon name when no one around me spoke the language. Today, in the quiet of our workshop, everything makes sense. Long before I was born, my destiny was already written: I was meant to create art alongside my mother, the woman who gave me life and taught me to fight for my dreams without ever giving up.

                      To you, Mom, thank you for your constant support in each of my wild pursuits, for your unwavering example of womanhood, and for every sacrifice you have made for our family. If it weren't for you, for your strength and your guidance, this dream would have never begun. This project is, above all, a tribute to you.
                </p>
              </div>
              
            </div>
          </div>
        </div>

        

       
        
      </div>
      <div 
          ref={bottomRef} 
          style={{ height: "1px", width: "100%", position: "absolute", bottom: 0 }} 
        />  
      </Template>
    );

  

    
    

    
  
  
};


