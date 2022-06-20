// Variables
let searchBtn = $('.searchBtn');
let apiKey = 'bef3096b6b45e4625cc908be968f34b9';


let keyCount = 0;

searchBtn.click(function () {

    let searchCity = $('.searchCity').val();

    let urlCurrentDay = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&Appid=${apiKey}&units=imperial`;
    let urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&Appid=${apiKey}&units=imperial`;


    if (searchCity == "") {
        console.log(searchCity);
    } else {
        $.ajax({
            url: urlCurrentDay,
            method: "GET"
        }).then(function (response) {
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
            }).then(function (response) {

                let currentUV = currentTemp.append(`<p>UV Index: ${response.value}</p>`).addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });
    }
});
