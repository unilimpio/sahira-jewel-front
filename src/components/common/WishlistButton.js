import React, { useState, useEffect, useId} from "react";
import { HeartIcon } from '@heroicons/react/24/outline';


import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router";

const user = AuthService.getCurrentUser();



export default function WishlistButton ({product, setMessage, buttonClassName, iconClassName}) {

const navigate = useNavigate();
    



function handleClick(event){        
            
     event.preventDefault();
        

    if(user){

        try{

            UserService.setWish(user, product.id).then(

                        (response) => {
                            
                                    
                            console.log(response?.data)                  
                            console.log(response?.data.message)

                            setMessage(response?.data.message)
                        
                        
                        },

                        (error) => {
                            const _content =
                            (error?.response && error?.response.data) ||
                            error?.messages ||
                            error?.toString();
                            console.log(error)
                            
                            if(error.status === 401 ){

                                AuthService.removeCurrentUser()
                            // window.location.reload();
                            }
                           
                            
                        
                        }
                        
            )
        } catch (error) {

            console.log(error)

        }

        

    } else {

        navigate('/login')
    }

              


}
            
return (
          
          
    <button  className={`${buttonClassName}  `}

                              onClick={handleClick}>
                              <span className="sr-only">Add to Wishlist</span>                        
                            <HeartIcon aria-hidden="true" className={`mx-auto  group-focus:fill-red-400 stroke-zinc-600  ${iconClassName} `} />
                                                  
    </button>
          
);


}


