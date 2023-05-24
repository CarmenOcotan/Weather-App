import React, { useState } from 'react';
import BuscasdorCity from './BuscadorCity';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbTemperatureFahrenheit , TbTemperatureCelsius } from 'react-icons/tb';
import CloudFondo from '../assets/Cloud-background.png'
import { BiCurrentLocation } from 'react-icons/bi';

export const Limpiar = (x)=> {
    let date = new Date(x) ;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
    return formattedDate
}

function DiseñoDays ({currentWeather , setCity , temperaturefromat , setTumperature}) {
    const [showForm ,  setShowForm] = useState(false)
    const  getuserlocation = ()=> {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {setCity(`${position.coords.latitude},${position.coords.longitude}`)});
        }
    }
    return (
        <div className='w-full min-h-screen lg:min-w-[30%] lg:max-w-[30%]  flex flex-col gap-2 lg:mr-auto' >
            <div className='text-white px-4 py-3  flex justify-between   items-center  ' >
                <button className=' bg-gray-400 p-2  cursor-pointer ' onClick={()=> {setShowForm(true) }} >Search for places</button>
                <button className='bg-gray-400 rounded-[50%] p-2 cursor-pointer' onClick={getuserlocation} ><BiCurrentLocation size={24} color='white' /></button>
            </div>
            {
                showForm && <div className='text-white fixed w-full h-screen  bg-slate-900 flex flex-col gap-6 p-4 lg:min-w-[30%] lg:max-w-[30%] '>
                    <AiOutlineClose onClick={()=>{setShowForm(false)}} className=' cursor-pointer ml-auto tbg-white' size={30} />
                    <BuscasdorCity  setCity={setCity} setShowForm ={setShowForm}/> 
                    </div>
            }
            { !showForm &&
                <div className='w-full flex flex-col justify-center items-center md:mt-2'>
                    <img className=' w-[300px] h-[300px] object-contain  invert-[.30] opacity-10 scale-[1.2]' src={CloudFondo} alt="" />
                    <div className=''>
                        {/* status icons */}
                        <div className='flex flex-col  justify-center items-center -mt-[12rem] '>
                            <img className='sm:w-[200px] md:w-[300px] lg:w-[150px]  ' src={`http:${currentWeather.current ? currentWeather.current.condition.icon.replace('64x64' , '128x128') :'' }`} alt="" />
                        </div>
                    </div>
                <div className='flex flex-col text-white  gap-6 items-center lg:gap-4 '>
                    <div className='flex  items-center justify-center ' >
                        <p className='text-white text-[3rem]'>{ currentWeather.current ?  currentWeather.current[`temp_${temperaturefromat}`] : "..." }</p>
                        { temperaturefromat ==='c' ? <TbTemperatureCelsius size={30} color='gray' className=''  /> : <TbTemperatureFahrenheit  size={30} color='gray' className=''/>}
                    </div>

                    <p className='text-center text-[48px] font-semibold text-gray-400 md:text-[28px] '>{currentWeather.current ?  currentWeather.current.condition.text : "..." }</p>

                    <div className='flex items-center justify-center gap-2 md:text-[18px] lg:text-[24px] '>
                        <p>Today  .</p>
                        <p>{currentWeather.location ?  Limpiar(currentWeather.location.localtime ) : "..." }</p>
                    </div>
                    <div className='flex items-center justify-center gap-2 mt-4 mb-4 lg:mt-1 md:text-[30px] lg:text-[20px]'>
                        <FaMapMarkerAlt />
                        <p>{currentWeather.location ?  currentWeather.location.name : "..." }</p>
                    </div>
                </div>
                    <div className='text-white  hidden md:flex md:gap-2 md:mt-3 p-6 '>
                        <button onClick={() => { setTumperature('c') }} className={ temperaturefromat === 'c' ? ' rounded-xl bg-gray-600  p-2' : ' rounded-xl bg-white  p-2' }><TbTemperatureCelsius size={25} color={ temperaturefromat ==='c' ? 'white' :'black' } /></button>
                        <button onClick={() => { setTumperature('f') }} className={ temperaturefromat === 'f' ? ' rounded-xl bg-gray-500  p-2' : ' rounded-xl bg-white p-2' } ><TbTemperatureFahrenheit color={ temperaturefromat ==='f' ? 'white' :'black' }  size={25}/></button>
                    </div>
                </div>
            }
            
        </div>
    )
    }

export default DiseñoDays