import styles from './page.module.css';
import Sidebar from './components/Sidebar';
import TemperatureSwitcher from './components/DegreeButtons';
import WeatherMetrics from './components/WeatherMetrics';
import TemperatureCard from './components/TempratureCard';
import SunCard from './components/SunCard';
import ForecastCard from './components/ForecastCard';
import { LuCloudSunRain, LuCloudRain } from "react-icons/lu";
import { CiSun } from "react-icons/ci";

export default function Index() {
  return (
    <div className={`${styles.page} bg-[#020921]`}>
      <div className="w-full h-full flex bg-inherit relative bg-[#020921]">
        
        {/* Sidebar */}

        <div className='relative'><Sidebar /></div>

        {/* Main Content */}
        <div className="shadow-2xl text-white w-full">
          <div className='flex flex-col min-h-full bg-[#020921] py-8 px-6 lg:px-24'>
            <div className='w-full flex justify-end mb-6'>
              <TemperatureSwitcher />
            </div>

            <div className=' grid-rows-1 gap-8'>
              
              <div>
                <h2 className=" mb-4">Day Overview</h2>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div className='col-span-2'>
                  <WeatherMetrics title='Humidity' valueAsPercent={76} /></div>
                  <div className='col-span-2'>
                  <WeatherMetrics title='Wind Speed' valueAsPercent={66} /></div>
                  <TemperatureCard title='Max temp.' degrees={10}/>
                  <TemperatureCard title='Min temp.' degrees={22}/>
                  <SunCard title='Sunrise' time='06:00'/>
                  <SunCard title='Sunset' time='18:00'/>
                </div>
              </div>

              <div className='mt:0 md:mt-8 bg-[#]'>
                <h2 className=" mb-4">5 Day Forecast</h2>
                <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
                  <ForecastCard day='Monday' icon={<LuCloudSunRain />} maxTemp={10} minTemp={5} dayState='Partly Cloudy'/>
                  <ForecastCard day='Tuesday' icon={<CiSun />} maxTemp={12} minTemp={6} dayState='Sunny'/>
                  <ForecastCard day='Wednesday' icon={<LuCloudRain />} maxTemp={8} minTemp={4} dayState='Rainy Cloudy'/>
                  <ForecastCard day='Thursday' icon={<LuCloudSunRain />} maxTemp={10} minTemp={5} dayState='Sunny cloudy rain'/>
                  <ForecastCard day='Friday' icon={<CiSun />} maxTemp={12} minTemp={6} dayState='Sunny'/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
