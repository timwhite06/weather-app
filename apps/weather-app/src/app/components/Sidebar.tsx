import { useState, useEffect } from 'react';
import { FaArrowRight, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiSunCloudyLine } from "react-icons/ri";
import getWeatherIcon from '../utils/weatherIcons';

const capitaliseWords = (string: string) => {
    return string
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

interface SidebarProps {
  setLocation: (location: string) => void;
  currentWeather: {
    temp: string;
    humidity: number;
    windspeed: number;
    conditions: string;
  };
  errorMessage: string | null;
  locationName: string; // New prop for the actual location name
}

export default function Sidebar({ setLocation, currentWeather, errorMessage, locationName }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(formatCurrentDate());
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="z-[10000] bg-[#09112c]">
      <button
        onClick={handleClick}
        className="absolute lg:hidden text-white text-2xl p-3"
      >
        {isOpen ? <IoMdClose /> : <FaBars />}
      </button>

      <div
        className={`fixed z-[10000] bg-inherit top-0 left-0 min-h-screen transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-full`}
      >
        <div className="w-full flex justify-end">
          <button className="btn btn-ghost lg:hidden text-2xl text-white" onClick={handleClick}>
            <IoMdClose />
          </button>
        </div>

        <div className="py-2 px-5 flex flex-col items-center min-h-screen h-full overflow-hidden" style={{ backgroundColor: 'inherit' }}>
          
          <div className="flex items-center gap-2 mb-8 w-full z-[10000]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown} // Listen for Enter key press
              placeholder="Search for a location"
              className="w-64 h-10 text-black bg-white rounded-lg p-2"
            />
            <button onClick={handleSearch} className="bg-white text-black rounded-full p-3">
              <FaArrowRight />
            </button>
          </div>

          {/* Display error message if present, otherwise show weather information */}
          {errorMessage ? (
            <div className="text-red-500 text-center text-2xl mt-10">{errorMessage}</div>
          ) : (
            <div className="h-screen mt-[-60px] text-center w-full break-words flex flex-col justify-center items-center gap-6 lg:gap-16 text-white">
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
      </div>
    </div>
  );
}
