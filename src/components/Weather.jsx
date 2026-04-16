import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import image from "../assets/icons/day.gif";
import WeatherSkeleton from "./WeatherSkeleton";

function Weather() {
  const states = [ { name: "الخرطوم", lat: 15.5007, lon: 32.5599 }, { name: "الجزيرة (ود مدني)", lat: 14.4012, lon: 33.5199 }, { name: "نهر النيل (الدامر)", lat: 17.5989, lon: 33.9721 }, { name: "البحر الأحمر (بورتسودان)", lat: 19.6158, lon: 37.2164 }, { name: "كسلا", lat: 15.45, lon: 36.4 }, { name: "القضارف", lat: 14.0333, lon: 35.3833 }, { name: "سنار (سنجة)", lat: 13.15, lon: 33.9333 }, { name: "النيل الأبيض (ربك)", lat: 13.18, lon: 32.74 }, { name: "النيل الأزرق (الدمازين)", lat: 11.78, lon: 34.37 }, { name: "شمال كردفان (الأبيض)", lat: 13.18, lon: 30.2167 }, { name: "جنوب كردفان (كادقلي)", lat: 11.0167, lon: 29.7167 }, { name: "غرب كردفان (الفولة)", lat: 11.7167, lon: 28.3 }, { name: "شمال دارفور (الفاشر)", lat: 13.63, lon: 25.35 }, { name: "جنوب دارفور (نيالا)", lat: 12.05, lon: 24.8833 }, { name: "غرب دارفور (الجنينة)", lat: 13.45, lon: 22.45 }, { name: "شرق دارفور (الضعين)", lat: 11.46, lon: 26.13 }, { name: "وسط دارفور (زالنجي)", lat: 12.9, lon: 23.47 }, { name: "الشمالية (دنقلا)", lat: 19.1667, lon: 30.4833 }, ];

  const [selectedState, setSelectedState] = useState(states[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (state) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            lat: state.lat,
            lon: state.lon,
            appid: "b56790d882ffa7c87f512418b5194f4f",
            units: "metric",
            lang: "ar",
          },
        }
      );

      const daily = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather({
        city: data.city.name,
        timezone: data.city.timezone,
        current: data.list[0],
        daily,
      });
    } catch (err) {
      setError("فشل إحضار البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(selectedState);
  }, [selectedState]);

  /* ================== BACKGROUND BY WEATHER ================== */
  const backgroundClass = useMemo(() => {
    const desc = weather?.current?.weather?.[0]?.main;

    if (!desc) return "default";

    if (desc === "Clear") return "sunny";
    if (desc === "Clouds") return "cloudy";
    if (desc === "Rain") return "rainy";

    return "default";
  }, [weather]);

 
  /* ================== LOADING ================== */
  if (loading) return <WeatherSkeleton />;
  if (error)
    return (
      <div className="weather-card" style={{ color: "red" }}>
        {error}
      </div>
    );
  if (!weather) return null;

  return (
    <div className={`weather-card ${backgroundClass}`}>

      {/* HEADER */}
      <div className="header">
        <div className="header-left">
          <img src={image} alt="logo" />
          <div>
            <h2>{weather.city}</h2>
            <span>
              GMT {Math.floor(weather.timezone / 3600)}
            </span>
          </div>
        </div>

        <div className="temp">
          <h1>{Math.floor(weather.current.main.temp)}°</h1>
          <p>{weather.current.weather[0].description}</p>
        </div>
      </div>

      {/* SELECT */}
      <select
        value={selectedState.name}
        onChange={(e) => {
          const state = states.find(
            (s) => s.name === e.target.value
          );
          if (state) setSelectedState(state);
        }}
      >
        {states.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>

     
      {/* DETAILS */}
      <div className="state">
        <span>الرياح</span>
        <span>{weather.current.wind.speed} m/s</span>
      </div>

      <div className="state">
        <span>الرطوبة</span>
        <span>{weather.current.main.humidity}%</span>
      </div>

      <div className="state">
        <span>الحرارة</span>
        <span>{weather.current.main.feels_like}°</span>
      </div>

        {/* WEEKLY FORECAST */}
      <div className="weekly">
        {weather.daily.map((day, i) => (
          <div className="day" key={i}>
            <span>
              {new Date(day.dt_txt).toLocaleDateString(
                "ar",
                { weekday: "short" }
              )}
            </span>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt=""
            />

            <span>
              {Math.floor(day.main.temp)}°
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Weather;