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
            THANK YOU FOR YOUR ORDER!
          </h1>

        </header>

          <div className="flex h-auto flex-col  bg-white ">
            {              
              
              newOrderId ?
              <>
                <h2 className="font-serif text-zinc-900 text-lg">Your Order ID: #{newOrderId}</h2>              
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                  has been processed succesfully! 
                </p>
              </>
              :
              <><h2 className="font-serif text-zinc-900 text-lg">Your Order  </h2>              
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                  Your Order has been processed but we seem unable to retrieve an order id for your reference, please contact the store for confirmation of your order and further support.  
                </p>
              </>                   
           
              
            }  
            
            <p className="text-xs text-zinc-400  tracking-widest font-light">
                Your payment is in process of being completed, once this step is verified you'll receive a confirmation e-mail. 
            </p>
              
              {
                cTxId &&
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                    Your payment transaction ID:{cTxId} has been succesfully confirmed!
                  </p>
              }

              <h3 className="text-[11px] text-zinc-900 font-serif tracking-widest font-light">
                Thank you for shopping with Us!  Have a great day!
              </h3>

                
          </div>
      </div>
      
    </Template>
  );

};

export default Thankyou;
