import React, { useEffect, useState, useCallback } from 'react';
import DiseñoDays from './DiseñoDay' ;
import Hightlights from './DatosExtra'; 
import NextDays from './OtherDays'; 

function ExportApi() {
    const API_KEY = process.env.REACT_APP_API_KEY
    const [currentWeather  , setCurrentWeather] = useState({})
    const [nextdays  , setNextdays] = useState([])
    const [city ,  setCity] = useState('10001')
    const [temperaturefromat , setTumperature] = useState('c') 


    const getCurrentWeather  = useCallback(async (city) => {
        
    const  url  = 'https://api.weatherapi.com/v1/current.json?key='+API_KEY+'&q='+city

        try{
            const response = await fetch(url)
            const data = await response.json()
            setCurrentWeather(data)
        }catch{
            console.log('there is  a  problem  fetching  data ')
        }
    },[API_KEY]);
    
    const futureWeather =  useCallback(async () => {
        const url = 'https://api.weatherapi.com/v1/forecast.json?key='+API_KEY+'&q='+city+'&days=3&aqi=no&alerts=no'
        try{
            const  response = await fetch(url) ;
            const data  = await response.json() ;
            setNextdays(data.forecast.forecastday)
            
        }catch{
            console.log('there is a  problem with  api ')
        }
    },[API_KEY, city]);

    useEffect(() => {
        getCurrentWeather(city);
        futureWeather();
    }, [city, getCurrentWeather, futureWeather]);

    return (
        <div className="App w-[100%]  mx-auto  bg-[#1E213A] ">
            <div className='flex  flex-col lg:flex-row max-h-full '>
                < DiseñoDays currentWeather = {currentWeather} setCity={setCity} temperaturefromat = {temperaturefromat} setTumperature  = {setTumperature}/>
                <div className='flex flex-col min-w-[70%] max-h-full bg-[#100E1D] '>
                    <NextDays nextdays = {nextdays} temperaturefromat = {temperaturefromat} />
                    <Hightlights currentWeather = {currentWeather}  />
                </div>
            </div>
        </div>
    );
    }

export default ExportApi