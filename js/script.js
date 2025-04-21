const API_WEATHER_KEY = "COLOQUE AQUI SUA CHAVE DO OPENWEATHERMAP"
const API_IMAGES_KEY = "COLOQUE AQUI SUA CHAVE DO UNSPLASH"

const searchInput = document.querySelector(".search-inp");
const searchButton = document.querySelector("#search-btn");
const randomButton = document.querySelector("#random-btn");
const rechooseButton = document.getElementById("rechoose-btn");

searchInput.addEventListener("keyup", (e) => {
    if(e.code == "Enter"){
        if(searchInput.value == "") return;
        searchData(searchInput.value);
    }
});

searchButton.addEventListener("click", () => {
    searchButton.classList.add("active-animating");
    setTimeout(() => {
        searchButton.classList.remove("active-animating");
    }, 200);
    if(searchInput.value == "") return;
    searchData(searchInput.value);
});

randomButton.addEventListener("click", () => {
    randomButton.classList.add("active-animating");
    setTimeout(() => {
        randomButton.classList.remove("active-animating");
    }, 200);
    getRandomCity();
});

rechooseButton.addEventListener("click", () => {
    window.location.href = "#search-section";
    searchInput.value = "";
});


async function getStateName(city) {
    const apiGeoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_WEATHER_KEY}`;
    const res = await fetch(apiGeoURL);
    const data = await res.json();
  
    console.log(data);
    return data[0].state;
  }
  

async function getWeatherData(city) {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_WEATHER_KEY}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
    return data;
}

async function getCityImage(city){
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${API_IMAGES_KEY}&per_page=1`;
    try{
        const res = await fetch(unsplashURL);
        const data = await res.json();
        if(data.results && data.results.length > 0 && data.cod !== 404){
            return data.results[0].urls.regular;
        } else {
            throw new Error("Não foi possível encontrar uma imagem para esta cidade.");   
        }

    } catch(error){
        console.error(error.message);
        return null;    
    }
}

async function showWeatherData(state, data){  
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
    
    cityElement.innerText = data.name;
    if(state == undefined) state = data.sys.country;
    stateElement.innerText = state;
    countryFlag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    temperatureElement.innerText = Math.round(data.main.temp) + "ºC";
    temperatureMax.innerText = Math.round(data.main.temp_max);
    temperatureMin.innerText = Math.round(data.main.temp_min) + " ºC";
    humidityElement.innerText = data.main.humidity + "%";
    pressureElement.innerText = data.main.pressure + " mb";
    windElement.innerText = data.wind.speed + " km/h";
    if((data.visibility/1000) % 1 == 0)
        visibilityElement.innerText = data.visibility/1000 + " km";
    else
        visibilityElement.innerText = (data.visibility/1000).toFixed(1) + " km";
}

async function showCityImage(city){
    const imageUrl = await getCityImage(city);
    const cityImageElement = document.getElementById("city-image");

    console.log(imageUrl)

    if(imageUrl){
        cityImageElement.setAttribute("src", imageUrl);
        cityImageElement.style.display = "block";
    } else {
        cityImageElement.style.display = "none";
    }
}

function disableElement(element){
    element.style.opacity = "0.5";
    element.style.cursor = "not-allowed";
    element.disabled = true;
}

function enableElement(element){
    element.style.opacity = "1";
    element.style.cursor = "pointer";
    element.disabled = false;
}

async function searchData(city, shouldScroll = true){
    const weatherData = await getWeatherData(city);
    if(weatherData.cod !== 200){
        window.alert(`${weatherData.cod} - ${weatherData.message}`);
        return;
    }

    const stateName = await getStateName(city);
    

    showWeatherData(stateName, weatherData);
    showCityImage(city);

    if(shouldScroll){
        const loadElement = document.querySelector(".loader-container");
        loadElement.style.visibility = "visible";
        disableElement(searchButton);
        disableElement(randomButton);
        disableElement(searchInput);
        searchInput.value = "";
        setTimeout(() => {
            window.location.href = "#result-section";
            loadElement.style.visibility = "hidden";
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
    "Athens","Copenhagen", "Budapest", "Brussels", "Oslo",
    "Doha", "Tel Aviv", "Edinburgh", "San Francisco", "Vancouver",
    "Santiago", "Bogotá", "Bangkok", "Abu Dhabi", "Casablanca", "Reykjavik"
  ];

async function getRandomCity() {
    const index = Math.floor(Math.random() * popularCities.length);
    await searchData(popularCities[index]);
  }


  searchData("Brasília", false);