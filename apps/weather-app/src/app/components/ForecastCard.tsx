import React from 'react';
import { ReactNode } from 'react';

interface WeatherMetricsProps {
    day: string;
    icon: ReactNode; // Accepts JSX elements, such as icon components
    dayState: string;
    maxTemp: number;
    minTemp: number;
}

const ForecastCard: React.FC<WeatherMetricsProps> = ({ day, icon, dayState, maxTemp, minTemp }) => {

  return (
    <div className="flex-1 h-full">
      <div className="card bg-[#030e33] w-full shadow-xl h-full">
        <div className="card-body gap-4 flex flex-col justify-between h-full text-center">
          <h2 className="card-title w-full flex justify-center">{day}</h2>
          <div className="w-full flex justify-center text-5xl">{icon}</div>
          <div className="w-full flex justify-center text-lg text-center">{dayState}</div>
          <div className="w-full flex justify-between">
            <div className="w-full flex justify-center text-lg">{maxTemp}°</div>
            <div className="w-full flex justify-center text-lg">{minTemp}°</div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
