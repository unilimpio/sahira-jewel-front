import React, { useState, useEffect, useRef} from "react";
import { HeartIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router";
import { useNavigate } from "react-router";

import { useSearchParams } from "react-router";
import Logo from "./common/Logo";

import Template from "./common/template/Template";
import AlertBox from "./common/template/AlertBox";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import WishlistButton from './common/WishlistButton';
import FlashMessage from "./common/FlashMessage";

import Loading from "./common/template/Loading";




const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const user = AuthService.getCurrentUser();

const wrapperClass = `mt-12 w-full h-full p-4 mb-4  mx-auto `;




export default function Collection () {

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [message, setMessage] = useState(false);

  const [flashMessage, setFlashMessage] = useState(localStorage.getItem('sj_flashMessage'));

  const [loading, setLoading] = useState(false);

   const [catId,setCatId] = useState(false);

   const [prodId, setProdId] = useState(false);
  
   let navigate = useNavigate();

   const [categories, setCategories] = useState(false);

   const [products, setProducts] = useState(false);
  
   const [searchCourse, setSearchCourse] = useState('');

  const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick
   
  
    const bottomRef = useRef(null);
  /*
  if(searchParams.get("cId")){
    setCatId(searchParams.get("cId"))
  }
  
  if(searchParams.get("pId")){
    setProdId(searchParams.get("pId"))
  }*/

   // SOLUCIÓN AL BUCLE INFINITO:
  useEffect(() => {
    const cId = searchParams.get("cId");
    //const pId = searchParams.get("pId");
    if (cId) {
      setCatId(cId);
    } 
   // if (pId) {
   //   setProdId(pId);
   // }
  }, [searchParams]); // Solo se ejecuta cuando cambia la URL


  //this useeffect populates the categories within a category set by catId state, if null then you are at the top of the tree
  useEffect(() => {
      
      function createOptions() {
        return {
          catId: catId,           
                   
        };
      }
      
      const options = createOptions();
      
      setLoading(true)
      
      UserService.getCategories(options.catId).then(

              (response) => {

                  setCategories(response?.data.categories);                  

                  console.log(response?.data)                
              
              },

              (error) => {
                const _content =
                  (error?.response && error?.response.data) ||
                  error?.message ||
                  error?.toString();
                
                setCategories(_content);

                console.log(error)
              
              }
            
      )

      setLoading(false)


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
  
    }, []);//
//this use effect populates the products to be shown depending on the catId state
  useEffect(() => {
        // Add scroll event listener when the component mounts
    

        function createOptions() {
          return {
            catId: catId,           
                    
          };
        }
        
        const options = createOptions();   

        setLoading(true)

            UserService.getProducts(options.catId).then(

                (response) => {
                  
                    setProducts(response?.data.products);         
                    console.log(response?.data)                  
                    console.log(response?.data.products)
                    setLoading(false)
                
                },

                (error) => {
                  const _content =
                    (error?.response && error?.response.data) ||
                    error?.message ||
                    error?.toString();
                  
                  setProducts(_content);
                  console.log(error)
                
                }
              
            )

        
        return () => {
            
        };
    
  }, [catId]);


    function SelectCategory({categories}){
      
      const handleChange = (event)=>{
        
        setCatId(event.target.value)

      }

      if(categories){
             
        return(
          <div className="flex flex-row">
            <p className="text-sm  font-light">Filter by category:&nbsp;</p>   
            <select id="categories-select" className={` border border-zinc-500 rounded-lg text-sm font-light h-5`} value={catId} onChange={handleChange}>                             
                  <option  value={ false  }>All</option>
              {
                  
                categories?.map(category => (
                  <option key={'option-'+category.id+'-'+category.name} value={ category.id  }>{ category.name }</option>
                  
                  
            
                ))
              }
              
              </select>
            
            
          </div>
        );
      }

      return null
    
    }   

    function GridTemplate({products}){

                    
        return (
  <div className="mb-48 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {products?.map((product) => (
      <div 
        key={`product-${product.id}`} 
        className="group relative flex flex-col justify-between"
      >
        {/* Contenedor de la Imagen con Relación de Aspecto Fija */}
        <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-50 rounded-sm">
          <Link to={`/product?pId=${product.id}`} className="block h-full w-full">
            <img
              alt={product.imageAlt}
              src={`${backUrl}${pathToImg}${product.imageSrc}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Información del Producto */}
        <div className="mt-4 flex flex-col items-center text-center px-2 flex-grow">
          <h3 className="font-serif text-xs font-medium text-zinc-900 tracking-wide">
            {product.name}
          </h3>
          <p className="mt-1 max-w-[85%] text-[11px] font-light text-zinc-500 line-clamp-2 min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* Botón de Acción Principal (Descubrir) */}
        <div className="mt-3 flex justify-center">
          <Link 
            to={`/product?pId=${product.id}`} 
            className="text-[11px] font-light tracking-widest text-zinc-400 uppercase transition-colors duration-300 hover:text-black hover:underline underline-offset-4"
          >
            Descubrir
          </Link>
        </div>

        {/* Botón de Wishlist Absoluto */}
        <WishlistButton 
          product={product} 
          setFlashMessage={setFlashMessage} 
          buttonClassName="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110" 
          iconClassName="h-5 w-5 text-zinc-600 transition-colors duration-300 hover:text-red-500 hover:fill-red-500"
        />
      </div>
    ))}
  </div>
);

      
      
    }
      
    function SearchComponent({ searchCourse, courseSearchUserFunction }) {
        return (
          
            
            
              <input
                type="text"
                placeholder="Search..."
                value={searchCourse}
                onChange={courseSearchUserFunction}
                className={'border border-zinc-600 bg-neutral-100 w-36 h-4 text-xs font-extralight'}
              />
            
          
        );
    }

    

   
  
  return (
    
    <Template bottomIsVisible={bottomIsVisible} >
      <div 
        className={` mt-10 sm:mt-16    `+wrapperClass}>
              
        <div className={`relative`} >
                       
          
          <div className=" ">
              <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">Collection</h1>
              
              <SelectCategory categories={categories} />
          </div>          

          <div className="flex flex-col ">         
                
              
              {products && (   
                
                  
                  <GridTemplate products={products}/>
              
              ) }

            {loading &&(

                  <Loading />

            )}
              
                            
        </div>
              
        
        </div>          
        

        
            
        </div>
        {flashMessage && (
                  
          <FlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage}  />
                 
      )}

      <div 
          ref={bottomRef} 
          style={{ height: "1px", width: "100%", position: "absolute", bottom: 0 }} 
        />  
      </Template>
  );

  
};


