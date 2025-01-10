// Assuming videos are stored in src/assets/videos
import "./App.css";
import "./index.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState, useEffect } from "react";

// Import your videos
import clearSkyVideo from "./assets/videos/clear-sky.mp4";
import cloudyVideo from "./assets/videos/cloudy.mp4";
import rainVideo from "./assets/videos/rain.mp4";
import snowVideo from "./assets/videos/snow.mp4";
import mistVideo from "./assets/videos/mist.mp4";
import fogVideo from "./assets/videos/fog.mp4";
import drizzleVideo from "./assets/videos/drizzle.mp4";
import hazeVideo from "./assets/videos/haze.mp4";
import smokeVideo from "./assets/videos/smoke.mp4";
import thunderstormVideo from "./assets/videos/thunderstorm.mp4";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState(clearSkyVideo);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        updateBackground(weatherResponse.weather[0].main);
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  const updateBackground = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        setBackgroundVideo(clearSkyVideo);
        break;
      case "clouds":
        setBackgroundVideo(cloudyVideo);
        break;
      case "rain":
        setBackgroundVideo(rainVideo);
        break;
      case "snow":
        setBackgroundVideo(snowVideo);
        break;
      case "thunderstorm":
        setBackgroundVideo(thunderstormVideo);
        break;
      case "mist":
        setBackgroundVideo(mistVideo);
        break;
      case "fog":
        setBackgroundVideo(fogVideo);
        break;
      case "drizzle":
        setBackgroundVideo(drizzleVideo);
        break;
        case "haze":
          setBackgroundVideo(hazeVideo);
          break;
          case "smoke":
          setBackgroundVideo(smokeVideo);
          break;
      default:
        setBackgroundVideo(clearSkyVideo);
        break;
    }
  };

  useEffect(() => {
    const defaultCity = {
      label: "Roscommon, US",
      value: "44.4984 -84.5920",
    };
    handleOnSearchChange(defaultCity);
  }, []);

  return (
    <div>

{/* Navigation Bar */}
<div className="w-full p-4">
        <nav className="border-b border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-semibold text-white mb-6 md:mb-0 ml-9 font-[montserrat]">Weather Application</h1>
          <Search onSearchChange={handleOnSearchChange} />
        </nav>
      </div>

      <video
        className="background-video"
        autoPlay
        loop
        muted
        key={backgroundVideo}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
     {/* <Search onSearchChange={handleOnSearchChange} /> */}
      <main className="w-full h-screen flex flex-col items-center px-8 text-white">
        <section className="w-full max-w-6xl flex flex-col lg:flex-row lg:justify-between gap-8 items-start">
          {/* Current Weather Block */}
          {currentWeather && (
              <div className="mt-10 w-full">
                <CurrentWeather data={currentWeather} />
              </div>
            )}
          {/* Forecast Block */}
          {forecast && (
                <div className="mt-6">
                  <Forecast data={forecast} />
                </div>
              )}
        </section>
      </main>
    </div>
  );
}
