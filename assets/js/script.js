var searchField = document.querySelector("#search-field");
var searchButton = document.querySelector("#search-button");
var recentCities = document.querySelector("#recent-cities");
var cityName = document.querySelector("#city-name");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumid = document.querySelector("#current-humid");
var currentUvi = document.querySelector("#current-uvi");
var forecastContainer = document.querySelector("#forecast-container");

const API_KEY = "2bb4ff4af24c07e562a48a0e7543c161";

var city = "";
var weatherData = "";
var searches = [];
var storedSearches;

function apiCall() {
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`,
    method: "GET",
  }).then(function (response1) {
    console.log("response1", response1);
    cityName.textContent = response1.name;
    storeData(response1.name);

    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response1.coord.lat}&lon=${response1.coord.lon}&units=imperial&appid=${API_KEY}`,
      method: "GET",
    }).then(function (response2) {
      console.log("response2", response2);
      weatherData = response2;
      renderWeather();
      renderForecast();
      renderHistory();
    });
  });
}

function renderWeather() {
  currentTemp.textContent = `Temperature: ${weatherData.current.temp} ° F`;
  currentWind.textContent = `Wind Speed: ${weatherData.current.wind_speed} MPH`;
  currentHumid.textContent = `Humidity: ${weatherData.current.humidity} %`;
  currentUvi.textContent = `UV Index: ${weatherData.current.uvi}`;
}

function renderForecast() {
  // Clears current forecast
  forecastContainer.innerHTML = "";

  for (i = 0; i < 5; i++) {
    var forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.setAttribute("style", "background-color:darkblue");
    forecastContainer.appendChild(forecastCard);

    var cardDate = document.createElement("p");
    cardDate.setAttribute("style", "color:white");
    var unixDate = dayjs.unix(weatherData.daily[i].dt);
    cardDate.textContent = unixDate.format("MM/DD/YYYY");

    var cardTemp = document.createElement("p");
    cardTemp.setAttribute("style", "color:white");
    cardTemp.textContent = `Temperature: ${weatherData.daily[i].temp.day} ° F`;

    var cardWind = document.createElement("p");
    cardWind.setAttribute("style", "color:white");
    cardWind.textContent = `Wind Speed: ${weatherData.daily[i].wind_speed} MPH`;

    var cardHumid = document.createElement("p");
    cardHumid.setAttribute("style", "color:white");
    cardHumid.textContent = `Humidity: ${weatherData.daily[i].humidity} %`;

    forecastCard.appendChild(cardDate);
    forecastCard.appendChild(cardTemp);
    forecastCard.appendChild(cardWind);
    forecastCard.appendChild(cardHumid);
  }
}

function storeData(data) {
  console.log("data", data);
  searches.push(data);
  localStorage.setItem("city", JSON.stringify(searches));
  loadData();
}

function loadData() {
  storedSearches = JSON.parse(localStorage.getItem("city"));
}

function renderHistory() {
  recentCities.innerHTML = "";

  if (storedSearches) {
    for (i = 0; i < storedSearches.length; i++) {
      historyButton = document.createElement("button");
      historyButton.textContent = storedSearches[i];
      recentCities.appendChild(historyButton);
    }

    historyButton.addEventListener("click", function (event) {
      event.preventDefault();
      city = historyButton.textContent;
      apiCall();
    });
  }
}

// Initialization function ran on page load
function init() {
  loadData();
  renderHistory();
}

function eventHandler(event) {
  event.preventDefault();

  city = searchField.value;

  apiCall();
}

searchField.addEventListener("submit", eventHandler);
searchButton.addEventListener("click", eventHandler);

init();
