function convertTemperature(temperatureC, toFahrenheit) {
  const convertedTemp = toFahrenheit ? (temperatureC * 9) / 5 + 32 : temperatureC;
  const roundedTemp = convertedTemp.toFixed(1); // Round to 1 decimal place
  const unit = toFahrenheit ? "°F" : "°C";
  return `${roundedTemp}${unit}`;
}

export default convertTemperature;
