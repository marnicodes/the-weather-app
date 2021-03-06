///////////the dating code
let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

/////////// the forecast code
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`; ///to store the HTML of forecast

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      //loops through collection, and uses next item from collection each time
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
         <img
           src="https://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
           alt=""
           width="40"
         />
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temp-max">${Math.round(
             forecastDay.temp.max
           )}°</span>|
           <span class="weather-forecast-temp-min">${Math.round(
             forecastDay.temp.min
           )}°</span>
         </div>
       </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`; //closing the row element
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `ff4151e1f397ca52bc01c2b445760854`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

/////////// the city searching code

function searchCity(city) {
  let apiKey = "ff4151e1f397ca52bc01c2b445760854";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);

  city.value = ""; //to remove input after search submit
}
let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", handleSubmit);

///////////the weathering code
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  document ///to change an attribute.. read more
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `575c34ae9e568091893014cdffd7e002`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  https: axios.get(apiUrl).then(displayWeather);
}

function handleGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let geolocationButton = document.querySelector("#geo-button");
geolocationButton.addEventListener("click", handleGeolocation);

////// the unit conversion code

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null; //to keep track of the metric unit of temp

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Stockholm");
