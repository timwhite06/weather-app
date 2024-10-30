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
import { FaArrowRight } from 'react-icons/fa';
import getWeatherIcon from './utils/weatherIcons';

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

const capitaliseWords = (string: string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Index() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [location, setLocation] = useState("Brighton");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("Brighton"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedDate, setFormattedDate] = useState("");


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

  useEffect(() => {
    setFormattedDate(formatCurrentDate());
  }, []);

  const handleSearch = () => {
    setLocation(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const formatCurrentDate = () => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    }).format(new Date());
  };

  if (!currentWeather || !forecast) return (<div className="flex justify-center items-center h-screen flex-col">
    <div className="loading loading-spinner loading-lg text-white">loading...</div>
    <p className='text-white'>loading...</p>
  </div>);

  return (
    <div className={`${styles.page} bg-[#020921]`}>
      <div className="w-full h-full flex bg-inherit relative bg-[#020921]">
        
        {/* Sidebar */}
        {/* <div className='relative w-0 lg:w-1/3'>
          <Sidebar 
              setLocation={setLocation}
              currentWeather={{
                ...currentWeather,
                temp: convertTemperature(currentWeather.temp, isFahrenheit),
              }}
              locationName={locationName} // Pass location name as a prop
              errorMessage={errorMessage} 
            />
        </div> */}

        {/* Main Content */}
        <div className="shadow-2xl text-white w-full">
          <div className='flex flex-col min-h-full bg-[#020921] py-8 px-6 lg:px-0'>
            <div className='w-full flex items-end mb-6 flex-col gap-2 lg:px-12'>
              {/* TemperatureSwitcher to toggle Celsius/Fahrenheit */}
              <TemperatureSwitcher onUnitChange={handleUnitChange} />
              <div className="flex lg:hidden items-center gap-2 mb-8 w-full max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown} // Listen for Enter key press
                  placeholder="Search for a location"
                  className="w-full h-10 text-black bg-white rounded-lg p-2"
                />
                <button onClick={handleSearch} className="bg-white text-black rounded-full p-3">
                  <FaArrowRight />
                </button>
               </div>
            </div>

            <div className='w-full h-screen grid grid-cols-4'>
            <div id="today" className="hidden h-full mt-[-95px] lg:flex lg:flex-col col-span-1 bg-[#0b1638] p-6">
  
              {/* Search Input Section */}
              <div className="flex justify-center items-center gap-5 mb-8 min-w-full max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown} // Listen for Enter key press
                  placeholder="Search for a location"
                  className="w-full h-10 text-black bg-white rounded-lg p-2"
                />
                <button onClick={handleSearch} className="bg-white text-black rounded-full p-3">
                  <FaArrowRight />
                </button>
              </div>

              {/* Centered Content Area */}
              <div className="flex-grow flex items-center justify-center w-full">
                {/* Display error message if present, otherwise show weather information */}
                {errorMessage ? (
                  <div className="text-red-500 text-center text-2xl">{errorMessage}</div>
                ) : (
                  <div className="card w-full max-w-lg shadow-lg p-6 flex flex-col items-center justify-center">
                    <div className="card-body text-center flex flex-col items-center gap-6 lg:gap-10">
                      <h1 className="card-title font-bold text-4xl lg:text-5xl max-w-[200px]">
                        {locationName.length > 30 
                          ? `${capitaliseWords(locationName.slice(0, 30))}...`
                          : capitaliseWords(locationName)}
                      </h1>
                      <h2 className="text-2xl lg:text-4xl">{formattedDate}</h2>
                      <div className="text-9xl lg:text-12xl">
                        {getWeatherIcon(currentWeather.conditions)}
                      </div>
                      <p className="text-5xl lg:text-6xl font-bold">{currentWeather.temp}</p>
                      <h3 className="text-3xl lg:text-4xl">{currentWeather.conditions}</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>

                {/* Day Overview */}
                <div className='col-span-4 lg:col-span-3 lg:px-12'>
                  <div>
                    <h2 className="mb-4">Day Overview</h2>
                    {/* Day's Forecast - dont show on small screens*/}
                    <div id="today" className='flex justify-center lg:hidden'>
                      {/* Display error message if present, otherwise show weather information */}
                      {errorMessage ? (
                        <div className="text-red-500 text-center text-2xl mt-10">{errorMessage}</div>
                      ) : (
                        <div className="card w-full max-w-lg shadow-lg p-6 ">
                          <div className="card-body text-center flex flex-col items-center gap-6 lg:gap-10">
                            <h1 className="card-title font-bold text-4xl lg:text-5xl max-w-[200px]">
                              {locationName.length > 30 
                                ? `${capitaliseWords(locationName.slice(0, 30))}...`
                                : capitaliseWords(locationName)}
                            </h1>

                            <h2 className="text-2xl lg:text-4xl">{formattedDate}</h2>
                            <div className="text-9xl lg:text-12xl">
                              {getWeatherIcon(currentWeather.conditions)}
                            </div>
                            <p className="text-5xl lg:text-6xl font-bold">{currentWeather.temp}</p>
                            <h3 className="text-3xl lg:text-4xl">{currentWeather.conditions}</h3>
                          </div>
                        </div>
                      )}

                    </div>

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
                          day={day.dayLabel}  
                          dayState={day.conditions}    
                          maxTemp={convertTemperature(day.tempmax, isFahrenheit)}   
                          minTemp={convertTemperature(day.tempmin, isFahrenheit)}   
                        />
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
