import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');
  const apiKey = process.env.WEATHER_API_KEY;

  if (!location) {
    return NextResponse.json({ error: 'Please provide a location' }, { status: 400 });
  }

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=${apiKey}&include=days,current`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 400) {
        return NextResponse.json({ error: 'Location not found. Please try another search.' }, { status: 400 });
      }
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const currentWeather = data.currentConditions;
    const todayData = data.days[0];

    // Format sunrise and sunset times to exclude seconds
    const formatTime = (time: string) => {
      const [hour, minute] = time.split(':');
      return `${hour}:${minute}`;
    };

    const sunrise = formatTime(todayData.sunrise);
    const sunset = formatTime(todayData.sunset);

    return NextResponse.json({
      currentWeather: {
        ...currentWeather,
        tempmin: todayData.tempmin,
        tempmax: todayData.tempmax,
        sunrise: sunrise,
        sunset: sunset,
      }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
