import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";



import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import LogoutIcon from "../template/icons/LogoutIcon"
import LoginIcon from "../template/icons/LoginIcon"
import UserIcon from "../template/icons/UserIcon"
import HamburguerIcon from "../template/icons/HamburguerIcon"
import CloseIcon from "../template/icons/CloseIcon"


import AuthService from "../../../services/auth.service";


import Logo from "../Logo";
import CartComponent from "../Cart";
import WishlistButton from "../WishlistComponent";
import HomeIcon from "./icons/HomeIcon";

const user = AuthService.getCurrentUser();

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

const Header = ({isLoggedIn}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  
	
  const [searchCourse, setSearchCourse] = useState('');

	const [cart, setCart] = usePersistedState('sjCart', []);

	const deleteCourseFromCartFunction = (course) => {
		const updatedCart = cart
							.filter(item => item.product.id !== course.id);
		setCart(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cart
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

  useEffect(() => {
    console.log('i am inside useeffect of cart component, this is supposed to reload the componene every time cart is modified, but is not working')
  }, [cart]);
  

  const linkClassIcons = `p-2 md:mx-4 text-slate-800 hover:text-white sm:text-xs md:text-lg lg:text-lg hover:-translate-y-1 hover:transition`;
  const linkClass = `p-3 font-light text-zinc-600 no-underline hover:text-sahira-green hover:underline text-sm sm:text-md md:text-lg lg:text-xl `;
  const link2Class = ` flex p-2 text-sahira-green no-underline hover:no-underline hover:text-zinc-400 text-sm sm:text-md md:text-lg lg:text-xl stroke-sahira-green hover:stroke-zinc-600`;

  const linkDrawerClass = `p-3 text-zinc-600 no-underline hover:text-zinc-800 hover:underline text-lg  `;

  const [hamIsOpen,setHamIsOpen] = useState(false);

  const HamburguerButton=({iconClassName,buttonClassName})=>{

    function handleClick(){

      setHamIsOpen(true);
      
    }

    return(
      
        <button  
          className={`p-2 ${buttonClassName}`} 
          onClick={handleClick}>
            <HamburguerIcon className={iconClassName}/>
        </button>
      
    );
  }

  const CloseButton=({iconClassName,buttonClassName})=>{

    function handleClick(){

      setHamIsOpen(false);
      
    }

    return(
      
        <button  
          className={`p-2 ${buttonClassName}`} 
          onClick={handleClick}>
            <CloseIcon className={iconClassName}/>
        </button>
      
    );
  }

  return (
    
      <header  className={`sticky top-0 z-40 flex-col`}>
        <div className=" relative z-40  w-full flex place-content-between  bg-sahira-beige           
            h-fit">
        
          <Link to={"/"} className="hover:no-underline fixed sm:static -top-20 -z-5">
            <Logo className={"w-36 sm:w-42 md:w-64"}/>
          </Link>
          <div className=" flex-col w-1/2 place-content-start justify-items-end ">
            <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 -z-50 justify-end">
                    
                          
                <Link to={"/about"} className={` `+ linkClass}>
                  Our Story
                </Link>
                <Link to={"/contact"} className={` `+ linkClass}>
                  Contact
                </Link>
                {isLoggedIn ? (
              
                  <> 
                                    
                    <Link to={"/logout"} className={` `+linkClass}>
                      <LogoutIcon/>
                      Logout
                    </Link>
                
                  </>  
                ) : (
                  <>
                
                    <Link to={"/login"} className={` `+linkClass}>
                      <UserIcon iconClassName={"w-6 h-6 "} className={""} /> 
                    
                    </Link>


                  
                  </>
                )}
                <CartComponent buttonClassName={""} className={"p-3"} iconClassName={"w-6 h-6 fill-zinc-600 hover:fill-sahira-green "} deleteCourseFromCartFunction={deleteCourseFromCartFunction} totalAmountCalculationFunction={totalAmountCalculationFunction} cart={cart} setCart={setCart}/>
          
            </nav>
            
            

          </div>
          
        </div>
        <nav className="flex justify-center w-full fixed sm:static sm:z-30 -top-20 -z-50 bg-sahira-beige">

              <div className="flex justify-between w-5/6">
                <Link to={"/"} className={` `+ link2Class}>
                  <HomeIcon iconClassName={'w-6 h-6 '} />&nbsp;Home
                </Link>
                <Link to={"/featured"} className={` `+ link2Class}>
                  Featured
                </Link>
                <Link to={"/collection"} className={` `+ link2Class}>
                  Collection
                </Link>
                <Link to={"/wishlist"} className={` `+ link2Class}>
                  Wishlist
                </Link>
              </div>             
                        
        </nav>
        <div id="mobile-top-menu" className="absolute w-full top-0 z-50 visible sm:hidden flex justify-center bg-sahira-beige">
          <nav className="flex flex-row w-full">                      
                      {
                        hamIsOpen ? (
                          <CloseButton iconClassName={`w-6 h-6 fill-zinc-600 ${hamIsOpen ? ('') : ('')}`} buttonClassName={`transition delay-150 ${hamIsOpen ? ('') : ('')}`}/>
                        ) : (
                          <HamburguerButton iconClassName={`w-6 h-6 stroke-zinc-600 ${hamIsOpen ? ('') : ('')}`} buttonClassName={`transition delay-150 ${hamIsOpen ? ('') : ('')}`}/>
                        )

                      }

                      <Link to={"/"} className="hover:no-underline sm:hidden flex flex-grow justify-center">
                        <Logo className={"w-36 sm:w-42 md:w-64"}/>
                      </Link>
                                    
                      <CartComponent buttonClassName={""} className={"p-3"} iconClassName={"w-6 h-6 fill-zinc-600   "}  deleteCourseFromCartFunction={deleteCourseFromCartFunction} totalAmountCalculationFunction={totalAmountCalculationFunction}  cart={cart} setCart={setCart}/>


          </nav>
          {
            hamIsOpen && (
              <div id="mobile-drawer-open" className={`fixed top-16 right-0 w-screen h-96 z-30  ${hamIsOpen ? ('opacity-100'):('opacity-0')}`}>
                
                <div className={`flex bg-white rounded-md border border-zinc-600 shadow-md `}>
                  
                  <nav className="flex flex-col mx-auto">
                  
                        
                      <Link to={"/about"} className={` `+ linkDrawerClass}>
                        Our Story
                      </Link>
                      <Link to={"/contact"} className={` `+ linkDrawerClass}>
                        Contact
                      </Link>
                      {isLoggedIn ? (
                    
                                                                  
                          <Link to={"/logout"} className={` `+linkDrawerClass}>
                            <LogoutIcon/>
                            Logout
                          </Link>
                      
                         
                      ) : (
                      
                      
                          <Link to={"/login"} className={`flex `+linkDrawerClass}>
                                                  <UserIcon iconClassName={"w-6 h-6 "} className={""} /> Account

                          
                          </Link>
                        
                        
                      )}
                              
                  </nav>
                      
                </div>
              </div>
              
            ) 

          }              

        </div>
        
        
        
      </header> 
    
     
  );
};

export default Header;
