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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = `bf14d6c56856845e46caa5161a336f68`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function displayWeatherInfo(response) {
  let forecastDis = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDis.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
         <div>
         ${formatDay(forecastday.dt)}
         </div>
          <div><img src="http://openweathermap.org/img/wn/${
            forecastday.weather[0].icon
          }@2x.png" alt="clear" width="20px"></img></div>
          <div class="weather-forecast-temperature">
          <span class="weather-forecast-max">${Math.round(
            forecastday.temp.max
          )}° </span>
          <span class="weather-forecast-min">${Math.round(
            forecastday.temp.min
          )}°</span>
         </div>`;

      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
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
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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
function displayFarenTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperatureDisplay.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusTemperatureDisplay.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let tempeCity = document.querySelector("#search-form");
tempeCity.addEventListener("submit", cityInformation);

search("Nigeria");
