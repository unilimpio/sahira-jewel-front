    import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react';
    import Slider from 'react-slick';

    const pathToImg = "assets/uploads/"
const backUrl = process.env.REACT_APP_BACK_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const ProductImages = ({ images, className }) => {
      const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Number of images visible at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        // Add more settings as needed (e.g., autoplay, arrows)
      };

      
      if(images){

        return (
        <Slider {...settings}>
          {images.map((image, index) => (
            
            
            <div key={index+image.title} className={`rounded-b-md  max-h-80 ${className}`}>
            
              <img src={backUrl+pathToImg+image.imageSrc} alt={image.imageAlt} className={'object-cover rounded-b-md brightness-105'}/>
                         
              
            </div>
            
          ))}
        </Slider>
      );

      } else {

        return null;

      }
      
    };

    export default ProductImages;