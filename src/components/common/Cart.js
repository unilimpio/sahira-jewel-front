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
  open, setOpen
	//deleteCourseFromCartFunction,
	//totalAmountCalculationFunction,
	
}) {

const navigate = useNavigate();
//const [open, setOpen] = useState(false)  
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
 
  const minusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const plusButtonClassName = `bg-white h-6 w-6 rounded-md border-1 border-zinc-400 p-0 m-0`;
  const minusPlusSpanClassName = ` text-base font-semibold`;  
  
  console.log('the cart is at this momento:',cart)
  console.log('the cart.lenght is at this momento:',cart?.length)
  
  const labelNumber = cart?.filter((item)=>item.quantity > 0).length || 0;

  
  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className={` ${buttonClassName}  `}
      >
        <div className="relative group">
          <CartIcon className={`  ${className} `} iconClassName={` ${iconClassName} `} >
            {cart?.length > 0 ? (
            
              <span className={`text-[11px] font-light text-black` } >{labelNumber}</span>
              
            ): ('')}
          </CartIcon>
          
        </div>
         
         
      </button>
      
    </>
  )
}