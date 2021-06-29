// Gotta make variables for city name, apiKey, maybe history storage to begin with
var apiKey ="443c6b8b13b68baef62db4e54611e14a";
// var apiKey="a9331833ce30bbd78e72624d69688c14"; 
// had to create a new testing apiKey b/c initial one was giving 401 error...

var history = JSON.parse(localStorage.getItem("history")) || [];

if (history.length > 0) {
    callWeather(history[history.length -1]);
}

// After the city name is stored from the search Bar, I'll need to make an API call to get the information based on that city

function callWeather(cityName) {
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
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
            
            

            
          renderButtons();
          //This will display the city name and locale date.
          $(".currentCityName").text(response.name + " " + moment().format("l"));
          var weatherPic = response.weather[0].icon;
          var iconURL = "https://openweathermap.org/img/w/" + weatherPic + ".png";
          // This will display the weather icon thing
          $("#icon").attr("src", iconURL);
          // This will display the temperature.
          $("#temp").text("Temperature: " + response.main.temp + " °F");
          //This will display the humidity
          $("#humidity").text("Humidity: " + response.main.humidity + "%");
          //This will display the windspeed
          $("#windSpeed").text("Windspeed: " + response.wind.speed + " MPH");
            // Do not see the call for UV yet, need to research it...
            
            var queryURL_UV =
            "https://api.openweathermap.org/data/2.5/uvi?appid=" +
            apiKey +
            "&lat=" +
            response.coord.lat +
            "&lon=" +
            response.coord.lon;
          $.ajax({
            url: queryURL_UV,
            method: "GET",
          }).then(function (response2) {
            
            console.log(response2);
            $("#uvIndex").text("UV Index: " + response2.value);
            

            var queryURLForecast =
              "https://api.openweathermap.org/data/2.5/forecast?q=" +
              cityName +
              "&units=imperial&appid=" +
              apiKey;
            $.ajax({
              url: queryURLForecast,
              method: "GET",
            }).then(function (response3) {
              console.log(response3);

                 // adds 1-5 number of days to the current to get the days we want and formats it as m/dd/yyyy
              $("#day1").text(moment().add(1, "days").format("l"));
              $("#day2").text(moment().add(2, "days").format("l"));
              $("#day3").text(moment().add(3, "days").format("l"));
              $("#day4").text(moment().add(4, "days").format("l"));
              $("#day5").text(moment().add(5, "days").format("l"));
                //changing icons on the mini-cards
              var icon1 = response3.list[0].weather[0].icon;
              var cityIconUrl1 =
                "https://openweathermap.org/img/w/" + icon1 + ".png";
              $("#icon1").attr("src", cityIconUrl1);
              var icon2 = response3.list[1].weather[0].icon;
              var cityIconUrl2 =
                "https://openweathermap.org/img/w/" + icon2 + ".png";
              $("#icon2").attr("src", cityIconUrl2);
              var icon3 = response3.list[2].weather[0].icon;
              var cityIconUrl3 =
                "https://openweathermap.org/img/w/" + icon3 + ".png";
              $("#icon3").attr("src", cityIconUrl3);
              var icon4 = response3.list[3].weather[0].icon;
              var cityIconUrl4 =
                "https://openweathermap.org/img/w/" + icon4 + ".png";
              $("#icon4").attr("src", cityIconUrl4);
              var icon5 = response3.list[4].weather[0].icon;
              var cityIconUrl5 =
                "https://openweathermap.org/img/w/" + icon5 + ".png";
              $("#icon5").attr("src", cityIconUrl5);
                //Changing temperatures on the mini cards
              $("#temp1").text("Temp: " + response3.list[0].main.temp + " °F");
              $("#temp2").text("Temp: " + response3.list[1].main.temp + " °F");
              $("#temp3").text("Temp: " + response3.list[2].main.temp + " °F");
              $("#temp4").text("Temp: " + response3.list[3].main.temp + " °F");
              $("#temp5").text("Temp: " + response3.list[4].main.temp + " °F");
                //Changing humidity on the mini cards
              $("#humidity1").text(
                "Humidity: " + response3.list[0].main.humidity + "%"
              );
              $("#humidity2").text(
                "Humidity: " + response3.list[1].main.humidity + "%"
              );
              $("#humidity3").text(
                "Humidity: " + response3.list[2].main.humidity + "%"
              );
              $("#humidity4").text(
                "Humidity: " + response3.list[3].main.humidity + "%"
              );
              $("#humidity5").text(
                "Humidity: " + response3.list[4].main.humidity + "%"
              );
  
              //Save the latest city to local storage
              var cityName = $("#city-name").val();
              console.log(cityName);
              localStorage.setItem("city", cityName);
            });
          });

        })
}

// this makes the buttons in the search history when called
function renderButtons() {
    $(".list-group").empty();
    for (var i = 0; i < history.length; i++) {
      $(".list-group").prepend(
        " <li class='list-group-item'>" + history[i] + "</li>"
      );
    }
  }
// this submits the form or tests if buttons were pressed and runs the above functions
  function handleSubmit(event) {
    event.preventDefault();
    var cityName = $("#city-name").val().trim();

    callWeather(cityName);
  }

  $("#add-city").on("click", handleSubmit);
  $(".list-group").on("click", ".list-group-item", function () {
    callWeather($(this).text());
  });
