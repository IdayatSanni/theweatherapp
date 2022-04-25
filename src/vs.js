function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let dates = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${day} ${dates} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let cityElement = document.querySelector("#country-name");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-now");
  let iconElement = document.querySelector("#icons");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function cityInformation(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").value;
  search(cityName);
}

function search(city) {
  let apiKey = `bf14d6c56856845e46caa5161a336f68`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = `bf14d6c56856845e46caa5161a336f68`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentWeatherLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let tempeCity = document.querySelector("#search-form");
tempeCity.addEventListener("submit", cityInformation);

search("Nigeria");

let currentTempLocation = document.querySelector("#current-location");
currentTempLocation.addEventListener("click", currentWeatherLocation);
