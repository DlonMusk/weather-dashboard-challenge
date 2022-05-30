let APIkey = "33dd8089fae8f031899985c245c8aa0a";
let city = "london,ca";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

// get current time
let time = moment().format("L");


// grab all elements needed

//search elements


// current weather elements
let cityDateEl = $(".city-date");
let currentTempEl = $(".current-temp");
let currentWindEl = $(".current-wind");
let currentHumidityEl = $(".current-humidity");
let uvBtnEl = $('.uv-btn');

// weather forecast elements
let forecastCardsEl = $('.forecast-cards');


// initial fetch for coordinates and initial weather data
fetch(url).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    // set current weather
    cityDateEl.text(`${data.name} (${time})`);
    currentTempEl.text(`Temp: ${data.main.temp} Deg C`);
    currentWindEl.text(`Wind: ${data.wind.speed}KPH`);
    currentHumidityEl.text(`Humidity: ${data.main.humidity}%`);


    // set up variables for new api call
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    console.log(lat + " " + lon);
    let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`


    // second fetch for UV and forecast
    fetch(oneCallUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        uvBtnEl.text(data.current.uvi);
        console.log(data.daily[1]);
        // create and populate the forecast cards
        for(let i = 0; i < 5; i++){
            createCardFunction(data.daily[i], moment().add(i, 'd').format('L'))
        }
    })
})

let createCardFunction = (dayData, day) => {
    // create all divs for cards
    let card = $('<div>').addClass('card col-2').width('13rem');
    let cardBody = $('<div>').addClass('card-body');
    cardBody.append($('<h5>').addClass('card-date').text(day));
    cardBody.append($('<img>').addClass('img-fluid').attr('src', `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`));
    cardBody.append($('<p>').addClass('card-temp').text(`Temp: ${dayData.temp.day}`));
    cardBody.append($('<p>').addClass('card-wind').text(`Wind: ${dayData.wind_speed}`));
    cardBody.append($('<p>').addClass('card-humidity').text(`Humidity: ${dayData.humidity}`));
    card.append(cardBody);
    
    console.log(card);
    forecastCardsEl.append(card);
}


// set default city to london ontario
// fetch(url).then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data);
//     // populate page
//     cityDateEl.text(`${data.name} (${time})`);
//     currentTempEl.text(`Temp: ${data.main.temp}`);
//     currentWindEl.text(`Wind: ${data.wind.speed}KPH`);
//     currentHumidityEl.text(`Humidity: ${data.main.humidity}%`);
//     currentUvEl.text(`UV Index: `);

// })


// let searchFunction = () => {

// }

// let searchBtnEl = $('.city-search-btn');
// searchBtnEl.on('click', searchFunction);
// console.log(searchBtnEl);