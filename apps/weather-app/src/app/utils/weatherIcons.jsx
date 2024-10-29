// src/utils/weatherIcons.ts
import { RiSunCloudyLine } from "react-icons/ri";
import { CiSun } from "react-icons/ci";
import { LuCloudSunRain, LuCloudRain } from "react-icons/lu";
import { IconType } from "react-icons";

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <CiSun/>;
    case "partly cloudy":
    case "cloudy":
      return <RiSunCloudyLine/>;
    case "rain":
    case "rainy":
    case "showers":
      return <LuCloudRain/>;
    case "sunny cloudy rain":
      return <LuCloudSunRain/>;
    default:
      return <RiSunCloudyLine/>; // Default icon for unspecified conditions
  }
};

export default getWeatherIcon;
