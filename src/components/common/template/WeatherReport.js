import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";
import CityBackground from "./CityBackground";
import CitySunny from "./CitySunny";
import CityNight from "./CityNight";
import CityCloudy from "./CityBackground";
import CityRainy from "./CityRainy";
import CityStorm from "./CityBackground";

import UserService from "../../../services/user.service";

//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const WeatherReport = ({className, location}) => {

  const [weatherInfo,setWeatherInfo] = useState(false);
  //const [haystack, setHaystack] = useState(false);
  const [isRain, setIsRain] = useState(false);
  
  const [error,setError] = useState(false);
  const [message,setMessage] = useState(false);
  
  useEffect(() => {

    const fetchWeather = async () =>{

      const response = await UserService.getWeatherInfo(location).then(

        (response)=>{

          console.log(response?.data)
          setWeatherInfo(response?.data)
          //setMessage(response?.message)
          const haystack = response?.data?.current?.condition?.text;

          console.log(haystack)
          console.log(haystack.includes('rain'))
          if ( haystack.includes('rain') || haystack.includes('lluvia') || haystack.includes('precipitaciones') ||  haystack.includes('Lluvia') ||  haystack.includes('Llovizna')  ){
            
            setIsRain(true);
          }

        },
        (error)=>{

          console.log(error);
                const _content =
                  (error?.response && error?.response.data) ||
                  error?.message ||
                  error?.toString();
                
                setError(true);
                setMessage(_content)
        }

      )

    }
    fetchWeather();

  }, [location]);

  return (
                       
        <div className="fixed top-20 right-0  w-1/4 sm:w-fit flex flex-col m-2 rounded-lg border border-slate-400">
          {
            weatherInfo ? (
              <div className={!weatherInfo.current.is_day ? ('text-white'):('')}>
                <p className="text-[10px] text-right">
                  {weatherInfo?.location?.name + ', ' + weatherInfo?.location?.region+', ' + weatherInfo?.location?.country}<br/>
                  <strong>Fecha y Hora Local: </strong>{weatherInfo?.location?.localtime }<br/>
                  <strong>Clima Hoy: </strong>
                  <img className="w-14 float-right" alt={`forecast for today is ${weatherInfo?.current?.condition.text}`} src={weatherInfo?.current?.condition.icon}/>
                  {weatherInfo?.current?.temp_c} °C - {weatherInfo.current.is_day ? ('Dia') : ('Noche') }<br/>
                 
                  humedad: {weatherInfo?.current?.humidity}<br/>
                </p>
                
              </div>
            ):(

              
              <span className="bg-red-300 border-red-500 h-4 w-fit">
                No se pudo cargar la informacion de clima;
              </span>

            

            )
          }
          
          { 
            weatherInfo?.current?.condition?.code === 1000 && weatherInfo?.current?.is_day &&(

              <CitySunny/>

            )
          }
          {
             weatherInfo?.current?.condition?.code !== 1000 && !weatherInfo?.current?.is_day && !isRain &&(
              <CityNight/>
             )
          }
          {
            
             weatherInfo?.current?.condition?.code !== 1000 && isRain &&(
              <CityRainy isNight={!weatherInfo?.current?.is_day}/>
             )
          }
              

          
            

              

         
          
          
        </div>    
  );

  
};

export default WeatherReport;
