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

var forecastDate = $('.forecastDate');
var forecastIcon = $('.forecastIcon');
var forecastTemp = $('.forecastTemp');
var forecastHumidity = $('.forecastHumidity');

var testIcon = $('#testIcon');

var day1 = $('.day-1');
var day2 = $('.day-2');
var day3 = $('.day-3');
var day4 = $('.day-4');
var day5 = $('.day-5');

var pastCities = [];

renderPastCities();



function handleSearchInput(event) {
   if (!citySearched.val()) {
       alert("Please Enter A City Name");  

   } else {
       
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
    for (i = 0; i < 10; i++) {

        var listItem = document.createElement("button");
        listItem.setAttribute("class", "cities");
        listItem.setAttribute("style", "background-color: white");
        listItem.textContent = pastCities[i];
        // console.log(listItem);
        recentSearches.append(listItem);
    }
}
repopulateList();


// var cityVal = citySearched.val();


var lat = 0;
var lon = 0;


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

        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        

        // https://openweathermap.org/img/wn/10d@2x.png
        
    

       
       var uvIndexSearch = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;



    //    ############################## Current City ######################################
        
        currentCity.text(data.city.name);
        var currentMoment = moment().format("(M/DD/YYYY)");  
        // currentDate.text(data.list[0].dt_txt.slice(0,10));
        currentDate.text(currentMoment);
        



        // weatherIcon.text(data.list[0].weather[0].icon);
      
      
        var currentIcon = 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png';
        var img = document.createElement('img');
        img.setAttribute("src", currentIcon);
        weatherIcon.append(img);
        tempText.text(data.list[0].main.temp + "°F");
        humidityText.text(data.list[0].main.humidity + "%");
        windSpeedText.text(data.list[0].wind.speed + " MPH");
        // uvIndexText.text();


        // ################ Forecast Days ########################################################################
        day1.children()[0].textContent = data.list[4].dt_txt.slice(0,10)
       

        var forecast1Icon = 'https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '.png';
        var img1 = document.createElement('img');
        img1.setAttribute("src", forecast1Icon);
        day1.children()[1].append(img1);
        day1.children()[2].textContent = "Temp: " + data.list[4].main.temp + "°F"
        day1.children()[3].textContent = "Humidity: " + data.list[4].main.humidity + "%"


        day2.children()[0].textContent = data.list[12].dt_txt.slice(0,10)
        var forecast2Icon = 'https://openweathermap.org/img/wn/' + data.list[12].weather[0].icon + '.png';
        var img2 = document.createElement('img');
        img2.setAttribute("src", forecast2Icon);
        day2.children()[1].append(img2);
        day2.children()[2].textContent = "Temp: " + data.list[12].main.temp + "°F"
        day2.children()[3].textContent = "Humidity: " + data.list[12].main.humidity + "%"


        day3.children()[0].textContent = data.list[20].dt_txt.slice(0,10)
        var forecast3Icon = 'https://openweathermap.org/img/wn/' + data.list[20].weather[0].icon + '.png';
        var img3 = document.createElement('img');
        img3.setAttribute("src", forecast3Icon);
        day3.children()[1].append(img3);
        day3.children()[2].textContent = "Temp: " + data.list[20].main.temp + "°F"
        day3.children()[3].textContent = "Humidity: " + data.list[20].main.humidity + "%"


        day4.children()[0].textContent = data.list[28].dt_txt.slice(0,10)
        var forecast4Icon = 'https://openweathermap.org/img/wn/' + data.list[28].weather[0].icon + '.png';
        var img4 = document.createElement('img');
        img4.setAttribute("src", forecast4Icon);
        day4.children()[1].append(img4);
        day4.children()[2].textContent = "Temp: " + data.list[28].main.temp + "°F"
        day4.children()[3].textContent = "Humidity: " + data.list[28].main.humidity + "%"


        day5.children()[0].textContent = data.list[36].dt_txt.slice(0,10)
        var forecast5Icon = 'https://openweathermap.org/img/wn/' + data.list[36].weather[0].icon + '.png';
        var img5 = document.createElement('img');
        img5.setAttribute("src", forecast5Icon);
        day5.children()[1].append(img5);
        day5.children()[2].textContent = "Temp: " + data.list[36].main.temp + "°F"
        day5.children()[3].textContent = "Humidity: " + data.list[36].main.humidity + "%"





        fetch(uvIndexSearch)
        .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        uvIndexText.text(data.value);
        uvIndexText.attr("style", "background-color: red");
        
        
      });


        
      })
    
      
 

    
}





// ########### AutoComplete Widget #####################
$(function () {
    $('.citySearched').autocomplete({
      source: pastCities,
    });
  });


