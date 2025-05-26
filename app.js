import { getWeekDay } from "./utils/customeDate.js";
import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalButton = document.getElementById("modal-button");

// showing the current weather of the city
const renderCurrentWeather = async (data) => {
  if (!data) return;
  weatherContainer.innerHTML = `<span id="loader"></span>`;
  await new Promise((resolve) => setTimeout(resolve, 500));
  const weather = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
        <img alt="weather icon" src="http://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" />
        <span>${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity: <span>${data.main.humidity}</span></p>
        <p>Wind Speed : <span>${data.wind.speed}</span></p>
    </div>
    `;
  weatherContainer.innerHTML = weather;
};

// showing the Forecast weather of the city
//dt.txt = time and date object
const renderForecastWeather = (data) => {
  if (!data) return;
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecast = `
     <div>
      <img alt="weather icon" src="http://openweathermap.org/img/w/${
        i.weather[0].icon
      }.png" />
      <h3>${getWeekDay(i.dt)}</h3>
      <p>${Math.round(i.main.temp)} °C</p>
      <span>${i.weather[0].main}</span>
     </div>
    `;
    forecastContainer.innerHTML += forecast;
  });
};

// city name input
const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("Please enter city Name!");
    return;
  }
  // current weather
  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  // forecast weather
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

// location
const positionCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};
const errorCallback = (error) => {
  showModal(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Your Browser does not support Geolocation!");
  }
};

// loader
const initHandler = async () => {
  const currentData = await getWeatherData("current", "mashhad");
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", "mashhad");
  renderForecastWeather(forecastData);
};

// event listeners
searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
