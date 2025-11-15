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

import AuthService from "../../../services/auth.service";

const NavBottom = ({isLoggedIn, user}) => {
  //HERE YOU CAN CHANGE THE ICONS AND LINKS COLORS AND HOVERS
const linkClass = `m-1 hover:text-purple-300 focus:text-purple-400 text-zinc-700 text-center drop-shadow-sm`;
const linkClassActive = `m-1 text-zinc-700 hover:text-purple-300 focus:text-purple-400 text-center drop-shadow-md`;
//const user = AuthService.getCurrentUser();

  return (
       
      <nav id="responsive-bottom-nav" 
            className="w-full mt-4 mb-2 content-start h-24 md:hidden fixed bottom-4 left-0 z-30 px-4 shadow-lg">

          <div className="flex flex-row justify-between font-light text-xs ">
            
              <NavLink to={"/home"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <HomeIcon className={"mx-auto w-8 h-8"}/>
                Home
              </NavLink> 
              <NavLink to={"/collection"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <JewelIcon className={"mx-auto w-8 h-8"}/>
                Collection
              </NavLink> 
              <NavLink to={"/featured"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <FeaturedIcon className={"w-8 h-8 mx-auto"}/>
                Featured
              </NavLink> 
              <NavLink to={"/sizing"} className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
                <RulerIcon className={"w-8 h-8 mx-auto"}/>
                Sizing
              </NavLink>            
                      
          </div>
      </nav>
      
      
    
  );
};

export default NavBottom;
