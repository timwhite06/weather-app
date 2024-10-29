import './global.css';
import { Montserrat } from 'next/font/google';

const font = Montserrat({
  subsets: ['latin'],
  weight: '400'
});

export const metadata = {
  // Base URL for the weather app's domain
  metadataBase: new URL('http://localhost:3000'),

  // Title configuration for default and templated pages
  title: {
    default: 'Weather App - Timothy White',
    template: '%s |  Weather App'
  },

  // General description of the weather app
  description: 'Get real-time weather updates, forecasts, designed to provide accurate and timely weather information for locations worldwide.',

  // Open Graph meta tags for social media previews
  openGraph: {
    type: 'website',
    url: 'http://localhost:3000',
    title: 'Weather App',
    description: 'Stay updated with real-time weather information and forecasts from  Weather App.',
    images: '/images/weather-logo.png', // Ensure this path points to  app logo
    site_name: ' Weather App',
    keywords:
      ' Weather App, weather updates, weather forecasts, real-time weather, local weather, global weather, weather alerts, weather app'
  },

  // Twitter Card metadata for optimized Twitter sharing
  twitter: {
    card: 'summary_large_image',
    title: ' Weather App',
    description: 'Get the latest weather updates and forecasts tailored to  location with  Weather App.',
    images: '/images/weather-logo.png' // Ensure this path points to  app logo
  },

  // Keywords related to the weather app for SEO purposes
  keywords:
    'weather app, real-time weather, local weather, global weather, weather forecasts, weather alerts,  Weather App, live weather updates, accurate weather data, weather prediction'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='bg-[#020921]'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
