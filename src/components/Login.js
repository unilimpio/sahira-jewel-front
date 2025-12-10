import React, { useState } from "react";
import { useNavigate } from "react-router";

import Template from "./common/template/Template";


import AuthService from "../services/auth.service";



const Login = () => {
  
  
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (event) => {

    event.preventDefault();

    setMessage("");
    setLoading(true);

    const form = event.target;

    const formData = new FormData(form);

    const onSubmitEmail = formData.get("email");
    const onSubmitPassword = formData.get("password");

    if (onSubmitEmail && onSubmitPassword) {

      if(onSubmitEmail.indexOf('.com') !== -1 && onSubmitEmail.indexOf('@') !== -1 ){
        
        
        const regexSpecial = /[!@#$*.+]/;
        const regexNum = /[0-9]/g;
        const regexMayus = /[A-Z]/g;
        const regexMinus = /[a-z]/g;
        const regexLenght = /^[A-Za-z0-9!\@#$\*]{8,}$/
        const verifSpecial = onSubmitPassword.match(regexSpecial);
        const verifNum = onSubmitPassword.match(regexNum);
        const verifMayus = onSubmitPassword.match(regexMayus);
        const verifMinus = onSubmitPassword.match(regexMinus);
        const verifLenght = onSubmitPassword.match(regexLenght);
       

        console.log(verifLenght);
        console.log(verifSpecial);
        console.log(verifNum);
        console.log(verifMayus);
        console.log(verifMinus);

        // Expected output: Array ["T", "I"]  
        //if(verifLenght && verifSpecial && verifNum && verifMayus && verifMinus ){
        if(onSubmitPassword !== null ){
            AuthService.login(email, password).then(
                  () => {
                    navigate("/home");
                    window.location.reload();
                  },
                  (error) => {
                    setError(true)
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
                      console.log(resMessage)
                    
                    if(resMessage.indexOf('401') !== -1){
                    
                      setMessage('Oopps...esto es extrano. El usuario no ha sido reconocido, Revise las credenciales ingresadas y vuelva a intentar.');

                    } else {

                      setMessage(resMessage) 
                    }
                    
                  }
            );

        } else {

          setError(true);
          setMessage('La contrasena ingresada no es valida. Por favor verifique y vuelva a intentar.')

        }


      } else {

        setError(true);
        setMessage('EL correo ingresado parece ser invalido. Por favor verifique y vuelva a intentar.')
      
      }

      
    } else {
      
      setError(true)
      setMessage('Por favor ingrese su correo y contrasena para continuar.')

      
    }
    setLoading(false);
  };

  const wrapperClass = `w-full mx-auto  p-2 `;


  return (

    <Template>
      <div className={wrapperClass}>
        <div className=" sm:w-4/5 md:w-3/5 z-0 m-2 p-2 sm-p-4 ">
       
          <div className="flex flex-row relative">
            
            <h1 className="text-zinc-600 font-serif mt-16 z-10">Login</h1> 
          </div>
       

          <form onSubmit={handleLogin} >
            <div className=" flex flex-col sm:flex-row  sm:justify-start sm:w-fit sm:pl-12 my-2">
              
                <label htmlFor="email" className="text-sm font-light mx-2">Email:</label>
              
              
                <input
                  type="text"
                  className="w-1/2 text-xs font-light bg-white rounded-sm ring-1 ring-sahira-green  p-2 "
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                   
                />
            </div>

            <div className="flex flex-col sm:flex-row sm:pl-12 justify-center sm:justify-start my-2">
              <label htmlFor="password" className="text-sm font-light mx-2">Password:</label>
              <input
                type="password"
                className="w-1/2 font-light rounded-sm ring-1 ring-sahira-green p-1"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={onChangePassword}
                
              />
            </div>

            <div className=" flex sm:pl-12 sm:w-8/12 justify-left sm:justify-start my-2 mt-4">
              
                {loading && (
                <button className="bg-slate-400 border-2 rounded-md py-2 w-[7rem] relative text-left" disabled={loading}>
                  <svg className="absolute left-1 animate-spin h-4 w-4 fill-silver-500" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-zinc-600 ml-8">Loading</span>
                </button>
                )} 
                {!loading && (
                <button className="bg-white drop-shadow-lg hover:bg-sahra-green rounded-sm ring-2 ring-sahira-green w-[7rem] text-left py-2" disabled={loading}>
                  <span className="text-sahira-green font-semibold ml-8">Login</span>
                </button>
                )}
              
            </div>

            {message && (
              <div className="">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
          </form>
     
        </div>
      </div>
    </Template>
    
  );

};

export default Login;
