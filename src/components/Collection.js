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
      return () => {


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
              
                <WishlistButton product={product} setFlashMessage={setFlashMessage} buttonClassName={`absolute group bottom-2 right-0  items-center content-center 
                                transition-all hover:scale-105 hover:-translate-y-2 delay-150 duration-500
                                
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
    
    <Template >
      <div 
        className={` mt-10 sm:mt-16    `+wrapperClass}>
              
        <div className={`relative`} >
                       
          
          <div className=" ">
              <h1 className="text-zinc-600 text-2xl font-serif md:text-3xl lg:text-4xl">Collection</h1>
              
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
      </Template>
  );

  
};


