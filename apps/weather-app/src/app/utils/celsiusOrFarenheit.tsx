function convertTemperature(temperatureC: number, toFahrenheit: boolean): number {
    return toFahrenheit ? (temperatureC * 9) / 5 + 32 : temperatureC;
  }
  
  export default convertTemperature;