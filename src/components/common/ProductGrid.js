import React from "react";
import { Link } from "react-router";

export default function ProductGrid({products}) {

    const backUrl = process.env.REACT_APP_BACK_URL;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const pathToImg = "assets/uploads/"
  
    return (
  <ul className="grid grid-cols-2 gap-x-4 gap-y-10 p-0 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12 xl:gap-x-8">
    {products.map((item) => (
      <li 
        key={`home-prod-${item.product_id || item.product_name}`} 
        className="group relative flex flex-col justify-between"
      >
        {/* Contenedor de la Imagen con Aspecto Fijo y Borde Sutil */}
        <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 rounded-sm outline outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10">
          <Link to={`/product?pId=${item.product_id}`} className="block relative h-full w-full">
            <img
              alt={item.product_name}
              src={`${backUrl}${pathToImg}${item.product_imageSrc}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {
              parseInt(item.product_is_sold_out) &&
                <div className="absolute w-full z-40  bottom-2 p-1">
                  <span className="fles w-24 text-zinc-500 font-serif text-xs text-center ring-1 ring-zinc-300 bg-white bg-opacity-75 rounded-full p-2">Sold Out</span>
                </div>

            }
          </Link>
        </div>

        {/* Información del Producto */}
        <div className="mt-4 flex flex-col items-center text-center px-1 flex-grow">
          {/* Título */}
          <h3 className="font-serif text-xs font-medium tracking-wide text-zinc-900 dark:text-zinc-100">
            {item.product_name}
          </h3>
          
          {/* Descripción corta */}
          <p className="mt-1 max-w-[90%] text-[11px] font-light text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {item.product_desc}
          </p>

          {/* Tag de Edición Limitada 
          <span className="mt-1.5 text-[9px] font-medium tracking-widest text-amber-600/80 dark:text-amber-400/80 uppercase">
            Edición Limitada
          </span>
          */}
        </div>

        {/* Botón de Acción Principal (Descubrir) */}
        <div className="mt-3 flex justify-center">
          <Link 
            to={`/product?pId=${item.product_id}`} 
            className="text-[11px] font-light tracking-widest text-zinc-400 dark:text-zinc-500 uppercase transition-colors duration-300 hover:text-black dark:hover:text-white hover:underline underline-offset-4"
          >
            Descubrir
          </Link>
        </div>
      </li>
    ))}
  </ul>
);

}