var citySearched = $('.citySearched');
var searchButton = $('.searchButton');
var searchForm = $('.searchForm');

var recentSearches = $('.recentSearches');

var currentCity = $('.currentCity');
var currentDate = $('.currentDate');
var weatherIcon = $('.weatherIcon');
var tempText = $('.tempText');
var humidityText = $('.humidityText');
var windSpeedText = $('.windSpeedText');
var uvIndexText = $('.uvIndexText');

var forecastDate1 = $('.forecastDate1');
var forecastIcon = $('.forecastIcon');
var forecastTemp = $('.forecastTemp');
var forecastHumidity = $('.forecastHumidity');

var day1 = $('.day-1');
var day2 = $('.day-2');
var day3 = $('.day-3');
var day4 = $('.day-4');
var day5 = $('.day-5');

var pastCities = [];

renderPastCities();

// console.log(pastCities);

function handleSearchInput(event) {
   if (!citySearched.val()) {
       alert("Please Enter A City Name");  

   } else {
       
    //    console.log(citySearched.val());
       pastCities.push(citySearched.val());
    //    console.log(pastCities);
       localStorage.setItem("City", JSON.stringify(pastCities));

       var listItem = document.createElement("button");
        listItem.setAttribute("class", "cities");
        listItem.textContent = citySearched.val();
        recentSearches.append(listItem);

   }

};


function renderPastCities() {

    var prevSearch = JSON.parse(localStorage.getItem("City"));
    
    if (prevSearch) {
        pastCities = prevSearch;
        // console.log(pastCities);
    } else {
        
    };
};



searchButton.on("click", function(event) {
    handleSearchInput();
    searchAPI();
});



// ######################## Shows List of Previous Cities Searched on Page Load ########################### 
function repopulateList() {
    for (i = 0; i < pastCities.length; i++) {

        var listItem = document.createElement("button");
        listItem.setAttribute("class", "cities")
        listItem.textContent = pastCities[i];
        // console.log(listItem);
        recentSearches.append(listItem);
    }
}
repopulateList();


// var cityVal = citySearched.val();


function searchAPI() {

    var APIkey = '8f8c2546cebab0c1b04d441c650feb01';
    var cityVal = citySearched.val();
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityVal + '&units=imperial' + '&appid=' + APIkey;

    fetch(locQueryUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

        console.log(data.list[0].wind.speed);
        
        currentCity.text(data.city.name);
        currentDate.text(data.list[0].dt_txt);
        weatherIcon.text(data.list[0].weather[0].icon);
        tempText.text(data.list[0].main.temp + "°F");
        humidityText.text(data.list[0].main.humidity + "%");
        windSpeedText.text(data.list[0].wind.speed + " MPH");
        // uvIndexText.text();


        // ################ Forecast Days ####################
        day1.children()[0].textContent = data.list[4].dt_txt
        day1.children()[1].textContent = data.list[4].weather[0].icon
        day1.children()[2].textContent = data.list[4].main.temp + "°F"
        day1.children()[3].textContent = data.list[4].main.humidity + "%"

        day2.children()[0].textContent = data.list[12].dt_txt
        day2.children()[1].textContent = data.list[12].weather[0].icon
        day2.children()[2].textContent = data.list[12].main.temp + "°F"
        day2.children()[3].textContent = data.list[12].main.humidity + "%"

        day3.children()[0].textContent = data.list[20].dt_txt
        day3.children()[1].textContent = data.list[20].weather[0].icon
        day3.children()[2].textContent = data.list[20].main.temp + "°F"
        day3.children()[3].textContent = data.list[20].main.humidity + "%"

        day4.children()[0].textContent = data.list[28].dt_txt
        day4.children()[1].textContent = data.list[28].weather[0].icon
        day4.children()[2].textContent = data.list[28].main.temp + "°F"
        day4.children()[3].textContent = data.list[28].main.humidity + "%"

        day5.children()[0].textContent = data.list[36].dt_txt
        day5.children()[1].textContent = data.list[36].weather[0].icon
        day5.children()[2].textContent = data.list[36].main.temp + "°F"
        day5.children()[3].textContent = data.list[36].main.humidity + "%"

        



        
      })

      
 
    // .then(data => console.log(data.list[1])); Works
    // .then(data => console.log(data.list[1])); 
    // .then(data => console.log(data.list[1].weather[0].icon)); Works

    
}


// forecastDate.text("Hello");
// day1.children()[0].textContent = "Goodbye"


// ########### AutoComplete Widget #####################
$(function () {
    $('.citySearched').autocomplete({
      source: pastCities,
    });
  });


