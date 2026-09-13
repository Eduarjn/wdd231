// Current weather and a 3-day forecast for Valinhos, using the OpenWeatherMap free API.
// Get a free key at https://openweathermap.org/api and paste it below.
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const CITY = 'Valinhos,BR';
const UNITS = 'metric';

const currentWeatherEl = document.getElementById('current-weather');
const forecastEl = document.getElementById('forecast');

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${WEATHER_API_KEY}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=${UNITS}&appid=${WEATHER_API_KEY}`)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Weather service did not return a valid response');
        }

        const current = await currentResponse.json();
        const forecast = await forecastResponse.json();

        displayCurrentWeather(current);
        displayForecast(forecast.list);
    } catch (error) {
        currentWeatherEl.innerHTML = '<p class="error">Weather data is unavailable right now.</p>';
        forecastEl.innerHTML = '';
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = capitalize(data.weather[0].description);
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    currentWeatherEl.innerHTML = `
        <img src="${iconUrl}" alt="${description}" width="64" height="64" loading="lazy">
        <p class="temp">${temp}&deg;C</p>
        <p class="description">${description}</p>
    `;
}

function displayForecast(list) {
    const nextThreeDays = pickDailyNoon(list, 3);

    forecastEl.innerHTML = '<h3>3-day forecast</h3><ul class="forecast-list"></ul>';
    const forecastList = forecastEl.querySelector('.forecast-list');

    nextThreeDays.forEach((entry) => {
        const date = new Date(entry.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(entry.main.temp);

        const item = document.createElement('li');
        item.innerHTML = `
            <span class="forecast-day">${day}</span>
            <span class="forecast-temp">${temp}&deg;C</span>
        `;
        forecastList.appendChild(item);
    });
}

// The forecast API returns readings every 3 hours; picking the one closest to
// noon on each of the next three calendar days gives a simple daily forecast.
function pickDailyNoon(list, days) {
    const today = new Date().toDateString();
    const seen = new Set();
    const result = [];

    for (const entry of list) {
        const date = new Date(entry.dt * 1000);
        const dateString = date.toDateString();

        if (dateString === today || seen.has(dateString)) continue;
        if (date.getHours() < 11 || date.getHours() > 13) continue;

        seen.add(dateString);
        result.push(entry);

        if (result.length === days) break;
    }

    return result;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

getWeather();
