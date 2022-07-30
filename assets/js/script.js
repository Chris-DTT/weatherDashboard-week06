var searchField = document.querySelector("#search-field");
var searchButton = document.querySelector("#search-button");
var recentCities = document.querySelector("#recent-cities");
var cityName = document.querySelector("#city-name");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumid = document.querySelector("#current-humid");
var currentUvi = document.querySelector("#current-uvi");
var forecastContainer = document.querySelector("#forecast-container");

var city = "";
var weatherData = "";

function apiCall() {
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=2bb4ff4af24c07e562a48a0e7543c161`,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    weatherData = response;
    renderWeather();
    renderForecast();
  });
}

function renderWeather() {
  cityName.textContent = weatherData.name;
}

function renderForecast() {
  // Clears current forecast
  forecastContainer.innerHTML = "";

  var forecastCard = document.createElement("div");
  forecastCard.classList.add("forecast-card");
  forecastCard.setAttribute("style", "background-color:darkblue");
  forecastContainer.appendChild(forecastCard);

  var cardDate = document.createElement("p");
  cardDate = document.setAttribute("style", "color:white");
  cardDate.textContent = weatherData.daily;
}

function eventHandler(event) {
  event.preventDefault();

  city = searchField.value;

  apiCall();
}

searchField.addEventListener("submit", eventHandler);
searchButton.addEventListener("click", eventHandler);
