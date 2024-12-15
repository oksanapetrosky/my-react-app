// import { useState, useEffect } from "react";
// import "./App.css";
// import "./index.css";
// import CurrentWeather from "./components/current-weather/current-weather";
// import Search from "./components/search/search";
// import Forecast from "./components/forecast/forecast";
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

// export default function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   // Default latitude and longitude for your town
//   const defaultLat = "40.7128"; // Replace with your town's latitude
//   const defaultLon = "-74.0060"; // Replace with your town's longitude

//   const fetchWeatherData = (lat, lon, label) => {
//     const currentWeatherFetch = fetch(
//       `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//     );
//     const forecastFetch = fetch(
//       `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//     );

//     Promise.all([currentWeatherFetch, forecastFetch])
//       .then(async (response) => {
//         const weatherResponse = await response[0].json();
//         const forecastResponse = await response[1].json();

//         setCurrentWeather({ city: label, ...weatherResponse });
//         setForecast({ city: label, ...forecastResponse });
//       })
//       .catch((err) => console.error(err));
//   };

//   // Fetch default location weather data on initial render
//   useEffect(() => {
//     fetchWeatherData(defaultLat, defaultLon, "Roscommon, MI, USA");
//   }, []);

//   const handleOnSearchChange = (searchData) => {
//     const [lat, lon] = searchData.value.split(" ");
//     fetchWeatherData(lat, lon, searchData.label);
//   };

//   return (
//     <div className="container">
//       <Search onSearchChange={handleOnSearchChange} />
//       {currentWeather && <CurrentWeather data={currentWeather} />}
//       {forecast && <Forecast data={forecast} />}
//     </div>
//   );
// }

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
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
