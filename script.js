console.log("JavaScript is ready to run");

// Maps Open-Meteo's numeric weather codes to a label and emoji icon.
// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
const weatherCodeMap = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mostly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Depositing rime fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Moderate drizzle", icon: "🌦️" },
    55: { label: "Dense drizzle", icon: "🌦️" },
    61: { label: "Slight rain", icon: "🌧️" },
    63: { label: "Moderate rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    71: { label: "Slight snow", icon: "🌨️" },
    73: { label: "Moderate snow", icon: "🌨️" },
    75: { label: "Heavy snow", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Heavy rain showers", icon: "🌧️" },
    82: { label: "Violent rain showers", icon: "⛈️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with hail", icon: "⛈️" },
    99: { label: "Thunderstorm with heavy hail", icon: "⛈️" }
};

const form = document.getElementById("weather-form");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let city = document.getElementById("city").value.trim();
    console.log("Searching weather for: " + city);

    if (city === "") {
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    resultEl.classList.add("hidden");
    statusEl.textContent = "Looking up " + city + " ...";

    try {
        // Step 1: turn the city name into coordinates (free, no API key needed)
        let geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) + "&count=1";
        let geoResponse = await fetch(geoUrl);
        let geoData = await geoResponse.json();
        console.log("Geocoding result:", geoData);

        if (!geoData.results || geoData.results.length === 0) {
            statusEl.textContent = "Couldn't find a place called \"" + city + "\". Try another spelling.";
            return;
        }

        let place = geoData.results[0];
        let latitude = place.latitude;
        let longitude = place.longitude;
        let locationLabel = place.name +
            (place.admin1 ? ", " + place.admin1 : "") +
            (place.country ? ", " + place.country : "");

        // Step 2: fetch the current weather for those coordinates
        let weatherUrl = "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code";
        let weatherResponse = await fetch(weatherUrl);
        let weatherData = await weatherResponse.json();
        console.log("Weather result:", weatherData);

        displayWeather(locationLabel, weatherData.current);
        statusEl.textContent = "";
    } catch (error) {
        console.log("Error fetching weather:", error);
        statusEl.textContent = "Something went wrong fetching the weather. Please try again.";
    }
}

function displayWeather(locationLabel, current) {
    let weatherInfo = weatherCodeMap[current.weather_code] || { label: "Unknown", icon: "❓" };

    document.getElementById("location-name").textContent = locationLabel;
    document.getElementById("condition").textContent = weatherInfo.label;
    document.getElementById("icon").textContent = weatherInfo.icon;
    document.getElementById("temperature").textContent = Math.round(current.temperature_2m) + "°C";
    document.getElementById("feels-like").textContent = Math.round(current.apparent_temperature) + "°C";
    document.getElementById("wind").textContent = current.wind_speed_10m + " km/h";
    document.getElementById("humidity").textContent = current.relative_humidity_2m + "%";
    document.getElementById("updated").textContent = new Date(current.time).toLocaleTimeString();

    resultEl.classList.remove("hidden");
}