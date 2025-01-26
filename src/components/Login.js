import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Template from "./common/template/Template";


import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const wrapperClass = `w-full mx-auto border border-slate-600 p-2 rounded-b-lg md:rounded-b-none bg-white shadow-md`;


  return (

    <Template>
      <div className={wrapperClass}>
        <div className=" sm:w-4/5 md:w-3/5 z-0 m-2 p-2 sm-p-4 border-1 border-slate-400 bg-zinc-100 shadow-md rounded-md ">
       
       <div className="flex flex-row ">
         <img
         src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
         alt="profile-img"
         className="w-16 sm:w-20 rounded-full opacity-75 z-10 "
         /> 
         <h1 className="text-zinc-600 -ml-4 mt-2 z-10">Login</h1> 
       </div>
       

       <Form onSubmit={handleLogin} ref={form}>
         <div className=" flex flex-col sm:flex-row  sm:justify-start sm:w-fit sm:pl-12 my-2">
           
             <label htmlFor="email" className="mx-2">Email:</label>
           
           
             <Input
               type="text"
               className="text-lg rounded-md border border-zinc-600 h-10 p-3 "
               name="email"
               autoComplete="email"
               value={email}
               onChange={onChangeEmail}
               validations={[required]}
             />
         </div>

         <div className="flex flex-col sm:flex-row sm:pl-12 justify-center sm:justify-start my-2">
           <label htmlFor="password" className="mx-2">Password:</label>
           <Input
             type="password"
             className=" rounded-md border border-zinc-600 h-10 p-3"
             autoComplete="current-password"
             name="password"
             value={password}
             onChange={onChangePassword}
             validations={[required]}
           />
         </div>

         <div className=" flex sm:pl-12 sm:w-8/12 justify-center sm:justify-start my-2">
           
             {loading && (
             <button className="bg-slate-400 border-2 rounded-md py-2 w-[7rem] relative text-left" disabled={loading}>
               <svg className="absolute left-1 animate-spin h-4 w-4 fill-white" viewBox="0 0 24 24">
                 <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                 <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
               </svg>
               <span className="text-white ml-8">Loading</span>
             </button>
             )} 
             {!loading && (
             <button className="bg-sky-800 hover:shadow-lg hover:bg-sky-600 rounded-md w-[7rem] text-left py-2" disabled={loading}>
               <span className="text-white ml-8">Login</span>
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
         <CheckButton style={{ display: "none" }} ref={checkBtn}  className=""/>
       </Form>
     
        </div>
      </div>
    </Template>
    
  );

};

export default Login;
