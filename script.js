//Variables
var searchHistory = [];
var currentCity = "";
var cityLat = "";
var cityLon = "";
var apiKey = "c453978e4dc09fda7a9d8d6ba43fda70";

//Page elements
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchHistoryEl = document.getElementById("search-history");
var historyList = document.getElementById("history-list");
var todaySection = document.getElementById("today");
var forecastSection = document.getElementById("forecast");

function getSearchHistory() {
    if(localStorage.hasOwnProperty("searchHistory")){
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    }
}

function renderSearchHistory() {
    getSearchHistory();
    while(historyList.firstChild){
        historyList.removeChild(historyList.firstChild);
    }

    for(var i = searchHistory.length-1; i>=0; i--){
        var li = document.createElement("li");
        li.textContent = searchHistory[i];
        historyList.appendChild(li);
    }
}

function addHistory() {
    getSearchHistory();
    if(!searchHistory.includes(currentCity)){
        searchHistory.push(currentCity);
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderSearchHistory();
}

function handleSubmit(event) {
    if(!searchInput.value){
        return;
    }

    event.preventDefault();
    currentCity = searchInput.value;
    addHistory();
    getCityCoords();
}

function getCityCoords() {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=5&appid=${apiKey}`;

    fetch(apiUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        if(!data[0]) {
            alert("City not found");
        } else {
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            getWeather();
        }
    }).catch(function (err) {
        console.error(err);
    });
}

function getWeather() {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        getForecast();
    }).catch(function (err) {
        console.error(err);
    });
}

function getForecast() {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function (err) {
        console.error(err);
    });
}

searchForm.addEventListener('submit', handleSubmit);
renderSearchHistory();