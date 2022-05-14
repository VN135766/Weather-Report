var searchCity = $("#search-city");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var city="";

var APIKey = "3d014f0ba02f805cc57fc93411ce8ee8";

function weatherNow(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        var date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
        $(currentHumidty).html(response.main.humidity+"%");
    })
};

function displayWeatherNow(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        weatherNow(city);
    }
};

$("#search-button").on("click", displayWeatherNow);
