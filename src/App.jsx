// import "./App.css";
// import "./index.css";
// import CurrentWeather from "./components/current-weather/current-weather";
// import Search from "./components/search/search";
// import Forecast from "./components/forecast/forecast";
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
// import { useState } from "react";

// export default function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);
//   //3
//   const handleOnSearchChange = (searchData) => {
//     const [lat, lon] = searchData.value.split(" ");

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

//         setCurrentWeather({ city: searchData.label, ...weatherResponse });
//         setForecast({ city: searchData.label, ...forecastResponse });
//       })
//       .catch((err) => console.log(err));
//   };

//   console.log(currentWeather);
//   console.log(forecast);

//   return (
//     <div className="container">
//       <Search onSearchChange={handleOnSearchChange} />
//       {currentWeather && <CurrentWeather data={currentWeather} />}
//       {forecast && <Forecast data={forecast} />}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Default latitude and longitude for your town
  const defaultLat = "40.7128"; // Replace with your town's latitude
  const defaultLon = "-74.0060"; // Replace with your town's longitude

  const fetchWeatherData = (lat, lon, label) => {
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

        setCurrentWeather({ city: label, ...weatherResponse });
        setForecast({ city: label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  // Fetch default location weather data on initial render
  useEffect(() => {
    fetchWeatherData(defaultLat, defaultLon, "Roscommon, MI, USA");
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
