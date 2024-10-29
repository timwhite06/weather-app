'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Sidebar from './components/Sidebar';
import TemperatureSwitcher from './components/DegreeButtons';
import WeatherMetrics from './components/WeatherMetrics';
import TemperatureCard from './components/TempratureCard';
import SunCard from './components/SunCard';
import ForecastCard from './components/ForecastCard';
import convertTemperature from '../app/utils/celsiusOrFarenheit';
import { CiSun } from "react-icons/ci";

interface CurrentWeather {
  temp: string;
  humidity: number;
  windspeed: number;
  conditions: string;
  tempmin: number;
  tempmax: number;
  sunrise: string;
  sunset: string;
}

interface ForecastDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  conditions: string;
  dayLabel: string;
}

export default function Index() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [location, setLocation] = useState("Brighton");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("Brighton"); 


  useEffect(() => {
    fetchCurrentWeather(location);
    fetchForecast(location);
  }, [location]);

  const fetchCurrentWeather = async (location: string) => {
    setErrorMessage(null); // Clear any previous errors
    try {
      const response = await fetch(`/api/currentWeather?location=${location}`);
      const data = await response.json();
      if (response.ok) {
        setCurrentWeather(data.currentWeather);
        setLocationName(data.locationName || location); // Set location name from API or fallback to input
      } else {
        setErrorMessage(data.error || "An error occurred while fetching weather data.");
        setLocationName(location); // Show the search term if error occurs
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching weather data.");
      setLocationName(location);
    }
  };

  const fetchForecast = async (location: string) => {
    setErrorMessage(null);
    try {
      const response = await fetch(`/api/forecast?location=${location}`);
      const data = await response.json();
      if (response.ok) {
        setForecast(data.dailyForecast);
      } else {
        setErrorMessage(data.error || "An error occurred while fetching forecast data.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching forecast data.");
    }
  };

  const handleUnitChange = (unit: string) => {
    setIsFahrenheit(unit === 'F');
  };

  if (!currentWeather || !forecast) return (<div className="flex justify-center items-center h-screen flex-col">
    <div className="loading loading-spinner loading-lg text-white">loading...</div>
    <p className='text-white'>loading...</p>
  </div>);

  return (
    <div className={`${styles.page} bg-[#020921]`}>
      <div className="w-full h-full flex bg-inherit relative bg-[#020921]">
        
        {/* Sidebar */}
        <div className='relative w-0 lg:w-1/3'>
          <Sidebar 
              setLocation={setLocation}
              currentWeather={{
                ...currentWeather,
                temp: convertTemperature(currentWeather.temp, isFahrenheit),
              }}
              locationName={locationName} // Pass location name as a prop
              errorMessage={errorMessage} 
            />
        </div>

        {/* Main Content */}
        <div className="shadow-2xl text-white w-full">
          <div className='flex flex-col min-h-full bg-[#020921] py-8 px-6 lg:px-24'>
            <div className='w-full flex justify-end mb-6'>
              {/* TemperatureSwitcher to toggle Celsius/Fahrenheit */}
              <TemperatureSwitcher onUnitChange={handleUnitChange} />
            </div>

            {/* Day Overview */}
            <div className='grid-rows-1 gap-8'>
              <div>
                <h2 className="mb-4">Day Overview</h2>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div className='col-span-2'>
                    <WeatherMetrics title='Humidity' valueAsPercent={currentWeather.humidity} />
                  </div>
                  <div className='col-span-2'>
                    <WeatherMetrics title='Wind Speed' valueAsPercent={currentWeather.windspeed} />
                  </div>
                  {/* Temperature cards showing max and min temps with selected unit */}
                  <TemperatureCard title='Max temp.' degrees={convertTemperature(currentWeather.tempmax, isFahrenheit)} />
                  <TemperatureCard title='Min temp.' degrees={convertTemperature(currentWeather.tempmin, isFahrenheit)} />
                  <SunCard title='Sunrise' time={currentWeather.sunrise} />
                  <SunCard title='Sunset' time={currentWeather.sunset} />
                </div>
              </div>

              {/* 5 Day Forecast */}
              <div className='mt-8'>
                <h2 className="mb-4">5 Day Forecast</h2>
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                {forecast.map((day, index) => (
                    <ForecastCard
                      key={index}
                      day={day.dayLabel}  // Use dayLabel instead of formatting datetime manually
                      conditions={day.conditions}    // Placeholder for an actual icon based on `day.conditions`
                      maxTemp={convertTemperature(day.tempmax, isFahrenheit)}   // Converted max temp
                      minTemp={convertTemperature(day.tempmin, isFahrenheit)}   // Converted min temp
                      dayState={day.conditions}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
