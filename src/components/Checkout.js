import React from "react";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, Link, useAsyncError  } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Template from "./common/template/Template";

// 1. Importa tu Hook de Autenticación Global
import { useAuth } from "../context/AuthContext"; 

import FlashMessage from "./common/FlashMessage";

import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

import GuestPhoneInput from './common/GuestPhoneInput';
import CheckoutCheckboxes from './common/CheckoutCheckboxes';

// Optional: Import standard flags CSS if you want to use the package's built-in flags
 import 'react-phone-number-input/style.css';

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
 
 
const Checkout = ({cart, setCart}) => {

   // 3. Extraemos el usuario actual directamente desde el Contexto de React
    const { user } = useAuth(); 
  
  const wrapperClass = ` max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide `;
  
  const minusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const plusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  

  const inputClassName = `border-1 border-zinc-300 rounded-md md:w-1/2 w-full  text-xs font-light px-3 py-[0.5] shadow-sm h-9`;

  const bottomRef = useRef(null);
    const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick

  const navigate = useNavigate();

  const [flashMessage, setFlashMessage] = useState(localStorage.getItem('sj_flashMessage'))

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
    acceptDataTerms: false,
    subscribeNewsletter: false,
    createAccount: false,
  });

  const [newOrderId,setNewOrderId] = useState(false);

  const[payUrl, setPayUrl] = useState(null)

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
        console.log('payment option changed to ',event.target.value)
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
             

            
            
          </div>
        );
      }

      return null
    
  }

  function SelectShipping({shipping, className='w-1/2'}){
      
      const handleChange = (event)=>{
        
        console.log('shippoing option changed to ',event.target.value)
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
          

            <div className={` ${className} `}>
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

            
             
            
              
              

            
          
        );
      }

      return null
    
  } 

  const handleCheckout = async (event) => {

    event.preventDefault();

    setLoading(true);

    //const payWindow = window.open('/payment-processing', '_blank', "noopener,noreferrer");


    console.log("Processing payment");
    setIsSubmitting(true);  

    const clientTxId = `transaccion-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${new Date().toTimeString().split(' ')[0].replace(/:/g,"")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const totalCalculated = ( totalAmountCalculationFunction() + shippingCost).toFixed(2);

    const orderPayload = {
      user_id: user ? user.uId : null,
      cart_data: cart,
      shipping_method: shippingSelected,
      totalAmount: totalCalculated,
      tx_id: clientTxId,
      customerInfo: { email, id: customerId, fullname: `${firstname} ${lastname}`, phone: fullPhoneNumber },
      payment_method: paymentSelected,
      obs: obs,
      acceptTerms: preferences.acceptTerms,
      acceptDataTerms: preferences.acceptDataTerms,
      isSubscribed: preferences.subscribeNewsletter,
      willCreateAccount: preferences.createAccount,
    }; 

    const paymentPayload = {
      "amount": Math.round(totalCalculated * 100), // Evita errores de decimales en JS
      "amountWithoutTax": Math.round(totalCalculated * 100),   
      "amountWithTax": 0,  
      "tax": 0, 
      "service": 0, 
      "tip": 0, 
      "currency": "USD", 
      "reference": "Pago por API Link",    
      "clientTransactionId": clientTxId,
      "additionalData": "Descripción Extra", 
      "oneTime": true,  
      "expireIn": 0,    
      "isAmountEditable": false,
      "email": email,       
      "phoneNumber": fullPhoneNumber,    
      "documentId": customerId,     
    };

    try {
      // 1. PRIMERO: Guardar y confirmar la orden en tu Base de Datos
      console.log('Enviando confirmación de orden...');
      const orderResponse = await UserService.orderConfirm(orderPayload);
      console.log('Orden confirmada en Backend:', orderResponse);
      
      // Obtener el ID de la orden directamente de la respuesta devuelta por la promesa
      const currentOrderId = orderResponse.data?.order_id;
      setNewOrderId(currentOrderId); 

      // 2. SEGUNDO: Solicitar el link de pagos a PayPhone (A través de tu backend CodeIgniter)
      console.log('Iniciando secuencia de PayPhone...');
      const payphoneResponse = await UserService.payLinkRequest(paymentPayload);
      console.log('Respuesta recibida de PayPhone API', payphoneResponse);

      // Nota: Si tu backend devuelve un objeto JSON, asegúrate de extraer la URL correctamente.
      // Ej: payphoneResponse.data.redirectUrl
      setPayUrl(payphoneResponse.data)
      setFlashMessage(JSON.stringify({'message':'Pay Link generated succesfully!','type':'success'}))

      // 3. TERCERO: Abrir la pasarela de pagos
      //window.open(urlDePago, "_blank", "noopener,noreferrer");
      //payWindow.location.href = payUrl;

      

      // 4. CUARTO: Ahora que todo fue exitoso, limpiamos carrito y redirigimos
      //localStorage.removeItem('sjCart');
      // Usamos 'currentOrderId' directamente porque 'newOrderId' (useState) es asíncrono y no se habrá actualizado aún en esta línea
      //navigate(`/thankyou/${currentOrderId || ''}`);
      //window.location.replace(`/thankyou/${currentOrderId || ''}`);

    } catch (error) {
      console.error('Error procesando el flujo de pago:', error);
      //alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
      //payWindow.close();
    } finally {
      setIsSubmitting(false);
      setLoading(false)
    }
  };


  function handleObsChange(e){

          const value = e.target.value;
  
          console.log(value);
  
          return setObs(value);
  
  }

   // Usamos un ref para controlar de forma segura el ciclo de vida del contenedor
  const contenedorRef = useRef(null);
  
  console.log('current payUrl value',payUrl)
  

  // 3. Este segundo useEffect se dispara SOLO cuando el JS externo se cargó
  // Y cuando React ya pintó físicamente el DIV en el DOM (contenedorRef.current ya no es null)
 // ESCENCIAL: Añadimos 'paymentSelected' a las dependencias de este useEffect

  

  return (
    <Template bottomIsVisible={bottomIsVisible} cart={cart} setCart={setCart} >
      {flashMessage && (
                          
            <FlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage}  />
                         
        )}
        
      <div className={`relative ${wrapperClass} `}>
        {loading &&(
          <div className={`absolute inset-0`}>

            <div className="flex mx-auto items-center justify-center w-fit rounded-lg bg-opacity-75 bg-black p-3">
                  <svg className="animate-spin h-10 w-10 fill-white" viewBox="0 0 24 24">
                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-white font-extralight ml-2">Loading...</span>
            </div>
          </div>

        )}
        {/* Page Header */}
        <header className="border-b border-zinc-100 pt-8 pb-3">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            Checkout
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
            Please review your order items
          </p>
        </header>

          <div className=" h-auto flex-col  bg-white ">
            {
              cart.filter((item)=>item.quantity > 0).length > 0 && 
                        totalAmountCalculationFunction() > 0  ? 
                (
                <form onSubmit={ handleCheckout }>
                  
                  <div className="mx-auto  p-2">    
                    
                      
                        <div className=" bg-white h-auto ">
                          <div className="">
                            <ul  className="my-2 grid grid-cols-1 gap-2 p-0 divide-y divide-zinc-200">

                              {
                              cart?.map((item) => (
                                item.quantity > 0 &&
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
                                                <span className="-mt-[2px] pl-[6px] text-center font-light">-</span>                                          
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
                                              
                                                <span className="-mt-[2px] pl-[5px] text-center font-light">+</span>   
                                              
                                          </button>
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                              }
                            </ul>
                          </div>
                        </div>
                      
                   
                  </div>

                  <div className="border-t border-gray-200 px-4 py-4 sm:px-6">

                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-base ">SUBTOTAL</p>
                      <p className="text-zinc-900 font-semibold text-base">USD {totalAmountCalculationFunction().toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between  font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-sm ">VAT/IVA <span className="font-light text-zinc-900 ">(0%)</span></p>
                      <p className="text-zinc-900 font-light text-sm">USD {0.00}</p>
                    </div>
                     <hr className="p-2 border-zinc-400 "/>
                    <p className="text-zinc-900 font-serif text-lg ">Delivery Methods</p>
                    
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <div className="flex flex-row w-full justify-between">
                          <SelectShipping shipping={shipping}/>
                          <div className="flex">
                            {
                                //shippingCost &&  //this last comparison is for fixing the Nan error
                                (
                                  <p className="">
                                    
                                        <span className="text-zinc-900 font-light text-sm">USD {shippingCost ? parseFloat(shippingCost).toFixed(2) : '0.00'}</span>

                                      
                                  </p>
                                )
                            }
                          </div>
                      </div>
                     
                    </div>
                    
                    <hr className="p-2 border-zinc-400 "/>
                    
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-zinc-900 font-serif text-lg ">TOTAL</p>
                      <div className="flex-col">                      
                        <p className="text-zinc-900 font-bold text-lg text-right">USD {(totalAmountCalculationFunction()+shippingCost).toFixed(2)}<br/>
                        <span className="font-light text-[11px] text-right">Includes shipping, sales tax.</span>
                        </p>                        
                      </div>
                    </div>

                <hr className="p-2 border-zinc-400 "/>
                    
                    <p className="text-zinc-900 font-serif text-lg ">Contact for this sale</p>
  
                    <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="email" className=""> 
                        <span className="text-xs font-light font-serif text-zinc-600">Email: </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                     
                                      setEmail(e.target.value);
                                      console.log('email valu is', email );
                  
                                    
                                    }} id="email" value={email} /></label>

                      
                    </div>

                    <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="firstname" className=""> 
                        <span className="text-xs font-light font-serif text-zinc-600">Firstname: </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                      ;
                                      setFirstname(e.target.value);
                                      console.log('firstname value is :',e.target.value );
                  
                                    
                                    }} id="firstname" value={firstname} /></label>

                      
                    </div>
                    <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="lastname" className=""> 
                        <span className="text-xs font-light  font-serif text-znc-600">LastName: </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                     
                                      setLastname(e.target.value);
                                      console.log('lastname value is :',e.target.value );
                  
                                    
                                    }} id="lastname" value={lastname} /></label>

                      
                    </div>
                     <div className="flex md:flex-row flex-col w-full p-3 m-1">
                      <label htmlFor="customerId" className=""> 
                        <span className="text-xs font-light font-serif text-znc-600">Id (National Id / Passport / RUC): </span>       
                      <input className={inputClassName} onChange={(e)=>{
                                     
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
                    
                    <div className="flex flex-col text-base font-medium text-gray-900">
                      <SelectPayment payments={payments}/>
                        {
                          paymentSelected === '1' && //method selected is link by phone
                          (              
                            <div className="ml-7 mt-1.5 text-xs text-indigo-600 font-light bg-indigo-50 p-2.5 rounded-md border border-indigo-100 animate-fadeIn">
                              ℹ️ You will be redirected to a secure payment gateway.
                            </div>
                            
                          )
                        }
                        {
                          paymentSelected === '2' && //the mehtod selected is credit card
                          (              
                            <>
                                
                                
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                  <h2>Pasarela de Pago PayPhone</h2>
                                  
                                  {/* Asignamos la referencia física y mantenemos el ID requerido por PayPhone */}
                                  <div 
                                    ref={contenedorRef} 
                                    id="pp-button" 
                                    style={{ margin: '20px auto', maxWidth: '414px', minHeight: '300px' }}
                                  ></div>
                                </div>

                            
                            </>
                          )
                        }

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

                    
                    
                    
                    <div className="w-full mx-auto mt-4 flex flex-col p-3 items-center">
                      
                          {
                            !email 
                            || !firstname 
                            || !lastname 
                            || !fullPhoneNumber 
                            || !customerId
                            || !paymentSelected
                            || !shippingSelected 
                            || !preferences.acceptTerms ?

                            (
                              <button
                                type="button" disabled 
                                className="w-full sm:w-60 my-3 ring-1 ring-neutral-100 text-zinc-300 font-serif rounded-lg px-3 py-2">

                                Confirm Order and Pay
                              </button>
                            ):(
                                <button
                                  type="submit"
                                  className={` 
                                    w-full sm:w-60 my-3
                                    bg-white drop-shadow-md disabled:drop-shadow-none disabled:pointer-events-none  rounded-lg px-3 py-2  transition-all delay-100 duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg ring-1 ring-zinc-600`}
                                  disabled={ isSubmitting }
                                  
                                >
                                  <span className="font-serif text-lg text-black">
                                    {!isSubmitting ? (
                                        <span className="text-zinc-900 font-light ">Confirm Order and Pay</span>
                                      ) : (
                                        
                                          <span className="inline-flex text-zinc-900 font-light ">
                                            <svg className="animate-spin h-5 w-5 fill-zinc-600 mx-2" viewBox="0 0 24 24">
                                              <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                                              <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                                            </svg> Please wait...
                                          </span>
                                        
                                        
                                      )
                                  
                                    }   
                                  </span>
                                </button>
                            )
                          }
                          {
                            payUrl && //the order was sucesfully saved on the db and the pay link was obtained, 

                              <button
                                type="button" disabled={!payUrl}
                                onClick={(e)=>{
                                          
                                                  const payWindow = window.open(payUrl, 'PayPhone', 'width=600,height=700');

                                                  // Validamos que los bloqueadores de pop-ups no hayan impedido la apertura
                                                  if (!payWindow) {
                                                    alert("Por favor, permite las ventanas emergentes para proceder con el pago.");
                                                    return;
                                                  }

                                                  // 2. Iniciamos el temporizador que vigila la ventana que acabamos de abrir
                                                  const timer = setInterval(() => {
                                                    if (payWindow.closed) {
                                                      clearInterval(timer);
                                                      console.log("El usuario cerró la ventana de PayPhone. Validando estado...");
                                                      setLoading(false);
                                                      
                                                      // Limpiamos el carrito local
                                                      localStorage.removeItem('sjCart');
                                                      
                                                      // Redirigimos a la página de verificación en CodeIgniter
                                                      window.location.replace(`/thankyou/${newOrderId || ''}`);
                                                    }
                                                  }, 1000);
                                }}

                                className="w-full sm:w-60 my-3 ring-1 ring-zinc-300 text-neutral-100 bg-gradient-to-b hover:shadow-sm from-green-400 to-green-600 font-serif rounded-lg px-3 py-2 ">

                                Open Pay Link 🗗
                              </button>

                          }  
                            
                         
                      
                    </div>
                    
                  </div>
                </form>
                ) : (
                  <p className="text-sm font-light text-zinc-900">Your cart is empty.</p>
                )
            }  
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
