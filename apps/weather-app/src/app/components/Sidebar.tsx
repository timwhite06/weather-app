import { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import getWeatherIcon from '../utils/weatherIcons';

const capitaliseWords = (string: string) => {
    return string
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

interface WeatherProps {
  setLocation: (location: string) => void;
  currentWeather: {
    temp: string;
    humidity: number;
    windspeed: number;
    conditions: string;
  };
  errorMessage: string | null;
  locationName: string;
}

export default function WeatherSection({ setLocation, currentWeather, errorMessage, locationName }: WeatherProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

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

  return (
    <div className="flex flex-col items-center text-white bg-[#09112c] py-10 px-5">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-8 w-full max-w-md">
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

      {/* Display error message if present, otherwise show weather information */}
      {errorMessage ? (
        <div className="text-red-500 text-center text-2xl mt-10">{errorMessage}</div>
      ) : (
        <div className="text-center flex flex-col items-center gap-6 lg:gap-16">
          <h1 className="font-bold text-4xl lg:text-7xl max-w-[200px]">
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
      )}
    </div>
  );
}
