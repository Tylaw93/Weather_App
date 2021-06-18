// array for the cities you search
let cities = [];

$("#findCity").on("click", function(event) {
  event.preventDefault();

  let city = $("#cityInput").val(); 

  $("#deleteCities").on("click", function() {
    // empty the city names array
    cities = [];
    saveCities();
    renderCities();
  })


getData(city)
console.log(city)
})

function getCityImage(city){
    // search unsplash for an image from the city
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
    let entries = -1
    let array = data.results
    array.forEach(element => {
        entries +=1
        let newArray = element.tags
        newArray.forEach(item =>{
            if(item.title === "building"){
                num = entries
                //go through the entries and if one is tagged as a building save that image
            }
            
        });
    });
    let image = data.results[num].urls.full
    document.getElementById("cityPhoto").src = image
}
function getData(city){
    getCityImage(city)
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
            displayFiveDayWeather(data)
        });
        if (cities.indexOf(city) === -1) {
            cities.push(city);
          }
        
          saveCities();
          renderCities();
        };
         

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


function displayFiveDayWeather(response) {
    // Display 5-day weather report
  
    // Clear deck before updating
    $("#fiveDayCards").empty();
    for (let i = 6; i < 40; i += 8) {
      let cardDate = response.list[i].dt_txt;
      let date = new Date(cardDate).toLocaleDateString('en-US', {
        day : 'numeric',
        month : 'numeric',
        year : 'numeric'
      });
      let cardTemp = Math.round(((response.list[i].main.temp) - 273.15) * 1.8) +32;;
      let cardHumid = Math.round(response.list[i].main.humidity);
      let iconSource = response.list[i].weather[0].icon;
      let cardIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${iconSource}.png`);
      let cardEl = $("<div>").attr("class", "card col-sm-12 col-lg-3 bg-light");
      let cardTableEl = $("<table>").attr("class", "cardBody table");
      let cardTitleEl = $("<h6>").attr("class", "card-title").text(date);
      let cardTrEl1 = $("<tr>")
      let cardTrEl2 = $("<tr>")
      
      let cardTempEl = $("<td>").attr("class", "card-text").text(`${cardTemp} °F`);
      let cardTempText = $("<td>").attr("class", "card-text").text(`Temp: `);
      let cardHumidEl = $("<td>").attr("class", "card-text").text(`${cardHumid}%`);
      let cardHumidText = $("<td>").attr("class", "card-text").text(`Humidity: `);
      
      cardTrEl1.append(cardTempText).append(cardTempEl)
      cardTrEl2.append(cardHumidText).append(cardHumidEl)
      
      cardTableEl.append(cardTitleEl).append(cardIcon);
      cardEl.append(cardTableEl).append(cardTrEl1).append(cardTrEl2);
      $("#fiveDayCards").append(cardEl);
    }
  }


$("#cityList").on("click", ".city", function(event) {
    event.preventDefault();
  
    let city = $(this).text();
    console.log(city)
    getData(city)
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
  
      let cityCard = $("<div>").attr("class", "card bg-light");
      let cityCardBody = $("<div>").attr("class", "card-body city").text(city);
      cityCard.append(cityCardBody);
      $("#cityList").prepend(cityCard);
    })
  }

  function startup() {
    // Parsing the JSON stsring to an object
    let storedCities = JSON.parse(localStorage.getItem("cities"));
    console.log(storedCities)
    // If high scores were retrieved from localStorage, update highScores array to it.
    if (storedCities !== null) {
      cities = storedCities;
      renderCities()
    }
  }
  startup();