import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate, Navigate} from "react-router";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";

import CartIcon from "./common/template/icons/CartIcon";
import AlertBox from "./common/template/AlertBox";

const user = AuthService.getCurrentUser();
const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


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

export default function Wishlist () {
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-[80vh] p-4 mb-4 mx-auto `;

  

  const [message,setMessage] = useState(false);
  const [content, setContent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchCourse, setSearchCourse] = useState('');
  
    const [cart, setCart] = usePersistedState('sjCart', []);

  const [product, setProduct] = useState(false);

  const[wishId,setWishId] = useState(false);

  const[action,setAction] = useState(false);

  


  useEffect(()=>{

    if(user){

      setLoading(true)

        try{

        UserService.getWishlist(user).then(
          (response) => {
            console.log(response?.data.message)
            console.log(response?.data)
            
            if(response?.data.wishlist){
              setContent(response?.data)
            }
            setLoading(false)
            //setMessage('')
          },
          
        )

      } catch (error){
        
        console.log('error log inside wishlist useeffect: ',error)
        setLoading(false)

        if(error?.includes(401)){
              navigate("/login")
          }
      
        
        if(error?.status === 401){
          AuthService.removeCurrentUser();
          setMessage(error?.data.messages)
          navigate("/login")
        }

        if(error?.status === 403){
          setMessage(error?.data.messages)
          navigate(0);
        }
      }

    } else {
      //setMessage('You need to log-in in order to add items to your wishlist!');
      localStorage.setItem('sj_flashMessage',JSON.stringify({message:'You need to log-in to view your wishlist!',type:'info'}))
      navigate('/login');

    }

    

  },[navigate]);

 
const addCourseToCartFunction = (course) => {
      console.log('this cart after before ',cart)
      const alreadyCourses = cart
                  .find(item => item.product.id === course.id);
        if (alreadyCourses) {
          const latestCartUpdate = cart.map(item =>
            item.product.id === course.id ? { 
            ...item, quantity: item.quantity + 1 } 
            : item
          );
          setCart(latestCartUpdate);
        } else {
          setCart([...cart, {product: course, quantity: 1}]);
        }
        console.log('this cart after update ',cart )
	  }; 
  
  function handleClick(event) {

    
        event.preventDefault();
        
        
        console.log('the value f the button clicked is: ', event.target.parentElement.value)
        setLoading(true)
       
        try{  

          UserService.getProductFromWish(user,event.target.parentElement.value).then(
            (response)=>{
              console.log(response?.data.message)
              console.log(response?.data.product)
              console.log(response?.data.wishlist)
              setProduct(response?.data.product)
              
              addCourseToCartFunction(response?.data.product)
              setMessage('Product added to shopping cart!')
              setContent(response?.data.wishlist)
              
              //navigate(0)
            },
            (error)=>{
              console.log(error)
              
            }
          )

        }catch(error) {
          console.log(error)
          
        }        
        
        setLoading(false)
        
              //navigate(0)
           
        
  }

  function handleRemove(event) {

    
        event.preventDefault();
        
        console.log('the event value of the onCLick is: ',event.target.value)
        setLoading(true)

        try{

            UserService.removeWish(user,event.target.value).then(
              (response)=>{
                console.log('this is the response from the api call', response?.data)
                setMessage(response?.data.message)
                setContent(response?.data.wishlist)
                setLoading(false)
              },
              (error)=>{
                console.log('error log from the then(response, error expression: ',error)
              }
            )


          } catch(error) {
            console.log('error log from the try-catch expression : ', error)
          }
        
        
        
  }

  function handleSubmit(event) {

        event.preventDefault();
        
        console.log('is there anybody out there?!  ',event.target.value)        
        const submitter = event.nativeEvent.submitter;
                
        const buttonValue = submitter.value;
        console.log('the buttonValue from submitter is: ',buttonValue)

       
        

        
  }
      
 

  const WishlistTemplate = ({wishlist, setMessage}) => {
    
    return(

      <>
        { wishlist ? (

            <div className="flex items-center justify-center w-full h-1/2 text-zinc-500">
                  <p className="font-light text-sm">Your Wishlist is empty...
                    <Link to="/collection" className="text-current">Explore the collection?</Link>
                    

                  </p>
            </div>

          ) : (
        
          <div className="mb-16 max-h-96 overflow-y-auto">
            <form id={'wishlist-add2cart-form'} onSubmit={handleSubmit}>          
            <table id="wishlist-table" 
                    className="bg-white opacity-90 text-[8px] sm:text-sm shadow-md w-full  ">
                                  
                
                        
                        <tbody className="text-zinc-600 ">
            
            {wishlist.map((row,index)=>
              
               
              (



                <tr className="even:bg-gray-50 odd:bg-white" key={'tr-'+index+'-'+row.id+row.product_name} >
                          <td className="p-2"    >
                            { index+1  }
                          </td>
                          <td className="p-2 "    >
                            <img src={` ${backUrl+pathToImg+row.product_imageSrc }`} alt={`${row.product_imageAlt}`} className="drop-shadow-lg rounded-b-md" />                        
                          </td>
                          <td className="p-2 "    >
                            <span className="text-sahira-green font-serif text-sm">{ row.product_name  }</span><br />
                            <span className={'text-sm font-light text-zinc-600 '}>${ row.product_price  }</span>
                          </td>
                          <td className="p-2 text-[8px] font-light "    >
                            <p className=" "><span className=" italic">Added on</span>&nbsp;
                              { row.date_created }</p>
                          </td>
                          <td className="p-2 text-center"    >
                            <div className="flex-col pt-2">
                            <button name="addtocart" value={row.id}  onClick={handleClick}
                                      className={' bg-sahira-green  rounded-full drop-shadow-lg ring-2 ring-white w-8 h-8 flex items-center justify-center m-3'} 
                                        >
                              <span className="absolute w-full flex justify-center text-white font-semibold text-xs">+</span>
                              <CartIcon className={''} iconClassName={'w-5 h-5 fill-white -mt-1'} />

                            </button>
                            <button  name="remove" value={row.id}
                                        className="static text-red-300 text-[9px]  hover:underline"
                                        onClick={handleRemove}>
                                        Remove
                            </button>
                            </div>
                          </td>
                </tr>


            ))}

              </tbody>
            </table>
            
            </form>
          </div>
        
        
        

    )}
    </>

    )
  }




  return (
    

      <Template >

        <div className={`mt-12 `+wrapperClass}>
          
          {message &&(

            <AlertBox message={message} setMessage={setMessage}/>             
             
          )} 
          
          <h1 className="text-zinc-600 font-serif text-2xl md:text-3xl lg:text-4xl ">Wishlist</h1>
          <p className="font-light text-sm">Aqui encontrarás tus coup-de-coeur para una futura oportunidad...</p>

          {content && user &&(

            <WishlistTemplate wishlist={content.wishlist} setMessage={setMessage}/>
            
          

          )}
          {(!content  || loading) &&(

            <div className="flex mx-auto items-center justify-center w-fit rounded-lg bg-opacity-75 bg-black p-3">
                  <svg className="animate-spin h-10 w-10 fill-white" viewBox="0 0 24 24">
                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-white font-extralight ml-2">Loading...</span>
            </div>

          )}
          
      
        </div>
      
      
      </Template>
    
    
      
  );


  
   

};


