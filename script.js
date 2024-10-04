const myBtn = document.querySelector('.myBtn')

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
// } else {
//     document.getElementById("demo").innerHTML =
//         "Geolocation is not supported by this browser.";
// }

// function showPosition(position) {
//     document.getElementById("demo").innerHTML =
//         "Latitude: " + position.coords.latitude +
//         "Longitude: " + position.coords.longitude;
// }

function getWeather() {
    const apiKey = 'a694161d4b6b2537ed28151a2e82993d';
const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city')
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}



function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
        <p>${temperature}℃</p>`;

        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconurl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15)
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}℃</span>
        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

city.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        myBtn.click();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const favoriteBtn = document.getElementById('favorite-btn');
    const changeFavoriteBtn = document.getElementById('change-favorite-btn');
    const favoriteWeatherDiv = document.getElementById('favorite-weather');
    const favoriteCityEl = document.getElementById('favorite-city');
    const favoriteCityInput = document.getElementById('favorite-city-input');

    // Function to save favorite city to localStorage
    function saveFavoriteCity(cityName) {
        localStorage.setItem('favoriteCity', cityName);
        alert(`${cityName} has been added to your favorites!`);
        loadFavoriteCity(); // Load favorite city after saving
    }

    // Function to load favorite city from localStorage
    function loadFavoriteCity() {
        const favoriteCity = localStorage.getItem('favoriteCity');
        if (favoriteCity) {
            favoriteWeatherDiv.style.display = 'block';
            favoriteCityEl.textContent = favoriteCity;
            // Fetch weather for the favorite city and display it
            fetchWeatherForFavorite(favoriteCity);
        } else {
            favoriteWeatherDiv.style.display = 'none';
        }
    }

    // Function to fetch weather for the favorite city
    function fetchWeatherForFavorite(cityName) {
        // Replace this with your actual weather API code
        console.log(`Fetching weather for favorite city: ${cityName}`);
        // Show the favorite city weather in the #favorite-weather section
    }

    // Event listener for adding a favorite city
    favoriteBtn.addEventListener('click', () => {
        const cityName = favoriteCityInput.value;
        if (cityName) {
            saveFavoriteCity(cityName);
        } else {
            alert("Please enter a city name to save it as your favorite.");
        }
    });

    // Event listener for changing the favorite city
    changeFavoriteBtn.addEventListener('click', () => {
        localStorage.removeItem('favoriteCity');
        favoriteWeatherDiv.style.display = 'none';
        alert('Favorite city has been removed. Please select a new favorite.');
    });

    // Load the favorite city when the page loads
    loadFavoriteCity();

    // Save the favorite button state for the current searched city
    // Not being
    function saveFavoriteButtonState(currentCity) {
        const favoriteCity = localStorage.getItem('favoriteCity');
        if (favoriteCity && favoriteCity === currentCity) {
            favoriteBtn.textContent = "Remove from Favorites";
        } else {
            favoriteBtn.textContent = "Add to Favorites";
        }
    }
});
