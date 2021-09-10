///////////the dating code
let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = `${cityInput.value}`;
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

//function tempCelc(event) {
//event.preventDefault();
//let currentCelc = document.querySelector("#currentTemperature"); // call back func to first action
//currentCelc.innerHTML = "14";}
//let celcius = document.querySelector("#celcius"); //selecting first action with a click
//celcius.addEventListener("click", tempCelc);

//function tempFahr(event) {
//event.preventDefault();
//let currentFahr = document.querySelector("#currentTemperature");
//currentFahr.innerHTML = "57";}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", tempFahr);

////////// the city searching code
function searchCity(city) {
  let apiKey = "ff4151e1f397ca52bc01c2b445760854";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", handleSubmit);

searchCity("Stockholm");

///////////the weathering code

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
