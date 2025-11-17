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

  const wrapperClass = `w-full h-full p-3  mx-auto `;

  
  function CatFilter(){   
    
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
            <p className="text-sm font-thin">Filter by category:&nbsp;</p>   
            <select id="categories-select" className={` border border-zinc-500 rounded-lg text-sm font-light h-5`} value={catId} onChange={handleChange}>                             
            
              {
                categories?.map(row => (
                  <option value={ row.id  }>{ row.name }</option>
                  
                  
            
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
            <div key={product.id} className="group relative ">
              <img
                alt={product.imageAlt}
                src={backUrl+pathToImg+product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-xl text-zinc-600">
                    <a href={`${baseUrl+'product?pId='+product.id}`} className="text-purple-400">
                      <span aria-hidden="true" className="absolute inset-0 text-purple-400 " />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{product.description}</p>
                </div>
                <p className="text-xl font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
          
        );
    
    
    }
  
    return (
         
      <div className="flex flex-col">         
              
            
            {products ? (   

              <GridTemplate products={products}/>
              
            ) : (
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

  function ProductDetail({prodId}){   
    
    
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState(false);
    const [content, setContent] = useState(false);
    

    //simple strings for the buttons, choose your own!
    const strSave = `✅ Aceptar y Continuar`;
    const strCancel = `❌ Cancelar`;

  
    useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
        
      try { 

        UserService.getProduct(prodId).then(

            (response) => {

              setContent(response.data.product);
              
              
              console.log(content);
              
              console.log(response);              
              
            
            
            },

            (error) => {
              const _content =
                (error?.response && error?.response.data) ||
                error?.message ||
                error?.toString();
              
              setError(_content);
              
              
            
            }
          
        )
          
        } catch (error) {
          
        }
        
     
      // Clean up the event listener when the component unmounts
      return () => {
        //this is the reset state of the scroll blocking above
        //document.body.style.overflow = "scroll"

        

    };
  
    }, [prodId]);    

    const RenderDetail = () => { 
   
      function handleSubmit(event) {

        event.preventDefault();

        const form = event.target;

        //this one ocntains all the magic ...
          const formData = new FormData(form);
        
        const values = [...formData.entries()];
        const formElements = form.elements;
        
        const onSubmitObs = formData.get("obs");
             
        
        console.log(values);
        
        console.log(form);
        
        console.log(formElements);
        
        console.log(onSubmitObs);

        
        
       

        if (!error) {
                    
          const data = {

            order_details: formData.get("talla"),            
            
          }
          console.log(data);
              
          
        }       
        

        
        
      }
      
      const Add2CartButton = ({className, children}) => {

             
      return (   
  
        <button  type="submit" id="submit"
                className={className + 
                  `m-1 p-1 rounded-md border border-white 
                  
                  bg-gradient-to-b from-sky-400 to-sky-800 
                      hover:shadow-md hover:bg-sky-600 
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-150
                  `                    
                } 
                disabled={loading} >
          
          <span className="mx-1 text-white font-semibold text-sm">{children}</span>
          
          
          
  
        </button>
  
      );
    
      }    

      const BackButton = ({className, children}) => {

        function handleClick (){
        
          setMessage("Product view cancelled");
          console.log(message);
          setLoading(false);
          setContent(false); 
          setProdId(false);
          
          setShowModal(false);
          
          
        
        }
      
        return (  
          
    
    
          <button  
                  type="button"
                  className={className +
                    `m-1 p-2 flex flex-row  
                    rounded-md 
                    hover:bg-white bg-zinc-50 border border-zinc-400 font-semibold
                    
                    `
                  } 
                  disabled={loading} onClick={handleClick}>
            
            <span className="mx-1 text-zinc-400 text-xs font-thin hover:no-underline">{children}</span>
              
          </button>
    
        );
      } 

      const SelectField = ({className, children, name}) => {       
        
        const [isSelected, setIsSelected] = useState(false);
        
        const labelClassName = ` hover:bg-zinc-50  hover:shadow-md p-1 rounded-md flex items-center `;
        const inputClassName = ` mr-2 ` + className;
        
        const id = useId();

        function handleChange(event){
                      setIsSelected(event.current.value);
                      console.log('selected change  noted! value:'+event.current.value );
        }

        return (  
            
          <div className="">
            <label htmlFor={name+id} className={`` + labelClassName}>    
            <select name={name} id={name+id} value={isSelected} onChange={handleChange}>                
                {children}
              </select>
            </label> 
            
            
          </div>   
      
          );
        
        

      } 

      const ObsInput = ({className, children}) => {

        const [obs, setObs] = useState("");
        
        
        function handleChange(e){

          const value = e.target.value;
  
          console.log(value);
  
          return setObs(value);
  
          
  
        }
        

        return (

          <label htmlFor="obs" className="text-slate-700 text-sm font-thin hover:shadow-md rounded-md hover:bg-zinc-50 focus:bg-zinc-100 p-2">{children}:
                    
          <br/>  <textarea 
              className={className + 
                `text-sm font-thin 
                border-zinc-800 
                border rounded-md 
                focus:shadow-sm 
                focus:ring-slate-500 focus:ring-1 focus:outline-none
                
                
              `}
              name="obs" 
              id="obs"
              
              value={obs}
              cols="32"
              onChange={ handleChange }
             
                      
                      
            /> 
          </label>
        );
      }

          
      return(
    
          <form id="product-requirements" onSubmit={handleSubmit}  className="">

            <div className="flex flex-col p-2 border rounded-md border-slate-700 bg-stone-100 text-wrap ">
                    
              <h3 className="text-sm font-thin bg-slate-200">
                Talla: &nbsp;
                      
              </h3>       
                    

              <div className="flex flex-row justify-evenly">
                      
                <SelectField name="talla" className="">
                  {




                  }
                </SelectField>                 
                        
              </div>
              <div className="mx-auto">
                
                <ObsInput className="">Comentarios (opcional)</ObsInput>

              </div>
                          
            </div>   
            {error && (
                          
                          <div className="alert alert-danger " role="alert">
                              {error}
                          </div>
                                  
            )}      
    
            <div className=" flex justify-evenly my-2">
                
                {loading && (
                <button className="bg-slate-400 border-2 rounded-md py-2 w-[7rem] relative text-left" disabled={loading}>
                  <svg className="absolute left-1 animate-spin h-4 w-4 fill-white" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-white ml-8">Loading</span>
                </button>
                )} 
                {!loading && (
                  <>
                    <Add2CartButton 
                      className={`
                        `}>
                        {strSave}
                    </Add2CartButton>
                    
                    <BackButton 
                      className=" ">
                        {strCancel}
                    </BackButton>           
                    
                  </>
                
                )}
              
            </div>
    
    
            
          </form>
        
      );

      
  
    }

    return (
        
        <>
          <div className="w-11/12 mx-auto p-2 ">
              
              
              {content ? (

                <div id="eval-modal" 
                    className="  my-2 flex flex-col   
                        bg-gradient-to-br from-white  to-zinc-200  
                        z-50 relative
                        rounded-md shadow-md 
                        border border-zinc-800 py-3 px-2
                        ">
                          
                      {message && (
                        
                          <div className="alert alert-info" role="alert">
                            {message}
                          </div>
                        
                      )}

                  <Logo mainColor={"cyan-500"}/>

                    <div className="flex flex-row p-1 place-content-between">
                      
                      
                      <div className="flex flex-col">

                        

                          <h2 className="m-1 grow                       
                        text-stone-500 text-xl md:text-4xl text-left
                          font-black ">
                          📋&nbsp;Product. N°{content.id}
                        </h2>

                      </div>
                    

                      <div className="w-1/2 bg-stone-100 rounded-md border  border-slate-700 p-2 ">
                        
                        <p className="text-zinc-600 text-xs sm:text-sm font-thin ">
                          <span className="font-bold">Name:&nbsp;</span> 
                          {content.name}
                          
                        </p>
                        <p className="text-zinc-600 text-xs sm:text-sm font-thin">
                          <span className="font-bold">Descripcion:&nbsp;</span> 
                          {content.description}
                          
                        </p>
                        
                      </div>
                    </div>   

                </div>
              ) : (
                
                <div className="flex flex-row">
                  <svg className="animate-spin h-10 w-10 fill-stone-200" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <p className="text-slate-500">Loading...</p>
                </div>

              
              )}
                              
          </div>
        </>
        
    );

  } 
  
  return (
    
    <Template>
      <div 
        className={`      `+wrapperClass}>
        
      
        <div className={`relative
                    
                    ${showModal && (
                      `hidden`
                    )
                    }
                    
              `} 
        >
          {message && (
                  
                  <AlertBox message={message} type="info"/>
                 
                )}
              {error && (
                  <AlertBox message={error} type="error"/>
                  
          )}
          <div className=" bg-white  p-1 ">
              <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Collection</h1>
              
              <CatFilter catId={catId} />
          </div>          

          <div className="">
              <ProductGrid catId={catId} />
          </div>
              
        
        </div>   
        
        {prodId &&(

          <div className="absolute flex top-0 left-0 m-0 w-full  h-screen">
            
          
            <div id="overlay" className="absolute z-30 bg-slate-600 opacity-80 w-full h-screen"></div>
            <ProductDetail prodId={prodId}/>

          </div>


        )}

        
            
        </div>
      </Template>
  );

  
};


