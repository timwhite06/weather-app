import React from 'react';

interface WeatherMetricsProps {
    title: string;
    time: string;
}

const SunCard: React.FC<WeatherMetricsProps> = ({ title, time }) => {

  return (
    <div>
      <div className="card bg-[#030e33] w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title w-full flex justify-center">{title}</h2>
          <div className="w-full flex justify-center text-xl">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default SunCard;
