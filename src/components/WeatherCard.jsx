// WeatherCard shows city weather with background image, unit toggle, refresh button

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

function WeatherCard({ data, onRefresh }) {
  const [unit, setUnit] = useState("metric");
  const toggleUnit = () => setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  const temp = unit === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
  const windSpeed = unit === "metric" ? data.wind.speed : data.wind.speed * 0.621371;
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 relative"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={onRefresh}
          className="p-2 text-blue-600 dark:text-blue-300 hover:rotate-90 transition-transform"
          title="Refresh weather"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={toggleUnit}
          className="p-2 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded"
        >
          {unit === "metric" ? "°C" : "°F"}
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">{data.name}</h2>
      <div className="flex justify-center items-center">
        <img src={iconUrl} alt={data.weather[0].description} className="w-20" />
        <div className="ml-4 text-left">
          <p className="text-2xl font-semibold">{temp.toFixed(1)}°{unit === "metric" ? "C" : "F"}</p>
          <p>{data.weather[0].main}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {windSpeed.toFixed(1)} {unit === "metric" ? "km/h" : "mph"}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;