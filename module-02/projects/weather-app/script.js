const apiKey = "dfe3e691190da1f61bf6bdc9e6fca82c";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    errorMsg.innerText = "Please enter a city name!";
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  try {
    errorMsg.innerText = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data)
    if (data.cod === "404") {
      errorMsg.innerText = "City not found!";
      return;
    }

    cityName.innerText = data.name;
    temperature.innerText = `${Math.round(data.main.temp)} °C`;
    condition.innerText = data.weather[0].description;
    humidity.innerText = data.main.humidity;
    wind.innerText = data.wind.speed;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  } catch (error) {
    errorMsg.innerText = "Something went wrong. Try again!";
  }
}