const country = document.getElementById("country");
const capital = document.getElementById("capital");
const weatherBox = document.getElementById("weatherBox");

const chosenCountry = localStorage.getItem("chosenCountry");
const pickedCapital = localStorage.getItem("pickedCapital");

country.textContent = chosenCountry;
capital.textContent = pickedCapital;

if (!pickedCapital || pickedCapital === "Unknown") {
    weatherBox.textContent = "";
} else {
    const educationalPurposesApiKey = "af527d7292e58a1b188954167ce7b7d2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(pickedCapital)}&units=metric&appid=${educationalPurposesApiKey}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const weatherDesc = data.weather[0].description;
            const cTemp = data.main.temp;
            const fTemp = (cTemp * 9) / 5 + 32;
            const cFeelsLike = data.main.feels_like;
            const fFeelsLike = (cFeelsLike * 9) / 5 + 32;
            const cMinTemp = data.main.temp_min;
            const fMinTemp = (cMinTemp * 9) / 5 + 32;
            const cMaxTemp = data.main.temp_max;
            const fMaxTemp = (cMaxTemp * 9) / 5 + 32;
            const humidity = data.main.humidity;
            const windSpd = data.wind.speed;
            const windAngle = data.wind.deg;
            const clouds = data.clouds.all;
            const pressure = data.main.pressure;
            const visM = data.visibility;
            const visKm = visM / 1000;
            const visMiles = visM / 1609.34;
            
            let windDir = "";
            if (windAngle > 337.5 || windAngle <= 22.5) {
                windDir = "N";
            } else if (windAngle > 22.5 && windAngle <= 67.5) {
                windDir = "NE";
            } else if (windAngle > 67.5 && windAngle <= 112.5) {
                windDir = "E";
            } else if (windAngle > 112.5 && windAngle <= 157.5) {
                windDir = "SE";
            } else if (windAngle > 157.5 && windAngle <= 202.5) {
                windDir = "S";
            } else if (windAngle > 202.5 && windAngle <= 247.5) {
                windDir = "SW";
            } else if (windAngle > 247.5 && windAngle <= 292.5) {
                windDir = "W";
            } else {
                windDir = "NW";
            }
            
            weatherBox.innerHTML = `
        <strong>Weather:</strong> ${weatherDesc}<br>
        <strong>Temperature:</strong> ${cTemp.toFixed(2)}°C / ${fTemp.toFixed(
                2
            )}°F<br>
        <strong>Feels Like:</strong> ${cFeelsLike.toFixed(
                2
            )}°C / ${fFeelsLike.toFixed(2)}°F<br>
        <strong>Min Temperature:</strong> ${cMinTemp.toFixed(
                2
            )}°C / ${fMinTemp.toFixed(2)}°F<br>
        <strong>Max Temperature:</strong> ${cMaxTemp.toFixed(
                2
            )}°C / ${fMaxTemp.toFixed(2)}°F<br>
        <strong>Humidity:</strong> ${humidity}%<br>
        <strong>Wind Speed:</strong> ${windSpd} m/s<br>
        <strong>Wind Direction:</strong> ${windDir} (${windAngle}°)<br>
        <strong>Clouds:</strong> ${clouds}%<br>
        <strong>Pressure:</strong> ${pressure} hPa<br>
        <strong>Visibility:</strong> ${visKm.toFixed(2)} km / ${visMiles.toFixed(
                2
            )} miles
      `;
        })
}
