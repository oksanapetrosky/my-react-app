import "./current-weather.css";
import { useDate } from "../../Dates/useDate";

const CurrentWeather = ({ data }) => {
  const { date, time } = useDate();

  return (
    <div className="weather p-4">
      <div className="flex justify-around items-center">
        <img
          src={`icons/${data.weather[0].icon}.png`}
          alt="weather"
          className="flex w-1/3 justify-center items-center gap-2 mt-4 mb-4"
        />
        <p className="ftext-8xl font-bold text-white temperature">
          {Math.round(data.main.temp)}&deg;
        </p>
      </div>
      <div>
        <p className="text-white city">{data.city}</p>
        <div className="w-full flex justify-around items-center mt-4 text-white">
          <p className="text-xl font-semibold">{date}</p>
          <p className="text-xl font-semibold">{time}</p>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-4 gap-4 text-white">
        <div className="flex-1 text-center p-4 mt-2 font-bold bg-[#006BFF] opacity-1 shadow rounded-lg ">
          <span>Wind Speed</span>
          <span className="block font-normal">{data.wind.speed} mph</span>
        </div>
        <div className="flex-1 text-center p-4 mt-2 font-bold bg-[#006BFF] rounded-lg">
          <span>Humidity</span>
          <span className="block font-normal">{data.main.humidity}%</span>
        </div>
      </div>
      <hr className="mt-6 bg-slate-300 max-w-3xl shadow-lg" />
      <p className="w-full p-4 flex justify-center items-center text-3xl font-semibold text-white">
        {data.weather[0].description}
      </p>
    </div>
  );
};

export default CurrentWeather;
