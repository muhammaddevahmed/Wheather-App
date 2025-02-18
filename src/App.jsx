import { useState } from "react";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    const apiKey = "394e0ab786dcda0e45c43291891f5744";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="weather-container">
      <div className="content-wrapper">
        <h1 className="app-title">Weather Sphere 🌍</h1>

        <div className="search-container">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
              className="search-input"
            />
            <button onClick={fetchWeather} className="search-button">
              Search 🔍
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {weather && (
          <div className="weather-card animated-entrance">
            <div className="weather-header">
              <h2 className="location">
                {weather.name}, {weather.sys?.country}
                <span className="flag">🇺🇳</span>
              </h2>
              <p className="current-time">{new Date().toLocaleTimeString()}</p>
            </div>

            <div className="weather-main">
              <div className="temperature-section">
                <h3 className="temperature">
                  {Math.round(weather.main?.temp)}°C
                </h3>
                <p className="feels-like">
                  Feels like {Math.round(weather.main?.feels_like)}°C
                </p>
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@4x.png`}
                alt="weather icon"
                className="weather-icon floating"
              />
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span>💨 Wind</span>
                <span>{weather.wind?.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span>💧 Humidity</span>
                <span>{weather.main?.humidity}%</span>
              </div>
              <div className="detail-item">
                <span>🌡 Pressure</span>
                <span>{weather.main?.pressure} hPa</span>
              </div>
            </div>

            <p className="weather-description">
              {weather.weather[0]?.description}
            </p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>Made by Muhammad Ahmed</p>
        <p>&copy; {new Date().getFullYear()} Weather Sphere . All Rights Reserved.</p>
        <p>Contact: m.ahmed.uh72@gmail.com</p>
      </footer>
    </div>
  );
};

export default WeatherApp;
