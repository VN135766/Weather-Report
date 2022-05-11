var searchCity = $("#search-city");

var APIKey = "3d014f0ba02f805cc57fc93411ce8ee8";

function weatherNow(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
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
