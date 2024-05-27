import logo from "./logo.svg";
import "./App.css";
import React, { useState, ChangeEvent } from "react";

function App() {
  /*
  WeatherData interface object with 3 attributes, temperature
  description and name for getting a weather object.
  */
  interface WeatherData {
    temperature: number;
    description: string;
    name: string;
  }

  /*Zipcode state which keeps track of the 5 digit zip code */
  const [zipCode, setZipCode] = useState("");

  /*
  useState hook
  <WeatherData | null> specifies the type of the state variable 
  useState variable weather can hold type of WeatherData, an object,
  or null
  */
  const [weather, setWeather] = useState<WeatherData | null> (null);

  /* Fetches weather data  */
  const fetchWeather = async () => {
    /* Checks if a value input was entered aka not an empty string*/
    if (zipCode === "") {
      alert("No zipcode was entered, please enter a zipcode");
    }
    try {
      const response = await fetch(`http://localhost:3100/weather/${zipCode}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  /*Update the following zipcode on keyboard input */
  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter your Zip code"
          onChange={handleZipCodeChange}
          value={zipCode}
        ></input>
        <button onClick={fetchWeather}>Get Weather</button>
        <div>
          {weather && (
            <div>
              <p>Temperature: {weather.temperature}</p>
              <p>Description: {weather.description}</p>
              <p>City: {weather.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
