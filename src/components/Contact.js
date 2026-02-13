import React, { useState, useEffect } from "react";

import { Link } from "react-router";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { ChevronDownIcon } from '@heroicons/react/16/solid'

//navigate("/login");

import Template from "./common/template/Template";



const wrapperClass = `w-full h-full p-4 mb-4 mx-auto `;

 

export default function Contact () {
  
  const user = AuthService.getCurrentUser();

  
    return (
    
      <Template>
      <div className={` `+wrapperClass}>

        
          <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Contact</h1>
      
          <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
      
       
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-zinc-600 sm:text-5xl dark:text-white">
          Contact
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
          Para diseños personalizados, consultas, o simplemente para decir hola!
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-zinc-600 dark:text-white">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-600 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sahira-green dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-zinc-600 dark:text-white">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-600 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sahira-green dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-zinc-600 dark:text-white">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-600 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sahira-green dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-sahira-green"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-zinc-600 dark:text-white">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-sahira-green dark:bg-white/5 dark:outline-white/10 dark:has-[input:focus-within]:outline-sahira-green">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sahira-green sm:text-sm/6 dark:bg-transparent dark:text-gray-400 dark:placeholder:text-gray-500 dark:focus:outline-sahira-green"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                    <option>Ecuador</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                  />
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="123-456-7890"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-zinc-600 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-zinc-600 dark:text-white">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-600 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sahira-green dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                defaultValue={''}
              />
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px outline-offset-2  ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out has-[:checked]:bg-sahira-green has-[:focus-visible]:outline has-[:focus-visible]:outline-2 dark:bg-white/5  dark:ring-white/10 dark:has-[:checked]:bg-sahira-green">
                <span className="size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-3.5" />
                <input
                  id="agree-to-policies"
                  name="agree-to-policies"
                  type="checkbox"
                  aria-label="Agree to policies"
                  className="absolute inset-0 appearance-none focus:outline-none"
                />
              </div>
            </div>
            <label htmlFor="agree-to-policies" className="text-sm/6 text-gray-600 dark:text-gray-400">
              By selecting this, you agree to our{' '}
              <Link to="/privacy" className="whitespace-nowrap font-semibold text-zinc-700 ">
                privacy policy
              </Link>
              .
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-sahira-green drop-shadow-md hover:drop-shadow-lg focus:drop-shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 ring-sahira-green ring-2"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>

        
      </div>
      </Template>
    );

  

    
    

    
  
  
};


