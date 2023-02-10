//Variables
var searchHistory = [];
var currentCity = "";
var cityLat = "";
var cityLon = "";
var apiKey = "c453978e4dc09fda7a9d8d6ba43fda70";

//Page elements
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchHistory = document.getElementById("search-history");
var todaySection = document.getElementById("today");
var forecastSection = document.getElementById("forecast");

function handleSubmit(event) {
    if(!searchInput.value){
        return;
    }

    event.preventDefault();
    currentCity = searchInput.value;
    console.log(currentCity);
    getCityCoords();
    getWeather();
}

function getCityCoords() {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=5&appid=${apiKey}`;

    fetch(apiUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        if(data[0]) {
            alert("City not found");
        } else {
            cityLat = data[0].lat;
            cityLon = data[0].lon;
        }
    }).catch(function (err) {
        console.error(err);
    });
}

function getWeather() {
    var apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`

    fetch(apiUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function (err) {
        console.error(err);
    });
}

searchForm.addEventListener('submit', handleSubmit);