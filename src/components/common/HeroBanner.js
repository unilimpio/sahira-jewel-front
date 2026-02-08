    import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react';
    import Slider from 'react-slick';

    const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

    const HeroBanner = ({ banners, buttonCss }) => {
      const settings = {
        dots: true,
        
        infinite: true,
        speed: 1000,
        slidesToShow: 1, // Number of banners visible at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease-out'
        // Add more settings as needed (e.g., autoplay, arrows)
      };

      
      if(banners){

        return (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            
            
            <div key={index+banner.title} className="flex m-0">
              
                           {/* Your banner content goes here */}
              
                  <div className={'relative mx-auto'}>    
                    <div id="banner-overlay" className="absolute top-0  w-full h-full" />
                    <div className="overflow-hidden h-[100vh]">
                      <picture className="h-[50vh]">
                        <source
                          media="(max-width: 768px)"
                          srcSet={backUrl+pathToImg+banner.imageSrcMobile}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={backUrl+pathToImg+banner.imageSrc}
                        />
                        <img
                          src={backUrl+pathToImg+banner.imageSrc}
                          alt="Hero"
                          className=""
                        />
                      </picture>
                      
                    </div>
                    {
                      banner.title && (

                        <div className="absolute bottom-40 md:bottom-56 w-full flex flex-col  p-6 ">
                      
                          <h1 className="text-white font-thin font-serif text-2xl  text-center">
                                {banner.title}
                          </h1>
                          <h2 className="font-serif text-lg text-white  text-center">
                            {banner.text}
                          </h2>

                          <a key={index+banner.title} href={`/product?pId=${banner.pref}`} className={'no-underline hover:no-underline mx-auto '}> 
                          <button className={`${banner.buttonCss  || `max-w-1/2 mx-auto my-2 ring-2 drop-shadow-md rounded-sm p-2 px-3 font-serif 
                            hover:bg-sahira-white bg-transparent ring-white hover:bg-sahira-green text-white hover:text-sahira-beige`}`}>
                            {banner.cta}
                          </button>
                          </a>

                        </div>

                      )

                    }
                    
                  </div>
                
              
              
              
            </div>
            
          ))}
        </Slider>
      );

      } else {

        return null;

      }
      
    };

    export default HeroBanner;