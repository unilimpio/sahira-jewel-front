import React, { useState, useEffect, useId} from "react";
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



const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const user = AuthService.getCurrentUser();

const wrapperClass = `mt-12 w-full h-full p-4 mb-4  mx-auto `;




export default function Collection () {

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [message, setMessage] = useState(false);

  const [loading, setLoading] = useState(false);

   const [catId,setCatId] = useState(false);

   const [prodId, setProdId] = useState(false);
  
   let navigate = useNavigate();
  
  
  if(searchParams.get("cId")){
    setCatId(searchParams.get("cId"))
  }
  
  if(searchParams.get("pId")){
    setProdId(searchParams.get("pId"))
  }


  
  function CategoryFilter(){   
    
    
    //const [message, setMessage] = useState("");
    const [categories, setCategories] = useState(false);
      
    useEffect(() => {
      
      function createOptions() {
        return {
          catId: null,           
                   
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
      return () => {


      };
  
    }, []);

    function SelectTemplate({categories}){
      
      const handleChange = (event)=>{
        
        setCatId(event.target.value)

      }
             
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
  
    return (
         
      <div className="">              
              
              {categories ? (   

              <SelectTemplate categories={categories}/>
              
              ):
              (
                <div className="flex">
                  <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>
              )
              }
            
                           
      </div>
 
    );
  
  }
 

  function ProductGrid({catId}){   
    
    const [loading, setLoading] = useState(false);
    
    
    const [products, setProducts] = useState(false);
    const [searchCourse, setSearchCourse] = useState('');
  
      
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

      

    function GridTemplate({products}){

                   
      return(
          <div className="mb-48 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {products?.map((product) => (
          <div key={'div-'+product.id+'-'+product.name} className="relative">
            <div  className="group  ">
              
              <img
                alt={product.imageAlt}
                src={backUrl+pathToImg+product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover brightness-100 group-hover:brightness-105 group-hover:drop-shadow-lg transition-all group-hover:scale-105 lg:aspect-auto lg:h-80"
              />
              <h3 className="text-xl  text-center font-serif mt-4 ">
                    <Link to={'/product?pId='+product.id} className="text-sahira-green  no-underline hover:no-underline">
                      <span aria-hidden="true" className="absolute inset-0  " />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="w-3/4 text-left font-light mt-1 text-sm text-zinc-500 truncate">{product.description}</p>
              <div className="mt-1 flex w-3/4 justify-left">
                
                  
                  
                  <p className="text-left text-xl font-medium text-zinc-600 -mt-1 ">${product.price}</p>
                  
                
              </div>
            </div>
            
              <WishlistButton product={product} setMessage={setMessage} buttonClassName={`absolute group bottom-2 right-0  items-center content-center 
                               transition-all hover:scale-105 hover:-translate-y-2 
                              
                              p-3`} iconClassName={'-mt-4 h-6 w-6'}/>


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
         
      <div className="flex flex-col ">         
              
            
            {products && (   
              
                
                <GridTemplate products={products}/>
             
            ) }

            {(!products  || loading) &&(

            <div className="flex mx-auto items-center justify-center w-fit rounded-lg bg-opacity-75 bg-black p-3">
                  <svg className="animate-spin h-10 w-10 fill-white" viewBox="0 0 24 24">
                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-white font-extralight ml-2">Loading...</span>
            </div>

          )}
            
                           
      </div>
 
    );
  
  }

   
  
  return (
    
    <Template >
      <div 
        className={` mt-10 sm:mt-16    `+wrapperClass}>
              
        <div className={`relative`} >
          
          
          {message &&(

            <AlertBox message={message} setMessage={setMessage}/>             
             
          )}    
                  
          
          <div className=" ">
              <h1 className="text-zinc-600 text-2xl font-serif md:text-3xl lg:text-4xl">Collection</h1>
              
              <CategoryFilter catId={catId} />
          </div>          

          <div className="">
              <ProductGrid catId={catId} />
          </div>
              
        
        </div>          
        

        
            
        </div>
      </Template>
  );

  
};


