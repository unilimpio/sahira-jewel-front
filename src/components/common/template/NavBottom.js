import React from "react";
import {  Link, NavLink } from "react-router";
 //import { NavLink } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";
import HomeIcon from "../template/icons/HomeIcon"
import JewelIcon from "../template/icons/JewelIcon"
import RulerIcon from "../template/icons/RulerIcon"
import FeaturedIcon from "../template/icons/FeaturedIcon"
import HeartIcon from "../template/icons/HeartIcon"
import AuthService from "../../../services/auth.service";

const NavBottom = ({isLoggedIn, user}) => {
  //HERE YOU CAN CHANGE THE ICONS AND LINKS COLORS AND HOVERS
const linkClass = `m-1 font-serif hover:drop-shadow-md hover:text-sahira-green no-underline hover:font-normal font-light focus:text-sahira-green  text-zinc-500 text-center hover:no-underline transition-all hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-105`;
const iconClass = `mx-auto w-6 h-6 fill-zinc-600 stroke-zinc-600`;

const linkClassActive = `m-1 font-serif no-underline text-sahira-green font-normal hover:no-underline -translate-y-1 scale-110 drop-shadow-md `;
//const user = AuthService.getCurrentUser();

  return (
       
      <nav id="responsive-bottom-nav" 
            className="w-full content-between h-[13vh] pt-2 sm:hidden fixed bottom-0 left-0 z-40 
             bg-gradient-to-b bg-white shadow-lg
            px-4">

          <div className="flex flex-row justify-between font-light text-sm mt-1">
            
              <NavLink to={"/home"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <HomeIcon className={`${iconClass}`}/>
                Home
              </NavLink> 
              <NavLink to={"/collection"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <JewelIcon className={`${iconClass}`}/>
                Collection
              </NavLink> 
              <NavLink to={"/featured"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <FeaturedIcon className={`${iconClass}`}/>
                Featured
              </NavLink> 
              <NavLink to={"/wishlist"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <HeartIcon className={` `} iconClassName={` mx-auto stroke-zinc-600 stroke-2 w-6 h-6`}/>
                Wishlist
              </NavLink>            
                      
          </div>
      </nav>
      
      
    
  );
};

export default NavBottom;
