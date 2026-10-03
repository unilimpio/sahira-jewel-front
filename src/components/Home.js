import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";


import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";


 
 import AlertBox from "./common/template/AlertBox";

 import ProductGrid from "./common/ProductGrid";

import InstagramIcon from "./common/template/icons/InstagramIcon";



import hero_img from '../assets/hero-image.png';

import Logo from "./common/Logo";
import WhatsAppConcierge from "./common/WhatsAppConcierge";


const user = AuthService.getCurrentUser();
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;
const pathToImg = "assets/uploads/"

export default function Home () {
  
 

  const wrapperClass = `w-full h-full mx-auto mb-54 overflow-hidden`;

  if (!user ){
     localStorage.removeItem("sj_token");
     localStorage.removeItem("sj_user");
  }

  const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [content, setContent] = useState(false);//the whole data object returned by the api call

   const bottomRef = useRef(null);

  /*const cardData = [
          { title: 'Card 1', description: 'Description for card 1' },
          { title: 'Card 2', description: 'Description for card 2' },
          { title: 'Card 3', description: 'Description for card 3' },
          { title: 'Card 4', description: 'Description for card 4' },
        ];*/

 

  useEffect(() => {

    setLoading(true)

    UserService.getContent().then(
    
                  (response) => {
                    
                      setContent(response?.data);
                             
                      console.log(response?.data)                  
                      console.log(response?.data.cards)
                      console.log(response?.data.products)
                   
                  
                  },
    
                  (error) => {
                    const _content =
                      (error?.response && error?.response.data) ||
                      error?.message ||
                      error?.toString();
                    
                    //setProducts(_content);
                    console.log(_content)
                  
                  }
                
              )

    setLoading(false)
    
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
    

      <Template bottomIsVisible={bottomIsVisible}>

        <div className={`mt-12 `+wrapperClass}>
          
          
             {message &&(
            
                        <AlertBox divClassName={'mx-4'} message={message} setMessage={setMessage}/>             
                         
              )}   
              

              {user && (
                <div className="absolute  top-16 left-2 z-40 bg-white rounded-full w-fit px-3 hidden"> 
                                          
                </div>
                )          
              }
        {content && (
          <div className={'relative'}>    
              
          <div className="flex-col mx-auto content-start justify-center w-full min-h-[90vh] mb-18 py-8 ">
              {//<HeroBanner banners={content.banners} />
              }
              <div className={`flex justify-center pl-6`}>
                  <Logo className={"w-44 "} iconClassName={'fill-sahira-black h-11'}/>
              </div>

              <h1 className="text-[9px] text-center font-light font-script mt-4">Jewelry born from the soul of Ecuador</h1>
              <Link to="/collection" className="text-zinc-700 no-underline hover:underline">
                <h2 className="text-[8px] text-center font-script mb-20 ">EXPLORE THE COLLECTION</h2>
              </Link>
              <div className="flex w-full mx-auto lg:h-[50vh] overflow-hidden items-center ">
                <picture className="w-full h-auto object-fill object-bottom">
                  
                  <source 
                    media="(min-width: 1440px)" 
                    srcSet="/assets/images/hero-banner-xlarge.jpg" 
                    type="image/jpeg"
                  />

                 
                  <source 
                    media="(min-width: 1024px)" 
                    srcSet="/assets/images/hero-banner-desktop.jpg" 
                    type="image/jpeg"
                  />

                  
                  <source 
                    media="(min-width: 768px)" 
                    srcSet="/assets/images/hero-banner-tablet.jpg" 
                    type="image/jpeg"
                  />

                  
                  <img 
                    src="/assets/images/hero-banner-mobile.jpg" 
                    alt="Close-up profile of a woman wearing structured geometric silver statement earrings" 
                    className="w-full h-auto object-fill object-bottom"
                    width="1024"
                    height="576"
                    loading="eager"
                    decoding="async"
                  />
                </picture>

               
                
              </div>
              <div className="flex justify-center p-8 mt-24 ">
                <div className="flex-col justify-center content-center my-2 text-center font-light text-[9px]">
                  <h3 className="m-0 font-light text-[9px]">HANDCRAFTED IN ECUADOR</h3>
                  <hr className="m-2 border-t border-black w-[9px] mx-auto"></hr>
                  <h3 className="m-0 font-light text-[9px]">STERLING SILVER 925</h3>
                  <hr className="m-2 border-t  border-black w-[9px] mx-auto"></hr>
                  <h3 className="m-0 font-light text-[9px]">LIMITED PIECES</h3>
                </div>             
                  
              </div>
              
          </div>
          
          <div className="flex flex-col justify-center ">
            <h2 className="text-center font-script text-sm ">Colecciones Exclusivas</h2>
            <h3 className="text-[10px] font-light text-center">Joyas de autor hechas a mano en Ecuador</h3>
            <div className="mx-auto w-[85vw] sm:w-full mb-24 p-4">
              <ProductGrid products={content.products} />
            </div>
          </div>
          
          

          {/*
            <div className="mx-auto w-[85vw] sm:w-full mb-24">
              <CardSlider cards={content.cards} setMessage={setMessage}/>
            </div> 

          */}
          
             
                  
              
          

        </div>
          )
       }

       {(!content  || loading) &&(

            <div className="flex mx-auto items-center justify-center w-fit rounded-lg bg-opacity-75 bg-black p-3">
                  <svg className="animate-spin h-10 w-10 fill-white" viewBox="0 0 24 24">
                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-white font-extralight ml-2">Loading...</span>
            </div>

          )}
        
      </div>
      
        <div 
          ref={bottomRef} 
          style={{ height: "1px", width: "100%", position: "absolute", bottom: 0 }} 
        />  
      </Template>
    
    
      
    ); 

};


