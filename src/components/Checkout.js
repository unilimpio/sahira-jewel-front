import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, Link  } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Template from "./common/template/Template";

import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

import GuestPhoneInput from './common/GuestPhoneInput';
import CheckoutCheckboxes from './common/CheckoutCheckboxes';

// Optional: Import standard flags CSS if you want to use the package's built-in flags
// import 'react-phone-number-input/style.css';

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
 
 
const Checkout = ({cart, setCart}) => {
  
  const wrapperClass = `max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide `;
  
  const minusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const plusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  

  const inputClassName = `border-1 border-zinc-300 rounded-md md:w-1/2 w-full  text-xs font-light px-3 py-[0.5] shadow-sm h-9`;

  const bottomRef = useRef(null);
    const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick

  const navigate = useNavigate();


  const [open, setOpen] = useState(false)  
  //const [cart, setCart] = usePersistedState('sjCart', []);

  const [totalAmount, setTotalAmount] = useState(false);

  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState('');
  const [shippingSelected, setShippingSelected] = useState('');
 
  const [shippingCost, setShippingCost] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [obs, setObs] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [customerId, setCustomerId] = useState('');
  
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');

  const [preferences, setPreferences] = useState({
    acceptTerms: false,
    subscribeNewsletter: false,
    createAccount: false,
  });

  const [newOrderId,setNewOrderId] = useState(false);

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
 
  
  
  console.log('the cart is at this momento:',cart)
  console.log('the cart.lenght is at this momento:',cart?.length)

  useEffect(() => {

    if(cart && cart.length > 0){


      setLoading(true);
      UserService.getCheckout()
      .then((response) => {
         console.log(response.data)
        setPayments(response?.data?.payment_methods || []);
        setShipping(response?.data?.shipping_methods || []);
        
        console.log("This payment methods are available!", response?.data?.payment_methods)
        console.log("This shipping methods are available!", response?.data?.shipping_methods)

      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });


    } else {
      console.log('Your cart seems to be empty, maybe you timed out? Please try again and sorry for the inconvenience...Redirecting you to the Home page now...',cart)

      navigate('/');
    }

   

      
    
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
    
  }, [cart, navigate ]);

  function SelectPayment({payments}){
      
      const handleChange = (event)=>{
        
        setPaymentSelected(event.target.value)
        
        

      }

      if(payments){
             
        return(
          <div className="flex flex-col w-full ">
            
              <select id="payments-select" name="payment-method" className={`w-full border border-zinc-300 rounded-lg text-xs font-light h-10 shadow-sm py-[0.5] px-3`} value={paymentSelected} onChange={handleChange}>                             
                  <option  value={''}>Please select...</option>
                {
                    
                  payments?.map(method => (
                    <option key={'option-'+method.id+'-'+method.name} value={ method.id  }>{ ` ${method.name} - [${method.code}] ` }</option>
                    
                    
              
                  ))
                }
              
              </select>
              {
                paymentSelected &&
                (              
                  <div className="ml-7 mt-1.5 text-xs text-indigo-600 font-light bg-indigo-50 p-2.5 rounded-md border border-indigo-100 animate-fadeIn">
                    ℹ️ You will receive a secure payment link via whatsapp or sms to the number assigned to this order.
                  </div>
                )
              }

            
            
          </div>
        );
      }

      return null
    
  }

  function SelectShipping({shipping}){
      
      const handleChange = (event)=>{
        

        const methodId = event.target.value
        setShippingSelected(methodId)

        const chosenMethod = shipping.find(method => method.id === methodId );

        if(chosenMethod){

              setShippingCost(parseFloat(chosenMethod.cost))

        } else {
              setShippingCost(0)
        }

      }

      if(shipping){
             
        return(
          <div className="flex flex-row w-full justify-between">

            <div className="w-1/2">
              <select id="payments-select" 
                      name="shipping-method" 
                      className={`w-full border border-zinc-500 rounded-lg text-xs font-light h-10 shadow-sm px-3 py-[0.5] `} 
                      value={shippingSelected} onChange={handleChange}
                      >    

                  <option  value={ '' }>Please select...</option>
              {
                  
                shipping?.map(method => (

                  <option key={'option-'+method.id+'-'+method.name} value={method.id} >{ `${method.name} - ${method.cost ? parseFloat(method.cost).toFixed(2) : '0.00' }` }</option>
                  
                  
            
                ))
              }
              
              </select>
            </div>

            <div className="">

              <p className="">
                {
                  shippingCost &&  //this last comparison is for fixing the Nan error
                  (
                    <span className="text-zinc-900 font-light text-sm">USD {parseFloat(shippingCost).toFixed(2)}</span>

                  )
                }
              </p>

            </div>
             
            
              
              

            
          </div>
        );
      }

      return null
    
  } 

  const handlePay = (event) => {

    event.preventDefault();

    setIsSubmitting(true);  
    //setLoading(true);


     // This outputs the standardized format ready for payment gateways (e.g., Stripe, PayPal)
    console.log("Submitting order with phone:", fullPhoneNumber); 
    const form = event.target;

    const formData = new FormData(form);

    

    //const onSubmitShipping = formData.get("shipping-method");
    //const onSubmitPayment = formData.get("payment-method");
     

      if (isSubmitting) {

            const customerInfo = {
              email : email,
              id : customerId,
              fullname : `${firstname} ${lastname}`,
              phone : fullPhoneNumber

            }

            // Build the payload payload object exactly how your backend expects it
            const orderPayload = {
              user_id: user.uId || null,
              
              cart_data: cart, // This sends your entire JSON object automatically
              
              shipping_method: shippingSelected,
              totalAmount: ((0.15*totalAmountCalculationFunction())+totalAmountCalculationFunction()+shippingCost).toFixed(2),
              
              customerInfo : customerInfo,
              payment_method: paymentSelected,
              obs: obs,
              acceptTerms: preferences.acceptTerms,
              isSubscribed: preferences.subscribeNewsletter,
              willCreateAccount: preferences.createAccount, // If true, your backend
              
            };  

            
            try{

              UserService.orderConfirm(orderPayload).then(

                (response)=>{

                    const newOrderId = response.data?.order_id;

                    navigate(`/thankyou/${newOrderId}`)

                },
                (error)=>{

                  console.log('there was an error processing the order!! .- ',error)

                }


              )




            }catch (error) {

              console.error('Error processing payment:', error);
              alert('Payment failed. Please try again.');

            } finally {
              localStorage.removeItem('sjCart');
              setIsSubmitting(false);
            }

    
      
      };
  }

  function handleObsChange(e){

          const value = e.target.value;
  
          console.log(value);
  
          return setObs(value);
  
  }
  

  return (
    <Template bottomIsVisible={bottomIsVisible} cart={cart} setCart={setCart}>
      <div className={` ${wrapperClass} `}>
        {/* Page Header */}
        <header className="border-b border-zinc-100 pt-8 pb-3">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            Checkout
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
            Please review your cart contents
          </p>
        </header>

          <div className=" h-auto flex-col  bg-white ">
                  <div className="mx-auto  p-2">
                    
                    {cart?.lenght === 0 || !cart  ? (
	                    <div className=" text-sm font-thin text-zinc-600">Oops...esto es extraño, aquí no hay nada para comprar...</div>
	                  ) : (
                      <form onSubmit={handlePay}>
                        <div className=" bg-white h-auto ">
                          <div className="">
                            <ul  className="my-2 grid grid-cols-1 gap-2 p-0 divide-y divide-zinc-200">

                              {cart?.map((item) => (
                                <li key={item.product.id} className=" p-3">
                                  <div className="">
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
                                      <div className="w-full text-zinc-600">
                                        <Link href={`${baseUrl}product?pId=${item.product.id}`}
                                          className="text-zinc-900  hover:text-zinc-600 no-underline " >
                                          <h6 className="w-full text-lg text-right m-2  font-serif" onClick={() => {
                                                                                        setOpen(false)

                                                                                  } }>{item.product.name}</h6>
                                        </Link>
                                        <p className="font-light text-zinc-600 text-base text-right"> ${item.product.price}</p>
                                      </div>
                                    </div>
                                    {/*BOTONES AUMENTAR REDUCIR Y REMOVER DE CADA ITEM DE LA CANASTA!!!!*/}
                                    <div className="w-full">
                                      <div className="flex flex-row-reverse justify-between">
                                        <button type="button"
                                          className="text-zync-600 text-[9px] h-3 hover:underline"
                                          onClick={() => 
                                          deleteCourseFromCartFunction(item.product)}>
                                          ✕&nbsp;Remove
                                        </button>
                                        <div className="flex items-center">
                                          <button type="button" className={`flex m-1    ${minusButtonClassName}`}
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
                                                <span className="-mt-[2px] pl-[8px] text-center font-light">-</span>                                          
                                          </button>
                                          <button  type="button" className={`flex m-2 ${plusButtonClassName}`}
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
                                              
                                                <span className="-mt-[2px] pl-[6px] text-center font-light">+</span>   
                                              
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
                      </form>  
                    )  }
                  </div>

                  <div className="border-t border-gray-200 px-4 py-4 sm:px-6">

                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-base ">SUBTOTAL</p>
                      <p className="text-zinc-900 font-semibold text-base">USD {totalAmountCalculationFunction().toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between  font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-sm ">VAT/IVA <span className="font-light text-zinc-900 ">(15%)</span></p>
                      <p className="text-zinc-900 font-light text-sm">USD {(0.15*totalAmountCalculationFunction()).toFixed(2)}</p>
                    </div>
                     <hr className="p-2 border-zinc-400 "/>
                    <p className="text-zinc-900 font-serif text-lg ">Delivery Methods</p>
                    
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <SelectShipping shipping={shipping}/>
                    </div>
                    
                    <hr className="p-2 border-zinc-400 "/>
                    
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-lg ">TOTAL</p>
                      <div className="flex-col">                      
                        <p className="text-zinc-900 font-bold text-lg text-right">USD {((0.15*totalAmountCalculationFunction())+totalAmountCalculationFunction()+shippingCost).toFixed(2)}<br/>
                        <span className="font-light text-[11px] text-right">Includes shipping, sales tax.</span>
                        </p>                        
                      </div>
                    </div>

                <hr className="p-2 border-zinc-400 "/>
                    
                    <p className="text-zinc-900 font-serif text-lg ">Invoice information</p>
  
                    <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="email" className=""> 
                        <span className="text-xs font-light font-serif text-zinc-600">Email: </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                      //setIsPasaChecked(false);
                                      //setIsNoPasaChecked(true);
                                      //handleCheck(e);
                                      setEmail(e.target.value);
                                      console.log('email valu is', email );
                  
                                    
                                    }} id="email" value={email} /></label>

                      
                    </div>

                    <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="firstname" className=""> 
                        <span className="text-xs font-light font-serif text-zinc-600">Firstname: </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                      //setIsPasaChecked(false);
                                      //setIsNoPasaChecked(true);
                                      //handleCheck(e);
                                      setFirstname(e.target.value);
                                      console.log('firstname value is :',e.target.value );
                  
                                    
                                    }} id="firstname" value={firstname} /></label>

                      
                    </div>
                    <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="lastname" className=""> 
                        <span className="text-xs font-light  font-serif text-znc-600">LastName: </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                      //setIsPasaChecked(false);
                                      //setIsNoPasaChecked(true);
                                      //handleCheck(e);
                                      setLastname(e.target.value);
                                      console.log('lastname value is :',e.target.value );
                  
                                    
                                    }} id="lastname" value={lastname} /></label>

                      
                    </div>
                     <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="customerId" className=""> 
                        <span className="text-xs font-light font-serif text-znc-600">Id (National Id / Passport / RUC): </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                      //setIsPasaChecked(false);
                                      //setIsNoPasaChecked(true);
                                      //handleCheck(e);
                                      setCustomerId(e.target.value);
                                      console.log('cutomer-id value is :',e.target.value );
                  
                                    
                                    }} id="customerId" value={customerId} /></label>
                                    <span className="text-[9px]">As per local Ecuador Laws, all sales are subject to invoice.</span>

                      
                    </div>
                    <div className="flex w-full p-3 m-1">
                        
                        <GuestPhoneInput onChange={(val) => setFullPhoneNumber(val)} />

                      
                    </div>
                    
                    <hr className="p-2"/>
                    <p className="text-zinc-900 font-serif text-lg ">Payment Methods</p>
                    
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <SelectPayment payments={payments}/>
                    </div>

                    

                    <div className="flex md:flex-row flex-col w-full   ">
                      <label htmlFor="obs" className=" ">
                        <span className="text-xs font-light font-serif  text-zinc-600">Additional Instructions for your order: </span></label>
                      <textarea 
                          className={`text-xs font-thin shadow-sm
                            border-zinc-800 
                            border rounded-md 
                            focus:shadow-sm 
                            focus:ring-slate-200 focus:ring-1 focus:outline-none
                            h-20
                            px-2 py-1
                            
                          `}
                          name="obs" 
                          id="obs"
                          
                          value={obs}
                          cols="32"
                          onChange={ handleObsChange }
                                
                      /> 
                    </div>

                    <div className="flex md:flex-row flex-col w-full  p-3 m-1 ">
                      {/* Checkbox Layout Component */}
                      <CheckoutCheckboxes onCheckboxChange={(checkboxStates) => setPreferences(checkboxStates)} />
                      
                    </div>

                    
                    
                    
                    <div className="mt-4 flex  justify-center">
                      {
                        cart.length === 0 || 
                        totalAmountCalculationFunction() === 0 || paymentSelected === null || shippingSelected === null || email === null || firstname === null || lastname === null || fullPhoneNumber === null || customerId === null? 
                         (
                            <button
                              className="bg-white pointer-events-none   rounded-lg p-3   ring-1 ring-zinc-300"
                              disabled >
                              <span className="font-serif text-lg text-zinc-300">Confirm Order and Pay</span>
                            </button>
                         ):(
                            
                            <button
                              className="bg-white drop-shadow-md disabled:drop-shadow-none disabled:pointer-events-none  rounded-lg p-3  transition-all delay-100 duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg ring-1 ring-zinc-600"
                              disabled={cart.length === 0 || 
                              totalAmountCalculationFunction() === 0 || paymentSelected === null || shippingSelected === null}
                              
                            >
                              <span className="font-serif text-lg text-black">Confirm Order and Pay</span>
                            </button>
                         )
                      }
                      
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
