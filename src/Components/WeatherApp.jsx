import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search from "./search.png";
import dry from "./dry.png";
import rain from "./rain.png";
import wind from "./wind.png";

const WeatherApp = () => {
  const [city, setCity] = useState({});
  const [searching, setSearching] = useState("Karachi");

  const fetchUserData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searching}&appid=d07f9e786c5b0c3984d57a8ec5614d94`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCity(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [searching]);

  let tempincelsius = (city.main?.temp - 273.15).toFixed(2);

  const currenttime = new Date();
  const time = currenttime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });

  return (
    <div className="main">
      <div className="center-container">
        <div className="weath">
          <div
            className="inputData"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <input
              type="search"
              placeholder="Enter city or country name"
              onChange={(e) => setSearching(e.target.value)}
              className="inputfield"
              style={{ borderRadius: "10px" }}
            />
            <img src={search} alt="search" width="30px" />
          </div>
          <div>
            <h1 style={{fontWeight:"1000"}}>{city?.name}</h1>
            <h1>{tempincelsius}° </h1>
            <h1>{time} GMT</h1>
          </div>
          {city.sys?.country}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection:"column",
              alignItems:"center",
              gap:"10px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:"center",
                alignItems: "center",
                flexWrap:"wrap",
              }}
            >
              Wind Speed {city.wind?.speed} m/s
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/739/171/original/3d-rendering-wind-illustration-isolated-png.png"
                alt="wind"
                width="80px"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent:"center",
                alignItems: "center",
              }}
            >
              Clouds {city.clouds?.all} %{" "}
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/198/212/original/3d-cloud-white-3d-weather-element-png.png"
                alt="wind"
                width="100px"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent:"center",
                alignItems: "center",
              }}
            >
              Humidity {city.main?.humidity} %
              <img
                src="https://static.vecteezy.com/system/resources/previews/024/984/177/original/3d-weather-forecast-icon-raindrops-air-humidity-percentage-3d-illustration-png.png"
                alt="rain"
                width="130px"
              />
            </div>
            
          </div>
          {city && city.weather && city.weather.length > 0 && (
              <h2>{city.weather[0].description} today !</h2>
            )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
