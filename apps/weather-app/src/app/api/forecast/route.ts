import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');
  const apiKey = process.env.WEATHER_API_KEY;

  if (!location) {
    return NextResponse.json({ error: 'Please provide a location' }, { status: 400 });
  }

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&include=days`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 400) {
        return NextResponse.json({ error: 'Location not found. Please try another search.' }, { status: 400 });
      }
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const dailyForecast = data.days
      .filter((day: any) => day.datetime !== todayStr)
      .slice(0, 5)
      .map((day: any) => ({
        ...day,
        dayLabel: day.datetime === tomorrowStr ? "Tomorrow" : new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long' })
      }));

    return NextResponse.json({ dailyForecast }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
