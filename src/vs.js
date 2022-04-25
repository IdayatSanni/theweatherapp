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

function search(city) {
  let apiKey = `bf14d6c56856845e46caa5161a336f68`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#country-name");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let now = new Date();
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

  let todaysInfo = document.querySelector("#date-now");
  todaysInfo.innerHTML = `${day} ${dates} ${hours}:${minutes}`;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response);
}
function cityInformation(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").value;
  search(cityName);
}

function showTempearature(response) {
  let temperature = Math.round(response.data.main);
  console.log(temperature);
}
function showWeather(response) {
  let city = prompt("Enter your city");
  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    let celsiusTemp = Math.round(temperature);
    let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);
    alert(
      `It is currently ${fahrenheitTemp} in ${city} with a humidity of ${humidity}`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this ${city}, try going to https://www.google.com/search?q=weather+${city}`
    );
  }
}

let tempeCity = document.querySelector("#search-form");
tempeCity.addEventListener("submit", cityInformation);

search("Nigeria");

let currentTempLocation = document.querySelector("#current-location");
currentTempLocation.addEventListener("click", currentWeatherLocation);
