const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "c2a5578949b65ff259b14fd948053451";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
// showing the current weather of the city
const renderCurrentWeather = (data) => {
  console.log(data);
  const weatherJsx = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
        <img alt="weather icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" />
        <span>${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity: <span>${data.main.humidity}</span></p>
        <p>Wind Speed : <span>${data.wind.speed}</span></p>
    </div>

    `;

  weatherContainer.innerHTML = weatherJsx;
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Please enter city Name!");
  }
  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
};
searchButton.addEventListener("click", searchHandler);
