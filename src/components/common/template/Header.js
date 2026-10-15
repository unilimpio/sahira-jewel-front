import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'



import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";

import LogoutIcon from "../template/icons/LogoutIcon"
import LoginIcon from "../template/icons/LoginIcon"
import UserIcon from "../template/icons/UserIcon"
import HamburguerIcon from "../template/icons/HamburguerIcon"
import CloseIcon from "../template/icons/CloseIcon"

import CartIcon from './icons/CartIcon'


import AuthService from "../../../services/auth.service";


import Logo from "../Logo";
import CartComponent from "../Cart";

import HomeIcon from "./icons/HomeIcon";

// 1. Importa tu Hook de Autenticación Global
import { useAuth } from "../../../context/AuthContext"; 

//const user = AuthService.getCurrentUser();
const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

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



const Header = ({cart, setCart, isCartOpen, setIsCartOpen}) => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user } = useAuth();

  // 4. Si el objeto 'user' existe en el contexto, significa que está logueado
  const isLoggedIn = !!user; 
  
	const location = useLocation();
  const [searchCourse, setSearchCourse] = useState('');

	//const [cart, setCart] = usePersistedState('sjCart', []);

  const deleteCourseFromCartFunction = (course) => {
    // Si cart no existe, usa un arreglo vacío para que .filter no falle
  const updatedCart = (cart || [])
              .filter(item => item.product.id !== course.id);
    setCart(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
   return (cart || [])
      .reduce((total, item) => 
            total + item.product.price * item.quantity, 0);
  };

	
  
  useEffect(() => {
    console.log('i am inside useeffect of cart component, this is supposed to reload the componene every time cart is modified, but is not working')
  }, []);
  


  const linkClassIcons = `p-2 md:mx-4 text-slate-800 hover:text-white sm:text-xs md:text-lg lg:text-lg hover:-translate-y-1 hover:transition`;
  const linkClass = `p-3 font-light text-zinc-600 no-underline hover:text-zinc-400 hover:underline text-sm sm:text-base md:text-lg lg:text-xl transition `;
  const link2Class = ` flex p-2 text-black font-light no-underline  
                        hover:no-underline hover:shadow-lg
                        text-sm sm:text-base md:text-lg lg:text-xl 
                        transition-all duration-300 ease-in-out `;

  const linkDrawerClass = ` p-3 text-zinc-600 no-underline hover:text-zinc-800 hover:underline text-lg font-light `;

  const minusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const plusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  

  

  

  const MobileTopNav=({location})=>{

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
      console.log("this is you current location",location.pathname)

      const handleScroll = () => {
        // Define el punto de corte (ej. 100 píxeles)
        if (window.scrollY > 30 ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      if(location.pathname === '/home' || location.pathname === '/'){
        window.addEventListener('scroll', handleScroll);
      } else {
        setIsVisible(true)
      }

      

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
                        <Link to="/">
                          <Logo className={" w-42"} iconClassName={'h-9'}/>
                        </Link>
                      </div>
                      
                       {
                        location.pathname !== '/checkout' ?
                        (
                            <CartComponent cart={cart} setCart={setCart} 
                                            open={isCartOpen} setOpen={setIsCartOpen}
                                            buttonClassName={""} 
                                            className={"p-3"} 
                                            iconClassName={"w-7 h-7 fill-zinc-600   "} />
                        ) : (
                            <div className="w-7"></div> 
                        )
                       }
                                
                      


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
                        HOME
                      </Link>
                      <Link to={"/collection"} className={`ml-6 `+ linkDrawerClass}>
                        COLLECTIONS
                      </Link>                       
                      <Link to={"/about"} className={`ml-6 `+ linkDrawerClass}>
                        THE LEGACY
                      </Link>
                      
                      <Link to={"/contact"} className={`ml-6 `+ linkDrawerClass}>
                        CONTACT
                      </Link>
                      {isLoggedIn ? (
                    
                          <>                                         
                            <Link to={"/account"} className={`ml-6 `+linkDrawerClass}>
                              
                              MY ACCOUNT
                            </Link>
                            {/*
                                <Link to={"/logout"} className={`flex flex-row `+linkDrawerClass}>
                              <CloseIcon iconClassName={"w-6 h-6 fill-red-400"} className={"p-1"} />
                              Logout
                            </Link>
                            
                            
                            */}
                            
                          </>
                         
                      ) : (
                      
                      
                          <Link to={"/login"} className={`ml-6 `+linkDrawerClass}>
                              SIGN IN

                          
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
        <div className=" static  z-40  w-full flex place-content-between  bg-white           
            h-fit">
        
          <Link to={"/"} className="hover:no-underline fixed sm:static -top-20 -z-5 content-center">
            <Logo className="ml-4 w-44" iconClassName="h-9" />
          </Link>
          <div className=" flex-col w-1/2 place-content-start justify-items-end ">
            <nav className="flex flex-row w-2/3 md:w-3/4 items-end fixed sm:static -top-20 -z-50 justify-end">
                    
                          
                
                
                {isLoggedIn ? (
              
                  <> 
                                    
                    <Link to={"/account"} className={` `+linkClass}>
                     
                      My Account
                    </Link>
                
                  </>  
                ) : (
                  <>
                
                    <Link to={"/login"} className={` `+linkClass}>
                    {/*<UserIcon iconClassName={"w-6 h-6 stroke-1"} className={""} />  */}
                      Sign In
                    
                    </Link>


                  
                  </>
                )}
                {
                  location.pathname !== '/checkout' &&
                  (
                    <CartComponent cart={cart} setCart={setCart} 
                                  open={isCartOpen} setOpen={setIsCartOpen}
                                  buttonClassName={""} 
                                    className={"p-3"} 
                                    iconClassName={"w-6 h-6 fill-zinc-600 group-hover:fill-zinc-400 "} 
                    />
                  )
                }
          
            </nav>
      <Dialog open={isCartOpen}   onClose={() => {
              // 🕵️‍♂️ Capturamos el elemento que tenía el foco justo en el momento del cierre
              const activeEl = document.activeElement;
              
              // ⛔ Si el usuario hizo clic en tus botones, cancelamos el cierre del modal
              if (
                activeEl && 
                (activeEl.tagName === 'BUTTON' || 
                activeEl.closest('button') || 
                activeEl.innerText?.includes('+') || 
                activeEl.innerText?.includes('-') || 
                activeEl.innerText?.toLowerCase().includes('remove'))
              ) {
                return; 
              }
              
              // ✅ Si no son los botones (es la "X" o un clic fuera), se cierra normalmente
              setIsCartOpen(false);
            }} 
          className="fixed top-0 right-0 z-50 "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
          
        />

        <div className="fixed inset-0 ">
          <div className="absolute inset-0 ">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-24  ">
              <DialogPanel
                transition
                className="pointer-events-auto w-full max-w-md  transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-hidden bg-white shadow-xl">
                  <div className="flex-1 overflow-hidden p-4 sm:p-6">
                    <div className="flex items-start justify-between bg-white ">
                      <DialogTitle className="my-3 text-lg font-serif font-script text-black flex flex-row">
                        <CartIcon className={`-mt-4 -ml-3 p-3 `} iconClassName={` w-7 h-7 fill-black `} />

                        Your Shopping cart</DialogTitle>
                      <div className="absolute top-0 right-0 m-2 ">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCartOpen(false)
                            
                          }}
                          className="relative  p-0 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    {cart?.length === 0 || totalAmountCalculationFunction() === 0 ? (
	                    <div className="flex text-sm font-thin text-zinc-600">
                        Your shopping bag is empty... fill it with gorgeous items from our collection.
                      </div>
	                  ) : (

                      <div className=" bg-white h-[50vh]  overflow-y-scroll">
                        <div className="mt-4">
                          <ul  className="-my-4 p-0 divide-y divide-gray-200">
                            {cart &&
                              cart.map((item) => (
                                item.quantity > 0 &&
                              <li key={item.product.id} className="p-3 ">
                                <div className="">
                                  <div className="flex justify-between">
                                    <div className="flex flex-col items-center">
                                      <Link to={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-black  hover:text-zinc-600 no-underline " >
                                        <img src={backUrl+pathToImg+item.product.imageSrc} 
                                          alt={item.product.imageAlt} className="h-16 max-w-16 rounded-md object-cover object-center"/>
                                      </Link>
                                        <div className="flex items-center mt-2 ">
                                          
                                          
                                          <span className="font-light text-xs">Qty:</span>
                                          <span className='text-zinc-900 border-b border-zinc-600  px-1 text-sm font-light mx-2'> {item.quantity} </span>
                                          
                                          
                                        </div>
                                    </div>
                                    <div className="text-zinc-600  justify-right">
                                      <Link to={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-black  hover:text-zinc-600 no-underline " >
                                        <h6 className="text-sm text-right mt-2 font-serif" onClick={() => {
                                                                                      setIsCartOpen(false)

                                                                                } }>{item.product.name}</h6>
                                      </Link>
                                      <p className="font-light text-sm text-right">
                                          <span className="text-[8px] font-extralight"></span> 
                                          ${item.product.price} 
                                          <span className="text-[8px] font-extralight ml-2"> USD / each </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <div className="flex flex-row-reverse justify-between">
                                      <button type="button"
                                          className="text-zync-600 text-[9px] h-3 hover:underline"
                                          onClick={(e) => {

                                           // e.stopPropagation();
                                            deleteCourseFromCartFunction(item.product);
                                          }
                                          }>
                                          ✕&nbsp;Remove
                                        </button>
                                      <div className="flex items-center">
                                        <button type="button" className={`flex m-1    ${minusButtonClassName}`}
                                              onClick={(e) => {
                                                //e.stopPropagation();
                                                setCart((prevCart) => {
                                                  const updatedCart = prevCart.map(
                                                  (prevItem) =>
                                                  prevItem.product.id === item.product.id
                                                      ? { ...prevItem, quantity:
                                                      Math.max(item.quantity - 1, 0) }
                                                      : prevItem
                                                  );
                                                  return updatedCart;
                                                })
                                              }}>                                          
                                                <span className="-mt-[2px] pl-[8px] text-center font-light">-</span>                                          
                                          </button>
                                          <button  type="button" className={`flex m-2 ${plusButtonClassName}`}
                                              onClick={(e) => {
                                                
                                               // e.stopPropagation();
                                              setCart((prevCart) => {
                                                const updatedCart = prevCart.map((prevItem) =>
                                                            prevItem.product.id === item.product.id
                                                                ? { ...prevItem, quantity: 
                                                                item.quantity + 1 }
                                                                : prevItem
                                                );
                                                return updatedCart;
                                              })
                                            }}>
                                              
                                                <span className="-mt-[2px] pl-[7px] text-center font-light">+</span>   
                                              
                                          </button>
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>  
                    )  }
                  </div>
                  {cart && cart.length > 0 && totalAmountCalculationFunction() > 0 &&
                  <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-600 font-serif">Subtotal</p>
                      <p className="text-zinc-600">USD {totalAmountCalculationFunction()}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-2 flex  justify-center">
                      <Link to="/checkout"
                        className="bg-white drop-shadow-md no-underline disabled:drop-shadow-none text-black rounded-md p-3 disabled:bg-zinc-200 disabled:text-zinc-400 transition-all delay-100 duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg ring-1 ring-black"
                        
                      >
                        <span className="font-serif">Check Out</span>
                      </Link>
                    </div>
                    <div className="mt-1 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setIsCartOpen(false)}
                          className="mt-1 font-medium  hover:underline text-zinc-600"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                  }
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
            

          </div>
          
        </div>
        <nav className="flex justify-center w-full fixed sm:static sm:z-30 -top-20 -z-50 bg-white">

              <div className="flex justify-between w-5/6">
                <Link to={"/"} className={` `+ link2Class}>
                  Home
                </Link>
                <Link to={"/collection"} className={` `+ link2Class}>
                  Collections
                </Link>
                {/*
                  <Link to={"/gift"} className={` `+ link2Class}>
                  Gift Ideas
                </Link>

                <Link to={"/wishlist"} className={` `+ link2Class}>
                  Wishlist
                </Link>
                */}
                
                <Link to={"/about"} className={` `+ link2Class}>
                  The Legacy
                </Link>
                
                <Link to={"/contact"} className={` `+ link2Class}>
                  Contact
                </Link>
                
              </div>             
                        
        </nav>
        {//folow the header for mobile, only visible when on mobile screen
        }
        
        <MobileTopNav location={location}/>
        
        
        
      </header> 
    
     
  );
};

export default Header;
