    import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react';
    import Slider from 'react-slick';

    import WishlistButton from './WishlistButton';

    const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

    const CardSlider = ({ cards , setMessage}) => {
      const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 2, // Number of cards visible at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        //easing: 'easeOutElastic',
        cssEase: 'ease-out',
        // Add more settings as needed (e.g., autoplay, arrows)
      };

      console.log('cardsV0.01:this is the data i got...',cards)
      if(cards){

        return (
        <Slider {...settings}>
          {cards.map((card, index) => (
            
            <>
            
            <div key={index+card.id+card.name} className=" group overflow-hidden transition-all hover:-translate-y-1 delay-100  md:mx-10 ">
              <a href={`${baseUrl}product?pId=${card.id}`} className={'no-underline hover:no-underline  '}>              
                {/* Your card content goes here */}
              
                <div className={"flex flex-col rounded-md p-2 "}>
                    <h3 className={"font-serif font-semibold text-[12px] text-sahira-green  text-center "}>{card.name}</h3>
                    
                    <div className={"rounded-md w-full  text-[10px] font-light text-zinc-600 truncate m-0 grow transition-all delay-100 group-hover:drop-shadow-lg  group-hover:brightness-105"}>
                      <img className="w-full h-[25vh] object-cover m-0 " src={backUrl+pathToImg+card.imageSrc} alt={card.imageAlt || 'imagen del product no cargada'} />
                        
                    </div>                   
                     
                    <p className='w-3/4 text-[9px] sm:text-[11px] text-left font-extralight text-zinc-500 truncate  my-1 '>{card.description}</p>
                    
                    <div className="flex justify-between">
                      <h4 className='text-[12px] text-zinc-400 font-semibold my-1 text-center'>${card.price}</h4>
                      

                    </div>
                </div>
                
              </a>
              <div className='relative'>
                  <WishlistButton product={card} buttonClassName={`absolute bottom-3 right-2 items-center content-center 
                               transition-all hover:scale-110 
                              `} iconClassName={'-mt-6 h-5 w-5 hover:fill-red-400'} setMessage={setMessage} />

              </div>
              
            </div>
            
              
            </>
          ))}
        </Slider>
      );

      } else {

        return null;

      }
      
    };

    export default CardSlider;