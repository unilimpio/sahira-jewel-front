import React, { useState, useEffect} from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import { useSearchParams } from "react-router";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Logo from "./common/Logo";

import Template from "./common/template/Template";
import AlertBox from "./common/template/AlertBox";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import ProductImages from './common/ProductImages';

import WishlistButton from './common/WishlistButton';


const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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

export default function Product () {

  const options = {
  sizes: [
    { id: 'small', name: 'Small', classes: 'bg-neutral-200 checked:outline-gray-700' },
    { id: 'medium', name: 'Medium', classes: 'bg-neutral-300 checked:outline-gray-700' },
    { id: 'large', name: 'Large', classes: 'bg-neutral-400 checked:outline-gray-700' },
  ],
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      name: 'Care',
      items: [
        'Spot clean as needed',
        'Hand wash with mild soap',
        'Machine wash interior dividers',
        'Treat handle and tabs with leather conditioner',
      ],
    },
    {
      name: 'Shipping',
      items: [
        'Free shipping on orders over $300',
        'International shipping available',
        'Expedited shipping options',
        'Signature required upon delivery',
      ],
    },
    {
      name: 'Returns',
      items: [
        'Easy return requests',
        'Pre-paid shipping label included',
        '10% restocking fee for returns',
        '60 day return window',
      ],
    },
  ],
}



  const user = AuthService.getCurrentUser();
  const [searchParams, setSearchParams] = useSearchParams();
    
    if(searchParams.get("pId")){
          
          console.log(searchParams.get("pId"))
    }
  
  const [prodId, setProdId] = useState(searchParams.get("pId"));
 
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);

  const [searchCourse, setSearchCourse] = useState('');

  const [cart, setCart] = usePersistedState('sjCart', []);

  const wrapperClass = `w-full h-full p-3  mx-auto `;  
  const [product, setProduct] = useState(false);
    const [images, setImages] = useState(false);
    const [details, setDetails] = useState(false);
     const [loading, setLoading] = useState(false);

   useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";
       

        UserService.getProduct(prodId).then(

            (response) => {

              setProduct(response.data.product);    
             setImages(response.data.images)
              setDetails(response.data.details)
              console.log(response.data);   
              console.log(response.data.product);
              console.log(response.data.details);
              console.log(response.data.images);                
              
            
            
            },

            (error) => {
              const _product =
                (error?.response && error?.response.data) ||
                error?.message ||
                error?.toString();
              
              setError(_product);
              console.log(error);  
              
            
            }
          
        )         
        
        console.log('this inside useffect in product detail component',cart)
     
      // Clean up the event listener when the component unmounts
      return () => {
        //this is the reset state of the scroll blocking above
        //document.body.style.overflow = "scroll"

        

    };
  
    }, [prodId]);

  
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
    
  
    const ProductDetailTemplate = ({product, images, details}) => { 

      let navigate = useNavigate();
   
      function handleClick(event) {

        event.preventDefault();

        addCourseToCartFunction(product)
        setMessage('Product added to cart!');
        navigate(0)
        
      }
      
      const Add2CartButton = ({className, children}) => {

             
      return (   
  
        <button  
                className={className + 
                  `  rounded-md ring-1 ring-white p-2                 
                      drop-shadow-md
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-150
                  `                    
                } 
                disabled={loading} onClick={handleClick}>
          
          <span className="mx-8 text-white font-normal text-base">{children}</span>
          
          
          
  
        </button>
  
      );
    
      }    

      const BackButton = ({className, children}) => {

        function handleClick (){
        
          setMessage("Product view cancelled");
          console.log(message);
          setLoading(false);
          setProduct(false); 
                   
          setShowModal(false);
          return navigate('collection')
          
        
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
     
        <>
          <div className="w-11/12 mx-auto p-2 ">
              
              
              {product ? (
          <div key={product.id} className="mb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup key={'tabgrp'+product.id} className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6 fixed -top-20 -left-20 sm:static">
                {images?.map((image) => (
                  <Tab
                    key={image.id}
                    className=" group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-sahira-green/50 focus:ring-offset-4"
                  >
                    <span className="sr-only">{image.imageAlt}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img alt={image.imageAlt} src={backUrl+pathToImg+image.imageSrc} className=" object-contain" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-sahira-green"
                    />
                  </Tab>
                  
                ))}
              </TabList>
              
            </div>
            <div className={' sm:hidden mt-16 sm:mt-6 drop-shadow-lg '}>
              <ProductImages className ={``} images={images} />
            </div>
            <TabPanels className={'hidden sm:block'}>
              {images?.map((image) => (
                <TabPanel key={image.id}>
                  <img alt={image.imageAlt} src={backUrl+pathToImg+image.imageSrc} className="aspect-square w-full object-cover sm:rounded-lg mt-16" />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-sahira-green font-serif">{product.name}</h1>

            <div className="mt-3 flex justify-between">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-zinc-600">${product.price}</p>
              
                          
              <WishlistButton product={product} setMessage={setMessage} buttonClassName={``} iconClassName={`-mt-4 h-6 w-6`}/>
              
              
                          
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {/*
                  [0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'size-5 shrink-0',
                      )}
                    />
                  ))
                  */}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                
                className="space-y-6 text-base font-light text-justify text-gray-700"
              >
                { product.description }
              </div>
            </div>

            <form className="mt-6">
              
              {/* Sizes */
                parseInt(product.is_sizes) ? (
                  <div className={''}>
                    <h3 className="text-sm font-medium text-gray-600">Size</h3>

                    <fieldset aria-label="Choose a size" className="mt-2">
                      <div className="flex items-center gap-x-3">
                        
                        {options.sizes?.map((size) => (
                          <div
                            key={size.id+size.name}
                            className="flex relative rounded-full  outline-black/10"
                          >
                            <label className="text-[9px] border-none" htmlFor={size.id+size.name}>
                            <input
                              defaultValue={size.id}
                              defaultChecked={size === options.sizes[0]}
                              name="size"
                              id={size.id+size.name}
                              type="radio"
                              aria-label={size.name}
                              className={classNames(
                                size.classes,
                                'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline checked:outline-2 checked:outline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]',
                              )}
                            />
                            <span className="absolute left-3 top-5">{size.name[0]}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
              ) : ('One size')
              
              
              }
              

              <div className="mt-10 flex">
                <Add2CartButton className={"bg-sahira-green"} addCourseToCartFunction={addCourseToCartFunction}>Add to bag</Add2CartButton>

              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t border-gray-200">
                {details.map((detail) => (
                  <div className={detail.items.length === 0 ? ('hidden'):('')}>
                       <Disclosure key={detail.name} as="div">
                    <h3>
                      <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span className="text-sm font-light text-zinc-600 group-data-[open]:text-sahira-green group-data-[open]:font-medium">
                          {detail.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="block size-3 text-sahira-green group-hover:text-gray-500 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="hidden size-3 text-zinc-400 group-hover:text-zinc-600 group-data-[open]:block"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pb-6">
                      <ul className="list-disc space-y-1 pl-5 text-sm/6 text-zinc-700 marker:text-zinc-300 font-light">
                        {detail.items.map((item) => (
                          detail.name === 'Features' ? (
                            <li key={item} className="">
                              {item}
                            </li>
                          ) : (
                            <span key={item} className="">
                                {item}
                            </span>
                          )
                          
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                  </div>
                 
                ))}
              </div>
            </section>
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
    
    <Template cart={cart} setCart={setCart}>
      <div 
        className={`      `+wrapperClass}>
        
        {message &&(

            <AlertBox message={message} setMessage={setMessage} />             
             
          )}  
        
        
        
        {prodId &&(
          <ProductDetailTemplate product={product} images={images} details={details}/>
        )}
    
        </div>
      </Template>
  );

  
};


