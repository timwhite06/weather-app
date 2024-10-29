import React from 'react';

interface WeatherMetricsProps {
    title: string;
    degrees: number;
}

const TemperatureCard: React.FC<WeatherMetricsProps> = ({ title, degrees }) => {

  return (
    <div>
      <div className="card bg-[#030e33] w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title w-full flex justify-center">{title}</h2>
          <div className="w-full flex justify-center text-xl">{degrees}</div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;
