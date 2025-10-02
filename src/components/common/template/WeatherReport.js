import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "../../../App.css";
import CityBackground from "./CityBackground";
import CitySunny from "./CitySunny";
import CityNight from "./CityBackground";
import CityCloudy from "./CityBackground";
import CityRainy from "./CityBackground";
import CityStorm from "./CityBackground";

import UserService from "../../../services/user.service";

//import AuthVerify from "./common/AuthVerify";
//import EventBus from "./common/EventBus";

const WeatherReport = ({className, location}) => {

  const [weatherInfo,setWeatherInfo] = useState(false);
  const [error,setError] = useState(false);
  const [message,setMessage] = useState(false);
  
  useEffect(() => {

    const fetchWeather = async () =>{

      const response = await UserService.getWeatherInfo(location).then(

        (response)=>{

          console.log(response?.data)
          setWeatherInfo(response?.data)
          //setMessage(response?.message)

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
                       
        <div className="fixed top-0 right-0  text-[8px] text-right w-1/4 sm:w-1/6 flex flex-col m-2 rounded-lg border border-slate-400">
          {
            weatherInfo ? (
              <>
                <span>{weatherInfo?.location?.name + ', ' + weatherInfo?.location?.region+', ' + weatherInfo?.location?.country}</span>
                
                <p className="m-0 p-0"><strong>Temp. Actual: </strong>{weatherInfo?.current?.temp_c} °C - {weatherInfo.current.is_day ? <>Dia</> : <>Noche</> }</p>
                <p className="m-0 p-0"><strong>Clima Hoy: </strong>
                  <img className="w-5 float-right" alt={`forecast for today is ${weatherInfo?.current?.condition.text}`} src={weatherInfo?.current?.condition.icon}/>
                  
                </p>
                <p className=""><strong>Humedad: </strong>{weatherInfo?.current?.humidity}</p>
                
                
              </>
            ):(

              
              <span className="bg-red-300 border-red-500 h-4 w-fit">
                No se pudo cargar la informacion de clima;
              </span>

            

            )
          }
          
          { 
            weatherInfo?.current?.condition?.code === 1000 && !weatherInfo.location.isDay ?(

              <CitySunny/>

            ): (

              <CityBackground/>

            )

          }
          
            

              

         
          
          
        </div>    
  );

  
};

export default WeatherReport;
