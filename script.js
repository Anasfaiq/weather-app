const API_KEY = "60ee66ecf8bf4345aff102819260101";
const forecastCardsEl = document.getElementById("forecastCards");
const suggestionsEl = document.getElementById("suggestions");

const cityNameEl = document.getElementById("cityName");
const dateTextEl = document.getElementById("dateText");
const weatherIconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const weatherDescEl = document.getElementById("weatherDesc");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const searchInput = document.getElementById("searchInput");

// format tanggal
function formatDate() {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// fetch data cuaca
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // current weather
    cityNameEl.textContent = data.location.name;
    dateTextEl.textContent = formatDate();

    temperatureEl.textContent = `${Math.round(data.current.temp_c)}°`;
    weatherDescEl.textContent = data.current.condition.text;
    feelsLikeEl.textContent = `Feels like ${Math.round(
      data.current.feelslike_c
    )}°`;

    humidityEl.textContent = `${data.current.humidity}%`;
    windEl.textContent = `${data.current.wind_kph} km/h`;
    pressureEl.textContent = `${data.current.pressure_mb} mb`;

    weatherIconEl.src = "https:" + data.current.condition.icon;

    // forecast 7 days
    forecastCardsEl.innerHTML = "";

    data.forecast.forecastday.forEach((day) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const card = document.createElement("div");
      card.className = "forecast-card";

      card.innerHTML = `
        <p>${dayName}</p>
        <img src="https:${day.day.condition.icon}" alt="">
        <p>${Math.round(day.day.maxtemp_c)}° / ${Math.round(
        day.day.mintemp_c
      )}°</p>
      `;

      forecastCardsEl.appendChild(card);
    });
  } catch (error) {
    alert("City not found");
  }
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported 😢");
    getWeather("Jakarta");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeather(`${lat},${lon}`);
    },
    () => {
      alert("Location access denied");
      getWeather("Jakarta");
    }
  );
}

// fetch city suggestions
async function getCitySuggestions(query) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
  );
  return response.json();
}

// render suggestions
function renderSuggestions(cities) {
  suggestionsEl.innerHTML = "";

  cities.slice(0, 5).forEach((city) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = `${city.name}, ${city.country}`;

    div.addEventListener("click", () => {
      getWeather(city.name);
      searchInput.value = "";
      suggestionsEl.innerHTML = "";
    });

    suggestionsEl.appendChild(div);
  });
}

// search pakai Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather(searchInput.value);
    searchInput.value = "";
  }
});

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();

  if (query.length === 0) {
    suggestionsEl.innerHTML = "";
    return;
  }

  const cities = await getCitySuggestions(query);
  renderSuggestions(cities);
});

searchInput.addEventListener("focus", async () => {
  if (searchInput.value !== "") return;

  const cities = await getCitySuggestions("a"); // bebas, cuma trigger
  renderSuggestions(cities.slice(0, 3));
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-bar")) {
    suggestionsEl.innerHTML = "";
  }
});

// default city pas pertama load
getWeatherByLocation();
