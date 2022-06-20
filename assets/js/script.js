// Variables
let searchBtn = $('.searchBtn');
let apiKey = 'bef3096b6b45e4625cc908be968f34b9';

// For loop for persisting the data onto HMTL page
for (let i = 0; i < localStorage.length; i++) {

    let city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    let cityName = $(".list-group").addClass("list-group-item");

    cityName.append(`<li>${city}</li>`);
}


let keyCount = 0;

searchBtn.click(() => {

    let searchCity = $('.searchCity').val();

    let urlCurrentDay = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&Appid=${apiKey}&units=imperial`;
    let urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&Appid=${apiKey}&units=imperial`;


    if (searchCity == "") {
        console.log(searchCity);
    } else {
        $.ajax({
            url: urlCurrentDay,
            method: "GET"
        }).then((response) => {
            // list-group append an li to it with just set text

            // console.log(response.name);
            let cityName = $(".list-group").addClass("list-group-item");
            cityName.append(`<li>${response.name}</li>`);

            // Local storage
            let local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Start Current Weather append 
            let currentDay = $(".currentDay").append("<div>").addClass("card-body");
            currentDay.empty();
            let currentName = currentDay.append("<p>");
            currentDay.append(currentName);

            // Adjust Date 
            let timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            // Add Temp 
            let currentTemp = currentName.append("<p>");

            currentName.append(currentTemp);
            currentTemp.append(`<p>Temperature: ${response.main.temp}</p>`);

            // Add Humidity
            currentTemp.append(`<p>Humidity: ${response.main.humidity}%</p>`);

            // Add Wind Speed: 
            currentTemp.append(`<p>Wind Speed: ${response.wind.speed}</p>`);

            // UV Index URL
            let urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=bef3096b6b45e4625cc908be968f34b9&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then((response) => {

                let currentUV = currentTemp.append(`<p>UV Index: ${response.value}</p>`).addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });

        // Call for 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then((response) => {
            // Array for 5-days 
            let day = [0, 8, 16, 24, 32];
            let fiveDayForecast = $(".fiveDayForecast").addClass("card-body");
            let fiveDayCurrent = $(".fiveDayCurrent").addClass("card-text");
            fiveDayCurrent.empty();

            // For each loop for 5-day forecast
            day.forEach((i) => {
                let FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayCurrent.append(`<div class=fiveDayColor><p>${FiveDayTimeUTC1}</p> <img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png"> <p>Temperature: ${response.list[i].main.temp}</p> <p> Humidity: ${response.list[i].main.humidity}%</p></div>`);
            });
        });
    }
});
