// src/utils/weatherIcons.ts
import { RiSunCloudyLine, RiThunderstormsFill, RiHailFill, RiFoggyFill, RiWindyFill } from "react-icons/ri";
import { CiSun } from "react-icons/ci";
import { LuCloudSunRain, LuCloudRain, LuSnowflake } from "react-icons/lu";
import { WiDayCloudy, WiCloud, WiDaySunny, WiRain, WiSnow, WiSleet, WiWindy, WiSmoke, WiDust, WiDayHaze, WiHot, WiSnowflakeCold } from "react-icons/wi";
import { IconType } from "react-icons";

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <WiDaySunny />;
    case "partly cloudy":
      return <WiDayCloudy />;
    case "mostly cloudy":
    case "cloudy":
      return <WiCloud />;
    case "overcast":
      return <RiSunCloudyLine />;
    case "rain":
    case "rainy":
      return <WiRain />;
    case "showers":
      return <LuCloudRain />;
    case "thunderstorms":
      return <RiThunderstormsFill />;
    case "snow":
      return <WiSnow />;
    case "flurries":
      return <WiSnowflakeCold />;
    case "sleet":
      return <WiSleet />;
    case "hail":
      return <RiHailFill />;
    case "fog":
      return <RiFoggyFill />;
    case "windy":
      return <WiWindy />;
    case "blowing snow":
      return <RiWindyFill />;
    case "freezing rain":
      return <WiSleet />;
    case "ice pellets":
      return <LuSnowflake />;
    case "dust":
      return <WiDust />;
    case "smoke":
      return <WiSmoke />;
    case "haze":
      return <WiDayHaze />;
    case "mist":
      return <RiFoggyFill />;
    case "hot":
      return <WiHot />;
    case "cold":
      return <WiSnowflakeCold />;
    default:
      return <RiSunCloudyLine />; // Default icon for unspecified conditions
  }
};

export default getWeatherIcon;
