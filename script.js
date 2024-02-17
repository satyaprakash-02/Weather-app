document.getElementById('location-form').addEventListener('submit', function(e) {
  e.preventDefault();
  getWeather(e);
});

function getWeather(e) {
  const apiKey = "ff03c1a050d9a929d42846ceb26027cd";
  const cityInput = document.getElementById('location-input').value;
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
      clearText();
      
    })
    .catch(error => {
      console.error(error.message);
      displayWeatherError();
    });
}

function displayWeatherData(data) {
  const displayDataElement = document.getElementById('weather-data');
  if (data) {
    displayDataElement.innerHTML = `
      <p>Location: ${data.name}</p>
      <p> ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Have a nice day!</p>
    `;
    
  } else {
    displayWeatherError("City not Available");
  }
}

function clearText(){
  document.getElementById("location-input").value=" ";
}
function displayWeatherError(errorMessage) {
  const displayDataElement = document.getElementById('weather-data');
  displayDataElement.innerHTML = "Error: City not found";
}




