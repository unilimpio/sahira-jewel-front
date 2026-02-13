import React, {  } from "react";
import { } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";




const Loading = () => {

 


  return (
    
      <div className="w-full mx-auto z-50 fixed  top-14 right-0">
                          <div className="flex mx-auto items-center justify-center w-fit rounded-lg bg-opacity-75 bg-black p-3 mt-16">
                              <svg className="animate-spin h-10 w-10 fill-white" viewBox="0 0 24 24">
                                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                                <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                              </svg>
                              <span className="text-white font-extralight ml-2">Loading...</span>
                        </div>
        </div>
      
   
  );
};

export default Loading;
