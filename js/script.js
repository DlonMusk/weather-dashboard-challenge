let APIkey = "33dd8089fae8f031899985c245c8aa0a";
let city = "london,ca";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

// get current time
let time = moment().format("L");


// grab all elements needed

//search elements
let citySearchEl = $('.city-search');
let searchBtnEl = $('.city-search-btn');

// current weather elements
let cityDateEl = $(".city-date");
let currentTempEl = $(".current-temp");
let currentWindEl = $(".current-wind");
let currentHumidityEl = $(".current-humidity");
let currentCityWeatherEl = $('.current-city-weather');

// weather forecast elements
let forecastCardsEl = $('.forecast-cards');




let createCardFunction = (dayData, day) => {
    // create all divs for cards
    let card = $('<div>').addClass('card col-2').width('13rem');
    let cardBody = $('<div>').addClass('card-body');
    cardBody.append($('<h5>').addClass('card-date').text(day));
    cardBody.append($('<img>').addClass('img-fluid').attr('src', `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`));
    cardBody.append($('<p>').addClass('card-temp').text(`Temp: ${dayData.temp.day}°C`));
    cardBody.append($('<p>').addClass('card-wind').text(`Wind: ${dayData.wind_speed}`));
    cardBody.append($('<p>').addClass('card-humidity').text(`Humidity: ${dayData.humidity}`));
    card.append(cardBody);


    forecastCardsEl.append(card);
}

let getWeatherFor = (event) => {
    
    event.preventDefault();
    city = citySearchEl.val();
    if(city == ""){
        // popup
        return;
    }
    
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

    // initial fetch for coordinates and initial weather data
    fetch(url).then(function (response) {
        if(response.status > 200){
            document.location = "./index.html";
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        forecastCardsEl.empty();
        $('.current-uv').remove();

        // set current weather
        cityDateEl.text(`${data.name} (${time})`);
        currentTempEl.text(`Temp: ${data.main.temp}°C`);
        currentWindEl.text(`Wind: ${data.wind.speed}KPH`);
        currentHumidityEl.text(`Humidity: ${data.main.humidity}%`);

        // create button of city searched for ul
        


        // set up variables for new api call
        let lat = data.coord.lat;
        let lon = data.coord.lon;

        let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`


        // second fetch for UV and forecast
        fetch(oneCallUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            // create uv element and button
            console.log(data);
            let currentUvEl = $('<p>').addClass('current-uv').text("UV Index: ");
            let uvBtnEl = $('<button>').addClass('uv-btn').text(data.current.uvi);
            currentUvEl.append(uvBtnEl);
            currentCityWeatherEl.append(currentUvEl);
            
            // clear forecast-cards div then create and populate new forecast cards
            
            for (let i = 0; i < 5; i++) {
                createCardFunction(data.daily[i], moment().add(i, 'd').format('L'))
            }
        })
    })

    console.log(citySearchEl.val())
}



searchBtnEl.on('click', getWeatherFor);





