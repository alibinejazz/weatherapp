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
    const api_key = "d07f9e786c5b0c3984d57a8ec5614d94";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searching}&appid=${api_key}`
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
  }, []);

  let tempincelsius = (city.main.temp - 273).toFixed(2);

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
              onChange={(e) => setSearching(e.target.value)}
              className="inputfield"
              style={{ borderRadius: "10px" }}
            />
            <img src={search} alt="search" width="30px" />
          </div>
          <div>
            <h1>{searching}</h1>
            <h1>{tempincelsius}° </h1>
          </div>
          {city.sys.country}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              Wind Speed {city.wind.speed} m/s
              <img src={wind} alt="wind" width="80px" />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              rain <img src={rain} alt="wind" width="80px" />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              dry
              <img src={dry} alt="rain" width="80px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
