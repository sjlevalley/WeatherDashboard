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

console.log(pastCities);

function handleSearchInput(event) {
   if (!citySearched.val()) {
       alert("Please Enter A City Name");  

   } else {
       
       console.log(citySearched.val());
       pastCities.push(citySearched.val());
       console.log(pastCities);
       localStorage.setItem("City", JSON.stringify(pastCities));
   }

};


function renderPastCities() {

    var prevSearch = JSON.parse(localStorage.getItem("City"));
    
    if (prevSearch) {
        pastCities = prevSearch;
        console.log(pastCities);
    } else {
        
    };
};



searchButton.on("click", function(event) {
    handleSearchInput();
});


