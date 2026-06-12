import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link  } from "react-router";
import AuthService from "../services/auth.service";
import Template from "./common/template/Template";

 const user = AuthService.getCurrentUser();

 
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
 
 
const FinishOrder = () => {
  
  const wrapperClass = `w-full h-full p-4 mx-auto  mb-54 `;

 

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)  
  const [cart, setCart] = usePersistedState('sjCart', 0);

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
 
  const minusButtonClassName = `bg-neutral-100 h-4 w-4 rounded-full border drop-shadow-md p-0 m-0`;
  const plusButtonClassName = `bg-neutral-100 h-6 w-6 rounded-full border drop-shadow-md p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  
  
  console.log('the cart is at this momento:',cart)
  console.log('the cart.lenght is at this momento:',cart?.length)

  return (
    <Template>
      <div className={`mt-12`+wrapperClass}>
        
          <div className="flex h-full flex-col  bg-white shadow-xl">
                  <div className="flex p-4 sm:p-6">
                    
                    {cart?.lenght === 0  ? (
	                    <div className="text-sm font-thin text-zinc-600">Tu bolsa de compras esta vacia, llenala de productos maravillosos...</div>
	                  ) : (

                      <div className=" bg-white h-[50vh] ">
                        <div className="mt-4">
                          <ul  className="-my-4 p-0 divide-y divide-gray-200">
                            {cart?.map((item) => (
                              <li key={item.product.id} className="p-1 mt-2">
                                <div className="">
                                  <div className="flex">
                                    <div className="flex flex-col items-center">
                                      <Link href={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-black  hover:text-zinc-600 no-underline " >
                                        <img src={backUrl+pathToImg+item.product.imageSrc} 
                                          alt={item.product.imageAlt} className="max-h-16 max-w-16 rounded-md"/>
                                      </Link>
                                        <div className="flex items-center mt-2 ">
                                          
                                          
                                          <span className="font-light text-xs">Qty:</span>
                                          <span className='text-zinc-600 bg-neutral-100 rounded-sm shadow-sm px-1 text-sm font-light mx-2'>{item.quantity} </span>
                                          
                                          
                                        </div>
                                    </div>
                                    <div className="text-zinc-600 m-2">
                                      <Link href={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-black  hover:text-zinc-600 no-underline " >
                                        <h6 className="text-sm mt-2 font-semibold" onClick={() => {
                                                                                      setOpen(false)

                                                                                } }>{item.product.name}</h6>
                                      </Link>
                                      <p className="font-light text-sm "> ${item.product.price}</p>
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <div className="flex flex-row-reverse justify-between">
                                      <button
                                        className="text-red-300 text-[9px] h-3 hover:underline"
                                        onClick={() => 
                                        deleteCourseFromCartFunction(item.product)}>
                                        Remove
                                      </button>
                                      <div className="flex items-center">
                                        <button className={`flex m-1    ${minusButtonClassName}`}
                                            onClick={(e) => {
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
                                              <span className="-mt-1.5 px-1 text-center font-light">-</span>                                          
                                        </button>
                                        <button  className={`flex m-1 ${plusButtonClassName}`}
                                            onClick={(e) => {
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
                                            
                                              <span className="-mt-0.5 px-1.5 text-center font-light">+</span>   
                                            
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

                  <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-600">Subtotal</p>
                      <p className="text-zinc-600">USD {totalAmountCalculationFunction()}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-2 flex  justify-center">
                      <button
                        className="bg-white drop-shadow-md disabled:drop-shadow-none text-black rounded-md p-3 disabled:bg-zinc-200 disabled:text-zinc-400 transition-all delay-100 duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg ring-1 ring-black"
                        disabled={cart.length === 0 || 
                        totalAmountCalculationFunction() === 0}
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-1 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="mt-1 font-medium  hover:underline text-zinc-600"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
      </div>
    </Template>
  );
};

export default FinishOrder;
