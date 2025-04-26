const searchInput = document.querySelector(".search-inp");
const searchButton = document.querySelector("#search-btn");
const randomButton = document.querySelector("#random-btn");
const rechooseButton = document.getElementById("rechoose-btn");

if (searchInput && searchButton && randomButton && rechooseButton) {
    searchInput.addEventListener("keyup", (e) => {
        if (e.code === "Enter") {
            if (!searchInput.value.trim()) return;
            searchData(searchInput.value.trim());
        }
    });

    searchButton.addEventListener("click", () => {
        animateButton(searchButton);
        if (!searchInput.value.trim()) return;
        searchData(searchInput.value.trim());
    });

    randomButton.addEventListener("click", () => {
        animateButton(randomButton);
        getRandomCity();
    });

    rechooseButton.addEventListener("click", () => {
        window.location.href = "#search-section";
        searchInput.value = "";
    });
}

function animateButton(button) {
    button.classList.add("active-animating");
    setTimeout(() => {
        button.classList.remove("active-animating");
    }, 200);
}

async function getWeatherData(city) {
    try {
        const response = await fetch('http://localhost:3000/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchtext: city })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { cod: 500, message: "Server Error" };
    }
}

async function showWeatherData(data) {
    const cityElement = document.getElementById("city-name");
    const stateElement = document.getElementById("state-name");
    const countryFlag = document.querySelector(".country-flag");
    const temperatureElement = document.getElementById("temperature");
    const temperatureMax = document.getElementById("temp-max");
    const temperatureMin = document.getElementById("temp-min");
    const humidityElement = document.getElementById("humidity");
    const pressureElement = document.getElementById("pressure");
    const visibilityElement = document.getElementById("visibility");
    const windElement = document.getElementById("wind");
    const cityImageElement = document.getElementById("city-image");

    if (!data || !data.main || !data.sys) {
        window.alert("Dados incompletos recebidos do servidor.");
        return;
    }

    cityElement.innerText = data.name || "Cidade Desconhecida";
    stateElement.innerText = data.state || data.sys.country || "Estado Desconhecido";
    countryFlag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);

    temperatureElement.innerText = data.main.temp ? `${Math.round(data.main.temp)}ºC` : "-";
    temperatureMax.innerText = data.main.temp_max ? `${Math.round(data.main.temp_max)}ºC` : "-";
    temperatureMin.innerText = data.main.temp_min ? `${Math.round(data.main.temp_min)}ºC` : "-";
    humidityElement.innerText = data.main.humidity !== undefined ? `${data.main.humidity}%` : "-";
    pressureElement.innerText = data.main.pressure !== undefined ? `${data.main.pressure} mb` : "-";
    windElement.innerText = data.wind?.speed !== undefined ? `${data.wind.speed} km/h` : "-";

    if (data.visibility !== undefined) {
        visibilityElement.innerText = (data.visibility / 1000).toFixed(1) + " km";
    } else {
        visibilityElement.innerText = "-";
    }

    if (data.image) {
        cityImageElement.setAttribute("src", data.image);
        cityImageElement.style.display = "block";
    } else {
        console.warn("No city image provided.");
        cityImageElement.style.display = "none";
    }
}

function disableElement(element) {
    element.style.opacity = "0.5";
    element.style.cursor = "not-allowed";
    element.disabled = true;
}

function enableElement(element) {
    element.style.opacity = "1";
    element.style.cursor = "pointer";
    element.disabled = false;
}

async function searchData(city, shouldScroll = true) {
    if (!city) {
        console.error("No city provided.");
        return;
    }

    const weatherData = await getWeatherData(city);
    if (weatherData.cod !== 200) {
        window.alert(`${weatherData.cod} - ${weatherData.message}`);
        return;
    }

    await showWeatherData(weatherData);

    if (shouldScroll) {
        const loadElement = document.querySelector(".loader-container");
        if (loadElement) {
            loadElement.style.visibility = "visible";
        }
        disableElement(searchButton);
        disableElement(randomButton);
        disableElement(searchInput);
        searchInput.value = "";

        setTimeout(() => {
            window.location.href = "#result-section";
            if (loadElement) {
                loadElement.style.visibility = "hidden";
            }
            enableElement(searchButton);
            enableElement(randomButton);
            enableElement(searchInput);
        }, 1000);
    }
}

const popularCities = [
    "Paris", "Tokyo", "Rio de Janeiro", "New York", "London", "Barcelona",
    "Sydney", "Toronto", "Cape Town", "São Paulo", "Bangkok",
    "Amsterdam", "Seoul", "Dubai", "Moscow", "Berlin", "Mumbai", "Istanbul",
    "Los Angeles", "Chicago", "Buenos Aires", "Lisbon", "Cairo", "Prague",
    "Vienna", "Lima", "Warsaw", "Helsinki", "Stockholm", "Beijing",
    "Hong Kong", "Shanghai", "Mexico City", "Kuala Lumpur", "Jakarta",
    "Athens", "Copenhagen", "Budapest", "Brussels", "Oslo",
    "Doha", "Tel Aviv", "Edinburgh", "San Francisco", "Vancouver",
    "Santiago", "Bogotá", "Bangkok", "Abu Dhabi", "Casablanca", "Reykjavik"
];

async function getRandomCity() {
    const index = Math.floor(Math.random() * popularCities.length);
    await searchData(popularCities[index]);
}

// Default load Brasília
searchData("Brasília", false);
