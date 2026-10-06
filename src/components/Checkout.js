import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, Link  } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
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
 
 
const Checkout = () => {
  
  const wrapperClass = `max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide `;

  const bottomRef = useRef(null);
    const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)  
  const [cart, setCart] = usePersistedState('sjCart', 0);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState(false);
  const [shippingSelected, setShippingSelected] = useState(false);
  const [shippingCost, setShippingCost] = useState(false);

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
 
  const minusButtonClassName = `bg-white h-5 w-5 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const plusButtonClassName = `bg-white h-5 w-5 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  
  
  console.log('the cart is at this momento:',cart)
  console.log('the cart.lenght is at this momento:',cart?.length)

  useEffect(() => {

   setLoading(true);
    UserService.getCheckout()
      .then((response) => {
         console.log(response.data)
        setPayments(response?.data?.payment_methods || []);
        setShipping(response?.data?.shipping_methods || []);
        
        console.log("This payment methods are available!", payments)
        console.log("This shipping methods are available!", shipping)

      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the bottom sentinel is visible, hide the component. 
        // Otherwise, keep it visible.
        setBottomIsVisible(!entry.isIntersecting);
        console.log('the bottom of the page has been reached!!!!!!!!')
      },
      { 
        threshold: 0.1, // Triggers as soon as the bottom 10% of the sentinel enters
        rootMargin: "0px 0px 50px 0px" // Optional: Triggers 50px before reaching the exact bottom
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
          
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
    
  }, []);

  function SelectPayment({payments}){
      
      const handleChange = (event)=>{
        
        setPaymentSelected(event.target.value)
        setShippingCost(event.target.value)

      }

      if(payments){
             
        return(
          <div className="flex">
             
            <select id="payments-select" className={` border border-zinc-500 rounded-lg text-sm font-light h-10`} value={paymentSelected} onChange={handleChange}>                             
                  <option  value={ false  }>Please select...</option>
              {
                  
                payments?.map(method => (
                  <option key={'option-'+method.id+'-'+method.name} value={ method.code  }>{ ` ${method.name} ` }</option>
                  
                  
            
                ))
              }
              
              </select>
            
            
          </div>
        );
      }

      return null
    
  }

  function SelectShipping({shipping}){
      
      const handleChange = (event)=>{
        
        setShippingSelected(event.target.value)

      }

      if(shipping){
             
        return(
          <div className="flex w-1/2">
             
            <select id="payments-select" className={` border border-zinc-500 rounded-lg text-sm font-light w-full h-10`} value={shippingSelected} onChange={handleChange}>                             
                  <option  value={ false  }>Please select...</option>
              {
                  
                shipping?.map(method => (
                  <option key={'option-'+method.id+'-'+method.name} value={method.id}>{ `${method.name} - ${method.cost ? parseFloat(method.cost).toFixed(2) : '0.00' }` }</option>
                  
                  
            
                ))
              }
              
              </select>
            
            
          </div>
        );
      }

      return null
    
  }  

  return (
    <Template bottomIsVisible={bottomIsVisible}>
      <div className={` ${wrapperClass} `}>
        {/* Page Header */}
        <header className="border-b border-zinc-100 pt-8 pb-4 ">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            Checkout
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
            Please review your cart contents
          </p>
        </header>

          <div className="flex h-auto flex-col  bg-white ">
                  <div className="flex p-2">
                    
                    {cart?.lenght === 0  ? (
	                    <div className="w-full text-sm font-thin text-zinc-600">Oops...esto es extraño, aquí no hay nada para comprar...</div>
	                  ) : (

                      <div className="w-full bg-white h-auto ">
                        <div className="">
                          <ul  className="w-full my-4 p-0 divide-y divide-zinc-200">

                            {cart?.map((item) => (
                              <li key={item.product.id} className="w-full p-3">
                                <div className="w-full">
                                  <div className="flex justify-between">
                                    <div className="flex flex-col items-center">
                                      <Link href={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-black  hover:text-zinc-600 no-underline " >
                                        <img src={backUrl+pathToImg+item.product.imageSrc} 
                                          alt={item.product.imageAlt} className="max-h-16 max-w-16 rounded-md"/>
                                      </Link>
                                        <div className="flex items-center mt-2 ">
                                          
                                          
                                          <span className="font-light text-xs">Qty:</span>
                                          <span className='text-zinc-900 border-b border-zinc-600  px-1 text-base font-light mx-2'>
                                            {item.quantity} 
                                          </span>
                                          
                                          
                                        </div>
                                    </div>
                                    <div className="text-zinc-600">
                                      <Link href={`${baseUrl}product?pId=${item.product.id}`}
                                        className="text-zinc-900  hover:text-zinc-600 no-underline " >
                                        <h6 className="text-lg text-right mt-2  font-serif" onClick={() => {
                                                                                      setOpen(false)

                                                                                } }>{item.product.name}</h6>
                                      </Link>
                                      <p className="font-light text-zinc-600 text-base text-right"> ${item.product.price}</p>
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <div className="flex flex-row-reverse justify-between">
                                      <button
                                        className="text-zync-600 text-[9px] h-3 hover:underline"
                                        onClick={() => 
                                        deleteCourseFromCartFunction(item.product)}>
                                        ✕&nbsp;Remove
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
                                              <span className="-mt-[4px] px-[6px] text-center font-light">-</span>                                          
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
                                            
                                              <span className="-mt-[4px] px-[4px] text-center font-light">+</span>   
                                            
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
                      <p className="text-zinc-900 font-serif text-base ">SUBTOTAL</p>
                      <p className="text-zinc-600 font-semibold text-base">USD {totalAmountCalculationFunction().toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between  font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-sm ">VAT/IVA <span className="font-light text-zinc-600 ">(15%)</span></p>
                      <p className="text-zinc-600 font-light text-sm">USD {(0.15*totalAmountCalculationFunction()).toFixed(2)}</p>
                    </div>
                    <p className="text-zinc-900 font-serif text-lg ">Delivery Methods</p>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <SelectShipping shipping={shipping}/>
                      <p className="text-zinc-600 font-light text-sm">USD {parseFloat(shippingSelected).toFixed(2)}</p>
                    </div>
                    <hr/>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-lg ">TOTAL A PAGAR</p>
                    <div className="flex-col">                      
                        <p className="text-zinc-600 font-semibold text-lg text-right">USD {((0.15*totalAmountCalculationFunction())+totalAmountCalculationFunction()).toFixed(2)}<br/>
                        <span className="font-light text-[11px] text-right">Incluye impuestos y envío.</span>
                        </p>
                        
                    </div>
                    </div>
                    <p className="text-zinc-900 font-serif text-lg ">Payment Methods</p>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <SelectPayment payments={payments}/>
                    </div>
                    
                    
                    <div className="mt-4 flex  justify-center">
                      <button
                        className="bg-white drop-shadow-md disabled:drop-shadow-none text-black rounded-lg p-3 disabled:bg-zinc-200 disabled:text-zinc-400 transition-all delay-100 duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg ring-1 ring-zinc-600"
                        disabled={cart.length === 0 || 
                        totalAmountCalculationFunction() === 0}
                      >
                        <span className="font-serif text-lg">Confirm Order and Pay</span>
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                      
                    </div>
                  </div>
                </div>
      </div>
       <div 
          ref={bottomRef} 
          style={{ height: "1px", width: "100%", position: "absolute", bottom: 0 }} 
        />  
    </Template>
  );

};

export default Checkout;
