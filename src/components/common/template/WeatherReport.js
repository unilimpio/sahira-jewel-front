import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";
import Clock from 'react-live-clock';

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";
import CityBackground from "./CityBackground";
import CitySunny from "./CitySunny";
import CityNight from "./CityNight";
import CityCloudy from "./CityBackground";
import CityRainy from "./CityRainy";
import CityStorm from "./CityBackground";
import Bokeh from "./BokehScreenSaver";

import UserService from "../../../services/user.service";

//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const WeatherReport = ({className, location = false}) => {

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

  if(location){

    return (
                       
        <div className="fixed bottom-16 right-0  w-1/5  flex flex-col m-2 rounded-lg  bg-neutral-200 bg-opacity-50">
          {
            weatherInfo && (
              <div className={'text-neutral-300 p-2'}>
                <h5 className="text-[10px] font-semibold">Info Local: </h5>
                <p className="text-[10px] text-pretty">
                  <img className="w-14 sm:w-16 float-left" alt={`forecast for today is ${weatherInfo?.current?.condition.text}`} src={weatherInfo?.current?.condition.icon}/>
                  
                  {weatherInfo?.location?.name + ', ' + weatherInfo?.location?.region+', ' + weatherInfo?.location?.country}<br/>
                  
                  
                  <Clock format={'DD/MM/YYYY HH:mm:ss'} ticking={true} timezone={weatherInfo?.location?.tz_id} /><br />
                  
                  {weatherInfo?.current?.temp_c} °C - {weatherInfo.current.is_day ? ('Dia') : ('Noche') }<br/>
                 
                  humedad: {weatherInfo?.current?.humidity}%<br/>
                  <span className="italic text-[9px]">{weatherInfo?.current?.condition.text}</span>
                </p>
                
              </div>
            )
          }
          
          { 
            weatherInfo?.current?.condition?.code === 1000 && weatherInfo?.current?.is_day &&(

              <CitySunny/>

            )
          }
          {
             weatherInfo && weatherInfo?.current?.condition?.code !== 1000 && !weatherInfo?.current?.is_day && !isRain &&(
              <CityNight/>
             )
          }
          {
            
             weatherInfo?.current?.condition?.code !== 1000 && isRain &&(
              <CityRainy isNight={!weatherInfo?.current?.is_day}/>
             )
          }
          {
            
             !weatherInfo  &&(
              <div className="-z-50">    
                <Bokeh />
              </div>
             )
          }
          
          
          
        </div>    
  );

  } else {
    return (
                       
        <div className="fixed bottom-16 right-0  w-1/5  flex flex-col m-2 rounded-lg  bg-neutral-200 bg-opacity-50">
          
          
          
          
          <div className="-z-50">    
            <Bokeh />
          </div>
          
        </div>    
  );
  }
  

  
};

export default WeatherReport;
