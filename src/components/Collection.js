import React, { useState, useEffect, useId} from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import { useSearchParams } from "react-router";
import Logo from "./common/Logo";

import Template from "./common/template/Template";
import AlertBox from "./common/template/AlertBox";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";


const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Collection () {

  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();
  

  const user = AuthService.getCurrentUser();
  
  const [catId,setCatId] = useState(false);
  if(searchParams.get("cId")){
    setCatId(searchParams.get("cId"))
  }
  const [prodId, setProdId] = useState(false);
  if(searchParams.get("pId")){
    setProdId(searchParams.get("pId"))
  }
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  const wrapperClass = `w-full h-full p-4 mb-4  mx-auto `;

  
  function CategoryFilter(){   
    
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState("");
    const [categories, setCategories] = useState(false);
      
    useEffect(() => {
      
      function createOptions() {
        return {
          catId: null,           
                   
        };
      }
      
      const options = createOptions();   
      
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
    //const [message, setMessage] = useState("");
    
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

          UserService.getProducts(options.catId).then(

              (response) => {
                
                  setProducts(response?.data.products);         
                  console.log(response?.data)                  
                  console.log(response?.data.products)
               
              
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

    const ViewButton = ({prodId}) => {

      function handleClick (){
      
        setMessage(false);
        setError(false);
        setLoading(true);
        setProducts(false); 
        
        setProdId(prodId);
        console.log('product id state changed to : '.prodId)
        //setInstance(instance);
        
        setShowModal(true);
      
      }
    
      return (
  
  
        <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                onClick={handleClick}>
          <svg  className="w-4 h-4 " viewBox="0 0 512 512"> 
    
            <path className=" fill-green-400 " d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256
              C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031
              c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031
              l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"/>
  
          </svg>
          
          
  
        </button>
  
      );
    }  

    function GridTemplate({products}){

      
  
             
        return(
          <div className="mt-6 mb-48 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {products?.map((product) => (
            <div key={'div-'+product.id+'-'+product.name} className="group relative ">
              <img
                alt={product.imageAlt}
                src={backUrl+pathToImg+product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div className="w-72">
                  <h3 className="text-xl text-zinc-600">
                    <Link to={`${baseUrl+'product?pId='+product.id}`} className="text-sahira-green hover:text-zinc-600">
                      <span aria-hidden="true" className="absolute inset-0  " />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 truncate">{product.description}</p>
                </div>
                <p className="text-xl font-medium text-zinc-600">${product.price}</p>
              </div>
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
              
            
            {products ? (   
              
                
                <GridTemplate products={products}/>
             
            ) : (
              <div className="flex" id="loading...">
                  <svg className="animate-spin h-4 w-4 fill-sahira-green" viewBox="0 0 24 24">
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

   
  
  return (
    
    <Template>
      <div 
        className={` mt-16    `+wrapperClass}>
              
        <div className={`relative`} >
          {message && (
                  
                  <AlertBox message={message} type="info"/>
                 
                )}
              {error && (
                  <AlertBox message={error} type="error"/>
                  
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


