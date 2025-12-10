import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate, Navigate} from "react-router";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";

 import CardSlider from './common/CardSlider'; // Assuming CardSlider.js
 import HeroBanner from './common/HeroBanner';
 
 import AlertBox from "./common/template/AlertBox";

import InstagramIcon from "./common/template/icons/InstagramIcon";

const user = AuthService.getCurrentUser();

export default function Home () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-full mx-auto mb-4 overflow-hidden`;

  if (!user ){
     localStorage.removeItem("sj_session");
  }

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [content, setContent] = useState(false);//the whole data object returned by the api call

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
                   
                  
                  },
    
                  (error) => {
                    const _content =
                      (error?.response && error?.response.data) ||
                      error?.message ||
                      error?.toString();
                    
                    //setProducts(_content);
                    console.log(error)
                  
                  }
                
              )

    setLoading(false)
    
          
          return () => {
    
          };
    
  }, []);
      
 
  
    return (
    

      <Template >

        <div className={`mt-12 `+wrapperClass}>
          
          
             {message &&(
            
                        <AlertBox divClassName={'mx-4'} message={message} setMessage={setMessage}/>             
                         
              )}   
              

              {user && (
                <div className="absolute  top-16 left-2 z-40 flex  bg-white rounded-full w-fit p-1 px-3"> 
                  <div className="text-lg animate-wiggle">👋</div><span className="font-light text-base">Hola {user?.fullname} !</span>                           
                </div>
                )          
              }
        {content && (
          <div className={'relative'}>    
              
        <div className="mx-auto w-full h-[90vh] overflow-hidden mb-20">
            <HeroBanner banners={content.banners} />
        
        </div>
        <div className="">
                <h1 className="text-zinc-600 font-thin font-serif text-2xl sm:text-4xl p-2 text-center">
                      Joyas con Raíz Ancestral
                </h1>
                <h2 className="font-serif text-xl sm:text-2xl text-zinc-600  p-4 text-center">
                  Joyería atemporal en plata 925. <br/>Inspirada en las culturas precolombinas de Ecuador y creada especialmente para ti.
                </h2>
        </div>
        
              
        <div className="mx-auto w-[85vw] sm:w-full mt-16 mb-24">
              <CardSlider cards={content.cards} setMessage={setMessage}/>
        
        </div>     
                  
              
        &nbsp;&nbsp;&nbsp;
        <div className="mx-auto w-[85vw] sm:w-full  mb-56">
              <h5 className={'text-center text-zinc-400 text-4xl my-8'}>Follow Us</h5>
              <a href={'https://www.instagram.com/sahirajewelry.ec'} className={'text-center text-4xl'}>
                <InstagramIcon className={'transition-all hover:-translate-y-2 hover:scale-110'} 
                iconClassName={'w-10 h-10 mx-auto stroke-zinc-400 stroke-1'} />
              </a>
        
        </div> 

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
      
      
      </Template>
    
    
      
    ); 

};


