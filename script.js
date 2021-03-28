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
var unIndexText = $('.uvIndexText');

var forecastDate = $('.forecastDate');
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
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityVal + '&appid=' + APIkey;

    fetch(locQueryUrl)
    .then(response => response.json())

    .then(data => console.log(data)); 
    // .then(data => console.log(data.list[1])); Works
    // .then(data => console.log(data.list[1].weather[0].icon)); Works

    
}





// ########### AutoComplete Widget #####################
$(function () {
    $('.citySearched').autocomplete({
      source: pastCities,
    });
  });


