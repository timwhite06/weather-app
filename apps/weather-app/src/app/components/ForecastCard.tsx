import React from 'react';
import { ReactNode } from 'react';
import getWeatherIcon from '../utils/weatherIcons';

interface WeatherMetricsProps {
    day: string;
    conditions: string; // Accepts JSX elements, such as icon components
    dayState: string;
    maxTemp: string;
    minTemp: string;
}

const ForecastCard: React.FC<WeatherMetricsProps> = ({ day, conditions, dayState, maxTemp, minTemp }) => {

  return (
    <div className="flex-1 h-full p-0">
      <div className="card bg-[#030e33] w-full shadow-xl h-full p-0">
        <div className="card-body gap-4 p-3 flex flex-col justify-between h-full text-center">
          <h2 className="card-title w-full flex justify-center">{day}</h2>
          <div className="w-full flex justify-center text-5xl"></div>
          <div className="w-full flex justify-center text-lg text-center">{dayState}</div>
          <div className="w-full flex justify-between text-md gap-2">
            <div className="w-full flex justify-center  font-bold">{maxTemp}°</div>
            <div className="w-full flex justify-center ">{minTemp}°</div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
