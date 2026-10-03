import React from "react";
import { NavLink } from "react-router";

import HomeIcon from "../template/icons/HomeIcon";
import JewelIcon from "../template/icons/JewelIcon";
import HeartIcon from "../template/icons/HeartIcon";
import UserIcon from "../template/icons/UserIcon";

const NavBottom = ({ isLoggedIn, user }) => {
  // Pure monochromatic luxury styling classes
  const linkClass = "flex flex-col items-center justify-center relative py-2 px-3 no-underline text-zinc-400 hover:text-black transition-all duration-300 ease-out group";
  const linkClassActive = "flex flex-col items-center justify-center relative py-2 px-3 no-underline text-black transition-all duration-300 ease-out group";
  
  // Clean, thin iconography boundaries
  const iconClass = "w-5 h-5 mb-1 transition-transform duration-300 ease-out group-hover:-translate-y-[2px] stroke-[1.25] stroke-zinc-400 group-hover:stroke-black";

  return (
    <div className="sm:hidden fixed bottom-5 left-0 right-0 z-50 px-4 w-full flex justify-center pointer-events-none">
      <nav 
        id="responsive-bottom-nav" 
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-zinc-100 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-1 pointer-events-auto"
      >
        <div className="flex flex-row justify-between items-center text-[9px] tracking-[0.15em] font-medium antialiased">
          
          <NavLink to="/home" className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
            <HomeIcon iconClassName={iconClass} />
            <span>HOME</span>
            <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100" />
          </NavLink> 

          <NavLink to="/collection" className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
            <JewelIcon iconClassName={iconClass} />
            <span>SHOP</span>
            <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100" />
          </NavLink> 
          
          <NavLink to="/wishlist" className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
            <HeartIcon iconClassName={iconClass} />
            <span>WISHLIST</span>
            <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100" />
          </NavLink>

          {isLoggedIn ? (
            <NavLink to="/account" className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
              <UserIcon className={iconClass} />
              <span className="text-center">MY <br/>ACCOUNT</span>
              <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100" />
            </NavLink>      
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? linkClassActive : linkClass)}>
              <UserIcon className={iconClass} />
              <span className="text-center">SIGN IN</span>
              <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100" />
            </NavLink>
          ) }
                 
                  
        </div>
      </nav>
    </div>
  );
};

export default NavBottom;
