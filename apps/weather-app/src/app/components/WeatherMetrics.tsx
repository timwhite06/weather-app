import React from 'react';

interface WeatherMetricsProps {
    title: string;
    valueAsPercent: number;
}

const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ title, valueAsPercent }) => {
  // Determine the progress class based on the value
  const getProgressClass = () => {
    if (valueAsPercent > 66) return 'progress-success';
    if (valueAsPercent > 33) return 'progress-warning';
    return 'progress-error';
  };

  return (
    <div>
      <div className="card bg-[#030e33] w-full shadow-xl flex-1 h-full">
        <div className="card-body text-center">
          <h2 className="card-title w-full flex justify-center">{title}</h2>
          <div className="w-full flex justify-center text-3xl font-bold">{valueAsPercent}%</div>
          <div className='mt-auto'>
             <div className="w-full flex justify-end">%</div>
            {/* Apply the dynamic progress class */}
            <progress
                className={`progress ${getProgressClass()} w-full`}
                value={valueAsPercent}
                max="100"
            ></progress>
            <div className='flex justify-between'>
                <div>0</div>
                <div>100</div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default WeatherMetrics;
