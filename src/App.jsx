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
import sunnyVideo from "./assets/videos/sunny.mp4";
import mistVideo from "./assets/videos/mist.mp4";
import fogVideo from "./assets/videos/fog.mp4";
import drizzleVideo from "./assets/videos/drizzle.mp4";
import thunderstormVideo from "./assets/videos/thunderstorm.mp4";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState(clearSkyVideo); // Default background

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
        // Update background based on weather
        console.log("Weather Condition:", weatherResponse.weather[0].main);
        updateBackground(weatherResponse.weather[0].main);
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  //Function to update background video
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
      case "sunny":
        setBackgroundVideo(sunnyVideo);
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
      default:
        setBackgroundVideo(clearSkyVideo); // Fallback to clear sky video
        break;
    }
  };

  // Set default city weather on page load
  useEffect(() => {
    const defaultCity = {
      label: "Roscommon, US",
      value: "44.4984 -84.5920", // Latitude and Longitude for New York
    };
    handleOnSearchChange(defaultCity);
  }, []);

  return (
    <div className="container">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        key={backgroundVideo}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Search onSearchChange={handleOnSearchChange} />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
  <div className="lg:justify-between gap-4">
    {/* Forecast block */}
    <div className="order-2 lg:order-1 flex-1">
    {currentWeather && (
              <div className="current-weather">
                <CurrentWeather data={currentWeather} /> 

          </div>  )}
          {/* Current Weather block */}
          <div className="order-1 lg:order-2 flex-1">
            
                {forecast && (
              <div className="forecast">
                <Forecast data={forecast} />
              </div>
            )}
              </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}
