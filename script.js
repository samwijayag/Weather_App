let appId = 'b77e5ffa4e97bef9b34b8570c79e31d7';
let units = "imperial";
let searchMethod;


const getSearchMethod = (searchTerm) =>{
	if (searchTerm.length===5 & Number.parseInt(searchTerm)+ '' === searchTerm){
		searchMethod = 'zip'
	}else{
		searchMethod = 'q'
	}
}

const searchWeather = (searchTerm) => {
	getSearchMethod(searchTerm)
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
	.then(result =>{
		return result.json()
	})
	.then(result => {
		init(result);
	})
}

const init = (resultFromApiCall) =>{
	switch(resultFromApiCall.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage = 'url(./Images/clear.jpg)'
			break;
		case 'Clouds':
			document.body.style.backgroundImage = 'url(./Images/cloudy.jpg)'
			break;

		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage = 'url(./Images/rain.jpg)'
			break;

		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url(./Images/storm.jpg)'
			break;

		case 'Snow':
			document.body.style.backgroundImage = 'url(./Images/snow.jpg)'
			break;

		default:
			break;
	}
	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
	let temperatureElement = document.getElementById('temperature')
	let humidityElement = document.getElementById('humidity')
	let windSpeedElement = document.getElementById('windSpeed')
	let cityHeader = document.getElementById('cityHeader')
	let weatherIcon = document.getElementById('documentIconImg')

	weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromApiCall.weather[0].icon + '.png'

	let resultDescription = resultFromApiCall.weather[0].description
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)

	temperatureElement.innerHTML = Math.floor(resultFromApiCall.main.temp) + '&#176'
	windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromApiCall.wind.speed) + 'm/s'
	cityHeader.innerHTML = resultFromApiCall.name
	humidityElement.innerHTML = 'Humidity levels at ' + resultFromApiCall.main.humidity + '%'

}

document.getElementById('searchBtn').addEventListener("click", () =>{
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm) {
		searchWeather(searchTerm)
	}
})