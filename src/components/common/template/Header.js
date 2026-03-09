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
  const linkClass = `p-3 font-light text-zinc-600 no-underline hover:text-zinc-400 hover:underline text-sm sm:text-base md:text-lg lg:text-xl `;
  const link2Class = ` flex p-2 text-black font-light no-underline  
                        hover:no-underline hover:shadow-lg
                        text-sm sm:text-base md:text-lg lg:text-xl 
                        transition-all duration-300 ease-in-out `;

  const linkDrawerClass = ` p-3 text-zinc-600 no-underline hover:text-zinc-800 hover:underline text-lg  `;

  

  

  

  const MobileTopNav=()=>{

    const [isVisible,setIsVisible] = useState(false);
    const [hamIsOpen,setHamIsOpen] = useState(false);

    const HamburguerButton=({className,iconClassName,buttonClassName})=>{

      function handleClick(){

        setHamIsOpen(true);
        
      }

      return(
        
          <button  
            className={`p-2 ${buttonClassName}`} 
            onClick={handleClick}>
              <HamburguerIcon className={className} iconClassName={iconClassName}/>
          </button>
        
      );
    }

    const CloseButton=({className,iconClassName,buttonClassName})=>{

      function handleClick(){

        setHamIsOpen(false);
        
      }

      return(
        
          <button  
            className={`p-2 ${buttonClassName}`} 
            onClick={handleClick}>
              <CloseIcon className={className} iconClassName={iconClassName}/>
          </button>
        
      );
  }

    useEffect(() => {
      const handleScroll = () => {
        // Define el punto de corte (ej. 100 píxeles)
        if (window.scrollY > 30) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Limpieza del listener al desmontar el componente
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <div id="mobile-top-menu" 
          className={` ${isVisible ? 'opacity-100' : 'opacity-0'}
                      absolute w-full top-0 z-50 visible sm:hidden flex justify-center transition-opacity duration-300 ease-in-out  

                    
                    `}>
          <nav className={`flex flex-row w-full bg-white bg-opacity-100 `}>                      
                      
                      <CloseButton 
                        className={`transition-opacity duration-300 ease-in-out ${hamIsOpen ? ('opacity-100'):('opacity-0')}`}
                        iconClassName={`w-6 h-6 fill-zinc-600 ${hamIsOpen ? ('') : ('')} `} 
                        buttonClassName={` ${hamIsOpen ? ('visible') : ('hidden')}`}/>
                        
                      <HamburguerButton 
                        className={`transition-opacity duration-300 ease-in-out ${hamIsOpen ? ('opacity-0'):('opacity-100')}`}
                        iconClassName={`w-6 h-6 stroke-zinc-600 ${hamIsOpen ? ('') : ('')}`} 
                        buttonClassName={` ${hamIsOpen ? ('hidden') : ('visible')}`}/>
                        

                      
                      <div className="flex flex-grow justify-center py-3">
                        
                          <Logo className={"text-black text-2xl w-36 "} iconClassName={'fill-black'}/>
                        
                      </div>
                                    
                      <CartComponent buttonClassName={""} className={"p-3"} iconClassName={"w-6 h-6 fill-zinc-600   "}  
                        deleteCourseFromCartFunction={deleteCourseFromCartFunction} 
                        totalAmountCalculationFunction={totalAmountCalculationFunction}  
                        cart={cart} setCart={setCart}/>


          </nav>
          
            
              
              <div id="mobile-drawer-open" className={`fixed top-14 right-0 w-full  z-30  ${hamIsOpen ? ('opacity-100 '):(' opacity-0 hidden')}
                                                        transition-all duration-400  ease-in-out`}>
                {
                //here the drawer is open, the drwaer the block of content that appears when you click  on the top menu menu button i.e.
                //  hamburguer button 
                }
                <div className={`flex  py-6 bg-white bg-opacity-100 rounded-b-lg drop-shadow-lg `}>
                  
                  <nav className="flex flex-col mx-auto ">
                  
                      <Link to={"/"} className={`ml-6 `+ linkDrawerClass}>
                        Home
                      </Link>                        
                      <Link to={"/about"} className={`ml-6 `+ linkDrawerClass}>
                        About
                      </Link>
                       <Link to={"/collection"} className={`ml-6 `+ linkDrawerClass}>
                        Shop
                      </Link>
                      <Link to={"/contact"} className={`ml-6 `+ linkDrawerClass}>
                        Contact
                      </Link>
                      {isLoggedIn ? (
                    
                          <>                                         
                            <Link to={"/account"} className={`flex flex-row  -ml-6 `+linkDrawerClass}>
                              <UserIcon iconClassName={"w-6 h-6 "} className={"p-1"} />
                              Account
                            </Link>
                            <Link to={"/logout"} className={`flex flex-row `+linkDrawerClass}>
                              <CloseIcon iconClassName={"w-6 h-6 fill-red-400"} className={"p-1"} />
                              Logout
                            </Link>
                          </>
                         
                      ) : (
                      
                      
                          <Link to={"/login"} className={`flex flex-row`+linkDrawerClass}>
                               <UserIcon iconClassName={"w-6 h-6 "} className={""} /> Account

                          
                          </Link>
                        
                        
                      )}
                              
                  </nav>
                      
                </div>
              </div>
              
           
      </div>
    )
  
  }

  return (
    
      <header  className={`sticky top-0 z-40 flex-col`}>
        <div className=" relative z-40  w-full flex place-content-between  bg-white           
            h-fit">
        
          <Link to={"/"} className="hover:no-underline fixed sm:static -top-20 -z-5 ">
            <Logo className={"w-36 sm:w-42 md:w-48 "}/>
          </Link>
          <div className=" flex-col w-1/2 place-content-start justify-items-end ">
            <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 -z-50 justify-end">
                    
                          
                <Link to={"/about"} className={` `+ linkClass}>
                  About Us
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
                      <UserIcon iconClassName={"w-6 h-6 stroke-1"} className={""} /> 
                    
                    </Link>


                  
                  </>
                )}
                <CartComponent buttonClassName={""} className={"p-3"} iconClassName={"w-6 h-6 fill-zinc-600 hover:fill-zinc-400 "} 
                  deleteCourseFromCartFunction={deleteCourseFromCartFunction} 
                  totalAmountCalculationFunction={totalAmountCalculationFunction} 
                  cart={cart} 
                  setCart={setCart}/>
          
            </nav>
            
            

          </div>
          
        </div>
        <nav className="flex justify-center w-full fixed sm:static sm:z-30 -top-20 -z-50 bg-white">

              <div className="flex justify-between w-5/6">
                <Link to={"/"} className={` `+ link2Class}>
                  Home
                </Link>
                <Link to={"/collection"} className={` `+ link2Class}>
                  Collection
                </Link>
                <Link to={"/gift"} className={` `+ link2Class}>
                  Gift Ideas
                </Link>
                
                <Link to={"/wishlist"} className={` `+ link2Class}>
                  Wishlist
                </Link>
              </div>             
                        
        </nav>
        {//folow the header for mobile, only visible when on mobile screen
        }
        
        <MobileTopNav />
        
        
        
      </header> 
    
     
  );
};

export default Header;
