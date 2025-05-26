const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "c2a5578949b65ff259b14fd948053451";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    alert("Please enter city Name!");
  }

  const currentData = await getCurrentWeatherByName(cityName);
  console.log(currentData)
};
searchButton.addEventListener("click", searchHandler);
