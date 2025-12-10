import { Routes, Route, Link } from "react-router";
import { useState , useEffect} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, Navigate} from "react-router";

import CartIcon from './template/icons/CartIcon'
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";



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


export default function Cart({
  className, iconClassName, buttonClassName,
  cart,
  setCart,
	deleteCourseFromCartFunction,
	totalAmountCalculationFunction,
	
}) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)  
 //const [cart, setCart] = usePersistedState('sjCart', 0);
  const minusButtonClassName = `bg-neutral-100 h-4 w-4 rounded-full border drop-shadow-md p-0 m-0`;
  const plusButtonClassName = `bg-neutral-100 h-6 w-6 rounded-full border drop-shadow-md p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  
  
  console.log('the cart is at this momento:',cart)
  console.log('the cart.lenght is at this momento:',cart?.length)
  
  

  
  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className={` ${buttonClassName}  `}
      >
        <div className="relative">
          <CartIcon className={`  ${className} `} iconClassName={` ${iconClassName} `} />
          {cart?.length !== 0 && (
            <div className="absolute w-4 h-4 bg-red-400  rounded-full top-3 right-2 z-50 bg-opacity-90 flex justify-center">
              <p className={`text-[10px] font-semibold text-white` } >{cart?.length}</p>
            </div>
          )}
        </div>
         
         
      </button>
      <Dialog open={open} onClose={setOpen} className="fixed top-0 right-0 z-50 ">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 ">
          <div className="absolute inset-0 ">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 ">
              <DialogPanel
                transition
                className="pointer-events-auto w-full max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="flex items-start justify-between bg-white ">
                      <DialogTitle className=" text-xl font-medium text-sahira-green flex flex-row">
                        <CartIcon className={`-mt-4  ${className} `} iconClassName={` w-6 h-6 fill-sahira-green `} />

                        Shopping cart</DialogTitle>
                      <div className="absolute top-0 right-0 m-2 ">
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false)
                            
                          }}
                          className="relative  p-0 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    {cart?.lenght === 0  ? (
	                    <div className="text-sm font-thin text-zinc-600">Tu bolsa de compras esta vacia, llenala de productos maravillosos...</div>
	                  ) : (

                      <div className=" bg-white h-[50vh]  overflow-y-scroll">
                        <div className="mt-4">
                          <ul  className="-my-4 p-0 divide-y divide-gray-200">
                            {cart?.map((item) => (
                              <li key={item.product.id} className="p-1 mt-2">
                                <div className="">
                                  <div className="flex">
                                    <div className="flex flex-col items-center">
                                        <img src={backUrl+pathToImg+item.product.imageSrc} 
                                          alt={item.product.imageAlt} className="max-h-16 max-w-16 rounded-md"/>
                                        <div className="flex items-center ">
                                          
                                          
                                          <span className="font-light text-xs">Qty:</span>
                                          <span className='text-zinc-600 bg-neutral-100 rounded-sm shadow-sm px-1 text-sm font-light mx-2'>{item.quantity} </span>
                                          
                                          
                                        </div>
                                    </div>
                                    <div className="text-zinc-600 m-2">
                                      <a href={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-sahira-green hover:text-zinc-600 hover:no-underline " >
                                        <h6 className="text-sm mt-2 font-light" onClick={() => {
                                                                                      setOpen(false)

                                                                                } }>{item.product.name}</h6>
                                      </a>
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
                        className="bg-sahira-green drop-shadow-md disabled:drop-shadow-none text-white rounded-md p-3 disabled:bg-zinc-200 transition-all hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg"
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
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}