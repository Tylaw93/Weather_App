
let cities = [];

$("#findCity").on("click", function(event) {
  event.preventDefault();

  let city = $("#cityInput").val(); 

function getCityImage(city){
    const apiKey = "JGRm3Szc6q_F7l8YtT4vev4H0PyqEVI-NkaipHZ1Pmo"
    const photoSearch = `https://api.unsplash.com/search/photos?page=1&query=${city},&client_id=${apiKey}`
    fetch(photoSearch).then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(data)
        displayCityImage(data)
    })
}
function displayCityImage(data){
    let num = Math.floor(Math.random()*(data.results.length))
    console.log(num)
    let array = data.results
    array.forEach(element => {
        if(element.tags[0]){
            console.log(element.tags[0].title)
        }
    });
    let image = data.results[num].urls.full
    document.getElementById("cityPhoto").src = image
}
function getData(city){
    const apiKey = "c3d17af6b12c366aecbc2fdcb4467092"
    let weather5DaySearch = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperal&appid=${apiKey}`
    let weatherSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperal&appid=${apiKey}`

    fetch(weatherSearch)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            displayData(data)
        });

        fetch(weather5DaySearch)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
        });
        if (cities.indexOf(city) === -1) {
            cities.push(city);
          }
        
          saveCities();
          renderCities();
        };
         



getCityImage(city)

getData(city)

function displayData(data){
    
    let cityName = data.name;
  let cityDate = moment().format('l');
  let cityIcon = data.weather[0].icon;
  let cityTemp = Math.round(((data.main.temp) - 273.15) * 1.8) +32;
  let cityHumid = data.main.humidity;
  let cityWind = Math.round(data.wind.speed);
  let cityCondition = data.weather[0].main;
  let cityIconEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)

  $("#cityName").text(cityName + ' (' + cityDate + ')').append(cityIconEl);
  $("#cityTemp").text(cityTemp + '\u00B0' + 'F');
  $("#cityHumid").text(cityHumid + '%');
  $("#cityWind").text(cityWind + ' MPH');
  $("#cityCondition").text(cityCondition);
}
})

$("#cityList").on("click", ".city", function(event) {
    event.preventDefault();
  
    let city = $(this).text();
    getAPIs(city);
  });
  function saveCities() {
    // Save city names.
    localStorage.setItem("cities", JSON.stringify(cities));
  }

function renderCities() {
    // Clear city names element before updating.
    $("#cityList").empty();
  
    // Render city names
    cities.forEach(city => {
  
      let cityCard = $("<div>").attr("class", "card");
      let cityCardBody = $("<div>").attr("class", "card-body city").text(city);
      cityCard.append(cityCardBody);
      $("#cityList").prepend(cityCard);
    })
  }