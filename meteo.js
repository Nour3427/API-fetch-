var token = '9807b8359e79b279e544fb169293e5b2d6c4305c593e563971e1e55c9e57c862';
var forcastApiUrl = `https://api.meteo-concept.com/api/forecast/nextHours?token=${token}&insee=`;
var cityApiUrl = `https://api.meteo-concept.com/api/location/cities?token=${token}&search=`;
var postalCode = document.querySelector('h2');
var city = document.querySelector('h1');
var date = document.getElementById('date');
var weather = document.getElementById('weather');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var probRain = document.getElementById('probRain');
var weatherImage = document.getElementById('weatherImage');
var body = document.body;
var searchButton = document.querySelector('.icone');

searchButton.addEventListener('click', function () {
   var cityName = document.querySelector('input').value;
   getWeather(cityName).then(draw);
});


async function getInseeCity(cityName) {
   var response = await fetch(cityApiUrl + cityName);
   var data = await response.json();
   return data.cities[0].insee;
}

async function getWeather(cityName) {
   var insee = await getInseeCity(cityName);
   var response = await fetch(forcastApiUrl + insee);
   var data = await response.json();
   console.log(data);
   return data;
}

function draw(data) {
   postalCode.innerHTML = data.city.cp + ',';
   city.innerHTML = data.city.name;
   date.innerHTML = data.forecast[0].datetime.substr(0, 10);
   weather.innerHTML = data.forecast[0].temp2m + '°';
   humidity.innerHTML = data.forecast[0].rh2m + '%';
   wind.innerHTML = data.forecast[0].wind10m + ' Km/h';
   probRain.innerHTML = data.forecast[0].probarain + '%';
   if (data.forecast[0].weather === 0) {
      weatherImage.src = "./sunn.png";
      body.style.backgroundImage = "url(./sunny2.jpg)";
   } else if (data.forecast[0].weather >= 1 && data.forecast[0].weather < 10) {
      weatherImage.src = "./couvert.png";
      body.style.backgroundImage = "url(./pc.jpg)";
   } else if ((data.forecast[0].weather >= 10 && data.forecast[0].weather < 19) || (data.forecast[0].weather >= 40 && data.forecast[0].weather <= 48)) {
      weatherImage.src = "./rain.png";
      body.style.backgroundImage = "url(./rd.jpg)";
   }
   else {
      weatherImage.src = "./snow.png";
      body.style.backgroundImage = "url(./snow1.jpg)";
   }
}

getWeather('aix-en-provence').then(draw);



