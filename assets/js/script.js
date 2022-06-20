// Variables
let searchBtn = $('.searchBtn');
let apiKey = 'bef3096b6b45e4625cc908be968f34b9';


let searchCity = $('.searchCity').val();

let urlCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&Appid=" + apiKey + "&units=imperial";
let urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&Appid=" + apiKey + "&units=imperial";