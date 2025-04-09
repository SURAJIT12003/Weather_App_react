import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Error from './components/Error';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || []);

  const updateHistory = (cityName) => {
    const newHistory = [cityName, ...history.filter(c => c !== cityName)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const fetchForecast = async (cityName) => {
    const res = await fetch(`${API_FORECAST_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    if (res.ok) {
      const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      setForecastData(daily);
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    setWeatherData(null);
    try {
      const res = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
      const data = await res.json();

      if (res.ok) {
        setWeatherData(data);
        setCity(cityName);
        updateHistory(cityName);
        await fetchForecast(cityName);
      } else {
        setError(data.message || 'City not found.');
        setWeatherData(null);     // ✅ CLEAR previous weather
        setForecastData([]); 
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setWeatherData(null);     // ✅ CLEAR previous weather
      setForecastData([]); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 relative">
      <ThemeToggle />
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">🌦️ Weather Dashboard </h1>
        <SearchBar onSearch={fetchWeather} />
        {history.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold">Recent Searches:</h3>
            <div className="flex flex-wrap gap-2 mt-1 justify-center">
              {history.map(item => (
                <button key={item} onClick={() => fetchWeather(item)} className="bg-gray-300 px-3 py-1 rounded dark:bg-gray-700">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
        {loading && <Loader />}
        {error && <Error message={error} />}
        {weatherData && <WeatherCard data={weatherData} />}
        {forecastData.length > 0 && <ForecastCard forecast={forecastData} />}
      </div>
      <p className="text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-8">
  Made with ❤️ by Ankita Hatui
</p>

    </div>
    
  );
}

export default App;
