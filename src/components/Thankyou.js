import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, Link  } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Template from "./common/template/Template";
import { useAuth } from "../context/AuthContext"
import { useSearchParams } from "react-router";
import { useParams } from 'react-router';

 //const user = AuthService.getCurrentUser();

 
const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;


 function usePersistedState(key, defaultValue) {
   const [state, setState] = useState(() => {
     const storedValue = localStorage.getItem(key);
     return storedValue ? JSON.parse(storedValue) : defaultValue;
   });
 
   useEffect(() => {
     localStorage.setItem(key, JSON.stringify(state));
   }, [key, state]);
 
   return [state, setState];
 }
 
 
const Thankyou = () => {

 // const user = useAuth();

   
   const [searchParams] = useSearchParams();
    const cTxId = searchParams.get('cTxId');
    const id = searchParams.get('id');

    const { newOrderId } = useParams(); 
  
  const wrapperClass = `max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide `;

  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

useEffect(() => {

    if(id && cTxId ){

      setLoading(true);

      const options = {
                        "id": id,
                        "clientTxId": cTxId
                      };
      //const token = process.env.PAYPH_TOKEN;                
      const token = `
      52pdQ0SBP1803bNPBrATgUpsAo9rHE0M0l8QBzJFvA7cpN_7dJNFFy2-g8tekU-uyUGh8zjaw6XOnAumF-6JkUaUitGOCXwK8cJsi592j0YC2KtvjwFnZ6ZfQl6pq8aiK4PmjDWzgFwbpbSrsgGvwXtYIArBXm00AcfBEooIEIO6EAW1HvmJmRcaCAgXKTXugQE_5n5t4-QRxhRabx6MwVUTzvwXp7VztI_ye70F0cpZOsxx-9svAikfQ_FGcpehNDc28JXQxC5XDMs1ifCisFFsrzL5xe0iOMYiGkF40030LCrCZJ3h41zZmWP-xLG0zHV1dg
      `

      UserService.orderConfirm(options, token)
      .then((response) => {
         console.log(response.data)
        

      })
      .catch((error) => {
        console.error("Error getting order confirmation from payphone:", error);
      })
      .finally(() => {
        setLoading(false);
      });


    }
    
    if(newOrderId){
      console.log('en este bucle no se valida el pago solo se muestra la confirmacion de la orden con el order id')
       localStorage.removeItem('sjCart');//assure you refresh the memory with a blank cart
    }
    
    
    
  }, [id, cTxId ]);


  return (
    <Template >
      <div className={` ${wrapperClass} `}>
        {/* Page Header */}
        <header className="border-b border-zinc-100 pt-8 pb-4 ">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            THANK YOU!
          </h1>
          {
            newOrderId &&
            
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                Your Order ID:{newOrderId} has been registered and Confirmed succesfully! 
              </p>
              
           
              
          }    
          
          

          
        </header>

          <div className="flex h-auto flex-col  bg-white ">
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                You should receive an e-mail confirmation soon with this information, for your record. 
              </p>
              {
                cTxId &&
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                    Your payment transaction ID:{cTxId} is being processed!
                  </p>
              }

              <h2 className="text-[11px] text-zinc-400 uppercase tracking-widest font-light">
                Thank you for shopping with Us! Have a great day!
              </h2>

                
          </div>
      </div>
      
    </Template>
  );

};

export default Thankyou;
