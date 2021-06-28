// Gotta make variables for city name, apikey, maybe history storage to begin with
var apiKey ="443c6b8b13b68baef62db4e54611e14a"
var history = JSON.parse(localStorage.getItem("history")) || [];

if (history.length > 0) {
    callWeather(history[history.length -1]);
}
console.log(history);
// After the city name is stored from the search Bar, I'll need to make an API call to get the information based on that city

function callWeather(cityName) {
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&apid=" + apiKey;
    $.ajax({
        url: queryURLCurrent,
        method: "GET",
    })
        .then(function(response){
            var cityHeading = response.name;
            if (history.indexOf(cityName) === -1) {
                history.pushState(cityHeading);
                localStorage.setItem("history", JSON.stringify(history));
            }
            // need to add cityHeading to html and a new var above
        })
}
// I'll need to push that information to my main and mini cards


// Make buttons that make that call

// Save city to local storage


// Make a call for the saved storage
