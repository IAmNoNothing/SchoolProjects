const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=49&longitude=32&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m";
const mainContainer = document.getElementById("main-container");

async function fetchWeatherData() {
    let response = await fetch(apiUrl);

    if (!response.ok) {
        console.error("Error fetching weather data:", response.statusText);
        displayErrorMessage("Failed to load weather data. Please try again later.");
        return;
    }
    
    let data = await response.json();
    weatherDataGlobal = data;
    displayWeatherData(data);    
}

function displayErrorMessage(msg) {
    mainContainer.innerHTML = `<p style="color: red;">${msg}</p>`;
}

function displayWeatherData(data) {
    const currentHour = new Date().getHours();
    const timeOfDay = isNight(currentHour) ? "night" : "day";
    const currentWeatherCode = data.hourly.weather_code[currentHour];
    const weatherInfo = weatherCodes[currentWeatherCode][timeOfDay];
    const temperature = data.hourly.temperature_2m[currentHour];

    const weatherIconUrl = weatherInfo.image;
    const weatherDescription = weatherInfo.description;

    upperSection(weatherIconUrl, weatherDescription, temperature, data, currentHour);
    drawGraph(data);
    showNextDays(data);
}

function showNextDays(data) {
    const template = document.getElementById("template-prediction");
    const predictions = document.getElementById("predictions");

    for (let i = 0; i < 7; i++) {
        const weatherCode = data.hourly.weather_code[i * 24 + 12];
        const weatherInfo = weatherCodes[weatherCode];

        const weatherIcon = weatherInfo.day.image;
        const weatherDesc = weatherInfo.day.description;

        const temperatureSlice = data.hourly.temperature_2m.slice(i * 24, (i + 1) * 24);
        const temperatureDay = Math.max(...temperatureSlice);
        const temperatureNight = Math.min(...temperatureSlice);

        const clone = template.content.cloneNode(true);

        const icon = clone.querySelector("img");
        icon.src = weatherIcon;
        icon.alt = weatherDesc;

        clone.querySelector(".short-weekday").textContent = new Date(data.hourly.time[i * 24 + 12]).toLocaleDateString(undefined, { weekday: "short" });
        clone.querySelector(".prediction-temperature-day").textContent = temperatureDay;
        clone.querySelector(".prediction-temperature-night").textContent = temperatureNight;

        predictions.appendChild(clone);
    }
}

function drawGraph(weatherData) {
    let data = null;
    let valueType = "";

    if (chosenGraphMode == "graph-temperature") {
        data = weatherData.hourly.temperature_2m.slice(0, 25);
        valueType = weatherData.hourly_units.temperature_2m;
    } else if (chosenGraphMode == "graph-precipitation") {
        data = weatherData.hourly.precipitation_probability.slice(0, 25);
        valueType = weatherData.hourly_units.precipitation_probability;
    } else if (chosenGraphMode == "graph-wind") {
        data = weatherData.hourly.wind_speed_10m.slice(0, 25);
        valueType = weatherData.hourly_units.wind_speed_10m;
    } else {
        console.log("invalid graph mode");
    }

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");    

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const graphMin = minValue * 0.8;
    const graphMax = maxValue * 1.2;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height-padding);
    ctx.lineTo(width-padding, height-padding);
    ctx.lineTo(width-padding, padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    ctx.beginPath();
    for (let hour = 3; hour < 24; hour += 3) {
        const value = data[hour];
        const x = getX(padding, hour, width);
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    for (let hour = 0; hour <= 24; hour++) {
        const value = data[hour];
        const x = getX(padding, hour, width);
        const y = getY(padding, value, height, graphMax, graphMin);
        ctx.lineTo(x, y);
    }    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 26, 0.4)";
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";

    for(let hour = 0; hour < 25; hour += 3) {
        const value = data[hour];
        const x = getX(padding, hour, width);
        const y = getY(padding, value, height, graphMax, graphMin);
        ctx.fillText(hour+":00", x, height - padding);
        ctx.fillText(value + valueType, x, y - 25);
    }
}

function getX(padding, hour, width) {
    return padding + (hour / 24) * (width - 2 * padding);
}

function getY(padding, value, height, graphMax, graphMin) {
    return height - padding - (value - graphMin) / (graphMax - graphMin) * (height - 2 * padding);
}

let chosenGraphMode = "graph-temperature";
let weatherDataGlobal = null;
function chooseGraphMode(element) {

    if (chosenGraphMode == element.id) {
        return;
    }

    document.getElementById(chosenGraphMode).classList.remove("active");
    element.classList.add("active");
    chosenGraphMode = element.id;
    drawGraph(weatherDataGlobal);
}

chooseGraphMode(document.getElementById("graph-temperature"));

function upperSection(weatherIconUrl, weatherDescription, temperature, data, currentHour) {
    const humidity = data.hourly.relative_humidity_2m[currentHour];
    const windSpeed = data.hourly.wind_speed_10m[currentHour];
    const precProb = data.hourly.precipitation_probability[currentHour];

    const weathericon = document.getElementById("weather-icon");
    weathericon.alt = weatherDescription;
    weathericon.src = weatherIconUrl;

    document.getElementById("weather-temperature").textContent = `${temperature} °C`;

    document.getElementById("weather-precipitation").textContent = `Precipitation Probability: ${precProb}%`;

    document.getElementById("weather-humidity").textContent = `Humidity: ${humidity}%`;

    document.getElementById("weather-wind-speed").textContent = `Wind Speed: ${windSpeed} km/h`;

    document.getElementById("weekday").textContent = new Date().toLocaleDateString(undefined, { weekday: 'long' });

    document.getElementById("weather-description").textContent = weatherDescription;
}

function isNight(hour) {
    return hour < 6 || hour >= 18;
}

fetchWeatherData(); 