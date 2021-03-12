var API_KEY = config.API_KEY
var button = document.getElementById("button-addon2");

button.addEventListener("click", function (event) {
    // search bar input from user
    var cityname = document.getElementById("weatherinput").value

    // prevents page from refreshing so we could see the console
    event.preventDefault();

    // to join 2+ word locations with a + 
    var replaced = cityname.split(' ').join('+');



    var addContent = (data) => {

        // to get object
        console.log(data)

        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var icon = document.getElementById("icon")
        icon.src = iconurl

        var name = document.getElementById("cityname")
        name.innerHTML = `${data.name}, ${data.sys.country}`

        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var icon = document.getElementById("icon")
        icon.src = iconurl

        var temp = document.getElementById("temp")
        var tempInKelv = data.main.temp
        var tempInDeg = kelvToF(tempInKelv)
        temp.innerHTML = `${tempInDeg}\u00B0F`

        var feelsLike = document.getElementById("feelsLike")
        feelsLike.innerHTML = `Feels like ${kelvToF(data.main.feels_like)}\u00B0F. ${data.weather[0].description}.`

        var display = document.getElementById("forecast")
        display.innerHTML = `Forecast: ${data.weather[0].main}`;

        var humidity = document.getElementById("humidity")
        humidity.innerHTML = `humidity: ${data.main.humidity}%`;

        var wind = document.getElementById("wind")
        wind.innerHTML = `Wind speed: ${data.wind.speed} MPG`;

        var pressure = document.getElementById("pressure")
        pressure.innerHTML = `pressure: ${data.main.pressure} hPa`

    }

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + replaced + "&appid=" + API_KEY)

        // .then(reply => console.log(reply)) used to check status
        .then(reply => reply.json())
        // .then(data => console.log(data)) to get url info
        .then(data => addContent(data))
        // unable to get .catch to work
        .catch(err => alert('incorrect Location, Try Again'))
});


var kelvToF = (kelvin) => {
    return Math.round(((kelvin) - 273.15) * (9 / 5) + 32)
}

// console.log(kelvToF(350))