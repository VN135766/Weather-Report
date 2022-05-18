var searchCity = $("#search-city");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var city = "";
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");

var APIKey = "3d014f0ba02f805cc57fc93411ce8ee8";

function weatherNow(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        var date = new Date(response.dt * 1000).toLocaleDateString();
        $(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconurl + ">");
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2) + "&#8457");
        $(currentHumidty).html(response.main.humidity + "%");
        var ws = response.wind.speed;
        var windsmph = (ws * 2.237).toFixed(1);
        $(currentWSpeed).html(windsmph + "MPH");
        UVIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        if (response.cod == 200) {
            sCity = JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity == null) {
                sCity = [];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname", JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if (find(city) > 0) {
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }
    })
};

function UVIndex(ln, lt) {
    var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
    $.ajax({
        url: uvqURL,
        method: "GET"
    }).then(function (response) {
        $(currentUvindex).html(response.value);
    });
}

function displayWeatherNow(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        weatherNow(city);
    }
};

$("#search-button").on("click", displayWeatherNow);
