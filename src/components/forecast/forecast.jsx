import "./forecast.css";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {data.list?.slice(0, 6).map((item, idx) => (
        <div
          key={idx}
          className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col items-center justify-between bg-slate-200 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-md"
        >
          {/* Day of the week */}
          <p className="text-center font-bold">{forecastDays[idx]}</p>
          <hr className="w-full border-gray-300" />
          {/* Weather icon */}
          <div className="w-full flex justify-center items-center flex-1">
            <img
              src={`icons/${item.weather[0].icon}.png`}
              alt="forecast icon"
              className="w-[4rem] h-[4rem]"
            />
          </div>
          {/* Temperature */}
          <p className="text-center font-bold text-lg">
            {Math.round(item.main.temp)}&deg;C
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
