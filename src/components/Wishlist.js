import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useNavigate, Navigate} from "react-router";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import Template from "./common/template/Template";

import CartIcon from "./common/template/icons/CartIcon";

import FlashMessage from "./common/FlashMessage";

import { useAuth } from "../context/AuthContext";

//const user = AuthService.getCurrentUser();

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

export default function Wishlist ({cart,setCart}) {

  const { user } = useAuth();
  
  const navigate = useNavigate();

  const wrapperClass = `w-full h-[80vh] p-4 mb-4 mx-auto `;

    const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick
  
   const bottomRef = useRef(null);

  const [message,setMessage] = useState(false);

  const [flashMessage, setFlashMessage] = useState(localStorage.getItem('sj_flashMessage'))
  const [content, setContent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchCourse, setSearchCourse] = useState('');
  

  const [product, setProduct] = useState(false);

  

  


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
      
        
        if(error?.statusCode === '401 Unauthorized'){
          AuthService.removeCurrentUser();
          setMessage(error?.data.messages)
          navigate("/login")
        }

        if(error?.status === 403){
          setMessage(error?.data.messages)
          navigate(0);
        }
      }

    }  else {
       
      localStorage.setItem('sj_flashMessage',JSON.stringify({message:'Please login to view your Wishlist.',type:'info'}))
      navigate('/login')
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
  

    

  },[]);

 
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
          
        }finally{
          setLoading(false)
          navigate(0)
        }        
        
        
        
              
           
        
  }

  function handleRemove(event) {

    
        event.preventDefault();
        
        console.log('the event value of the onCLick is: ',event.target.value)
        setLoading(true)

        try{

            UserService.removeWish(user,event.target.value).then(
              (response)=>{
                console.log('this is the response from the api call', response?.data)
                setFlashMessage(JSON.stringify({message:response?.data?.message,type:'info'}))
                setContent(response?.data?.wishlist)
                //navigate(0)
                
              },
              (error)=>{
                console.log('error log from the then(response, error expression: ',error)
              }
            )


          } catch(error) {
            console.log('error log from the try-catch expression : ', error)
          } finally {
            setLoading(false)
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
    
    console.log('asi llega wishlist al compoenente hijo',wishlist)
    if(wishlist){
      return(

      <>
        
          <div className="mb-16 max-h-96 overflow-y-auto">
            <form id={'wishlist-add2cart-form'} onSubmit={handleSubmit}>          
            <table id="wishlist-table" 
                    className="bg-white  text-[8px] sm:text-sm w-full  ">
                                  
                
                        
                        <tbody className="text-zinc-600 ">
            { wishlist.length === 0  && (

              <tr className="flex items-center justify-center w-full h-1/2 text-zinc-500">
                    <td className="font-light text-sm">Your Wishlist is empty...
                      <Link to="/collection" className="text-current">Explore the collection?</Link>
                      

                    </td>
              </tr>

              )}
            {wishlist.map((row,index)=>
              
               
              (



                <tr className="even:bg-gray-50 odd:bg-white" key={'tr-'+index+'-'+row.id+row.product_name} >
                          
                          <td className="p-2 "    >
                            <div className="w-28 overflow-clip">
                              <Link to={'/product?pId='+row.product_id} className="flex no-underline hover:underline justify-center">
                              <picture className="w-full object-cover transition-all duration-700 delay-200 hover:scale-125 ease-in-out rounded-lg overflow-hidden">
                  
                                <source 
                                  media="(min-width: 1440px)" 
                                  srcSet={`${backUrl}${pathToImg}${row.product_image_lg}`}  
                                  type="image/jpeg"
                                />

                              
                                <source 
                                  media="(min-width: 1024px)" 
                                  srcSet={`${backUrl}${pathToImg}${row.product_image_md}`} 
                                  type="image/jpeg"
                                />

                                
                                <source 
                                  media="(min-width: 768px)" 
                                  srcSet={`${backUrl}${pathToImg}${row.product_image_sm}`}
                                  type="image/jpeg"
                                />

                                
                                <img 
                                  src={`${backUrl}${pathToImg}${row.product_imageSrc}`} 
                                  alt={`${product.name} ${row.product_description} from Sahira's Original silver jewel collection.`} 
                                  className="w-full object-cover transition-all duration-700 delay-200 hover:scale-125 ease-in-out rounded-lg overflow-hidden"
                                  
                                  loading="eager"
                                  decoding="async"
                                />
                              </picture>
                                <img src={` ${backUrl+pathToImg+row.product_image_sm }`} alt={`${row.product_imageAlt}`} 
                                  className="" />
                              </Link>                        
                            </div>
                          </td>
                          <td className="p-2  overflow-clip "    >
                            <Link to={'/product?pId='+row.product_id} className="flex no-underline  ">
                              <p className="text-black font-serif  text-[9px] my-0">{ row.product_name  }</p>
                            </Link>
                            <p className="text-black w-[30vw] font-light text-[8px] my-0  truncate">{ row.product_description}</p>
                           
                          </td>
                          
                          <td className="p-2 text-center"    >
                            <div className="flex-col pt-2">
                              {
                                /*
                                <button name="addtocart" value={row.id}  onClick={handleClick}
                                      className={'relative  flex items-center justify-center '} 
                                        >
                              
                              <CartIcon className={''} iconClassName={'w-6 h-6 fill-black -mt-1'} />
                              <span className="absolute w-full flex justify-center text-black font-semibold text-xs">+</span>  
                            </button>
                                */
                              }
                            
                            <button  name="remove" value={row.id}
                                        className="static text-zinc-900 text-[9px]  hover:underline"
                                        onClick={handleRemove}>
                                        ✕&nbsp;Remove
                            </button>
                            </div>
                          </td>
                </tr>


            ))}

              </tbody>
            </table>
            
            </form>
          </div>
        
        
        

    
    </>

    )
    }
    

   
    
  }




  return (
    

      <Template bottomIsVisible={bottomIsVisible} cart={cart} setCart={setCart} >
        
        {flashMessage && (
                          
            <FlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage}  />
                         
        )}
        <div className={`mt-12 `+wrapperClass}>
          
          
          
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1 ">Wishlist</h1>
          <p className="font-light text-sm">These are your "coup-de-coeur" for a future occasion...</p>

          {content && user &&(

            <WishlistTemplate wishlist={content.wishlist} setMessage={setMessage}/>
            
          

          )}
          {loading &&(

            <div className="flex mx-auto items-center justify-center w-fit rounded-lg bg-opacity-75 bg-black p-3">
                  <svg className="animate-spin h-10 w-10 fill-white" viewBox="0 0 24 24">
                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-white font-extralight ml-2">Loading...</span>
            </div>

          )}
          
      
        </div>

        
        <div 
          ref={bottomRef} 
          style={{ height: "1px", width: "100%", position: "absolute", bottom: 0 }} 
        /> 
      
      </Template>
    
    
      
  );


  
   

};


