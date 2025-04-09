// ForecastCard shows next 5 days of weather using small cards

import { motion } from "framer-motion";

function ForecastCard({ forecast }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4"
    >
      {forecast.map((item) => {
        const date = new Date(item.dt * 1000);
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        return (
          <motion.div
            key={item.dt}
            className="bg-white dark:bg-gray-800 p-2 rounded-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm font-semibold">{date.toLocaleDateString([], { weekday: 'short' })}</p>
            <img src={iconUrl} className="mx-auto w-12" alt={item.weather[0].description} />
            <p className="text-sm">{item.main.temp}°C</p>
            <p className="text-xs">{item.weather[0].main}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ForecastCard;
