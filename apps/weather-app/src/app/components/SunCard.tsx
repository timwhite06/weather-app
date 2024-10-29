import React from 'react';

interface WeatherMetricsProps {
    title: string;
    time: string;
}

const SunCard: React.FC<WeatherMetricsProps> = ({ title, time }) => {

  return (
    <div className='flex-1 h-full '>
      <div className="card bg-[#030e33] w-full shadow-xl flex-1 h-full  ">
        <div className="card-body">
          <h2 className="card-title w-full flex justify-center">{title}</h2>
          <div className="w-full flex justify-center text-3xl font-bold mt-auto">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default SunCard;
