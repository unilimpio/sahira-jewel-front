import React from "react";
import { Link } from "react-router";

export default function ProductGrid({products}) {

    const backUrl = process.env.REACT_APP_BACK_URL;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const pathToImg = "assets/uploads/"
  
    return (
    <ul  className="grid grid-cols-2 grid-rows-3 p-0 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-8 xl:gap-x-8">
      {products.map((item) => (
        <li key={item.product_name} className=" relative ">
          
          <div className="group  transition duration-250 ease-in-out overflow-hidden outline outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10">
            <div className="w-full  h-[20vh] md:h-[30vh] overflow-clip ">
              <img
                alt=""
                src={`${backUrl+pathToImg}${item.product_imageSrc}`}
                className="w-full object-fill group-hover:scale-125 transition-all duration-700 delay-200 ease-in-out "
              />
            </div>
            
                       
            
          </div>
          <h3 className=" mt-2 mb-0  text-center text-[10px] font-thin font-serif text-black dark:text-white">
              {item.product_name}
            </h3>
            <p className=" truncate mb-0 text-[9px] text-center font-light text-zinc-800 dark:text-white">
              {item.product_desc}
            </p>
            <p className=" text-[6px] mt-0 mb-2 text-center font-light text-zinc-800 dark:text-white">
              Edición Limitada            
            </p> 
          <Link to={`/product?pId=${item.product_id}`} className="flex justify-center no-underline text-[9px] font-light m-0 p-2 text-black hover:underline">
            Descubrir
          </Link>
          
          
          
        </li>
      ))}
    </ul>
    )
}