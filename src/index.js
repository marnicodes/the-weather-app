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

function tempCelc(event) {
  event.preventDefault();
  let currentCelc = document.querySelector("#currentTemperature"); // call back func to first action
  currentCelc.innerHTML = "14";
}
let celcius = document.querySelector("#celcius"); //selecting first action with a click
celcius.addEventListener("click", tempCelc);

function tempFahr(event) {
  event.preventDefault();
  let currentFahr = document.querySelector("#currentTemperature");
  currentFahr.innerHTML = "57";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempFahr);
