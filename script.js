let appId = 'b77e5ffa4e97bef9b34b8570c79e31d7';
let units = "imperial";
let searchMethod = 'zip';


const searchWeather = (searchTerm) => {
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
	.then(result =>{
		return result.json()
	})
	.then(result => {
		init(result);
	})
}

const init = (resultFromApiCall) =>{
	console.log(resultFromApiCall);
}

document.getElementById('searchBtn').addEventListener("click", () =>{
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm) {
		searchWeather(searchTerm)
	}
})