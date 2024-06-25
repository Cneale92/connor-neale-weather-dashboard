const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#cityInput");

const cityNameEl = document.querySelector("#cityName");
const cityTempEl = document.querySelector("#cityTemp");
const cityWindEl = document.querySelector("#cityWind");
const cityHumidityEl = document.querySelector("#cityHumidity");

const pastCitiesEl = document.querySelector("#pastCities");

document.getElementById(`right-content`).style.visibility = `hidden`;

const apiKey = `c16b89d5a85d543c78bba4d012495c74`;

const now = dayjs();
let tomorrow = now.add(1, "day").format("DD/MM/YYYY");

function readCitiesFromStorage() {
  let cities = localStorage.getItem("cities");
  if (!cities) {
    return [];
  }
  let citiesParsed = JSON.parse(cities);
  return citiesParsed;
}

$(document).ready(function () {
  let cities = localStorage.getItem("cities");

  if (!cities) {
    return [];
  }

  let citiesParsed = JSON.parse(cities);
  for (let i = 0; i < citiesParsed.length; i++) {
    console.log(citiesParsed[i]);

    let cityButton = document.createElement("button");
    cityButton.setAttribute("data-value", citiesParsed[i]);
    cityButton.classList.add("btn");
    cityButton.classList.add("btn-secondary");
    let cityName = document.createElement("h4");
    cityName.textContent = citiesParsed[i];

    cityButton.appendChild(cityName);
    pastCitiesEl.appendChild(cityButton);
  }

  return citiesParsed;
});

function saveCitiesToStorage(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

const citySubmitHandler = function (event) {
  event.preventDefault();

  if (!cityInputEl.value) {
    alert("Entry cannot be blank. Please enter a valid city name.");
  } else {
    document.getElementById(`right-content`).style.visibility = `visible`;

    let dataValue = cityInputEl.value;

    const cities = readCitiesFromStorage();
    cities.push(cityInputEl.value);

    saveCitiesToStorage(cities);

    showCurrentWeather(dataValue);
    showFiveDayForecast(dataValue);

    let cityButton = document.createElement("button");
    cityButton.setAttribute("data-value", dataValue);
    cityButton.classList.add("btn");
    cityButton.classList.add("btn-secondary");
    let cityName = document.createElement("h4");
    cityName.textContent = dataValue;

    cityButton.appendChild(cityName);
    pastCitiesEl.appendChild(cityButton);

    cityInputEl.value = "";
  }
};

function showCurrentWeather(dataValue) {
  const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?q=${dataValue}&units=metric&appid=${apiKey}`;

  fetch(apiUrlToday).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {

        cityNameEl.textContent = `${data.name} ${now.format("DD/MM/YYYY")}`;

        var iconcodeToday = data.weather[0].icon;
        var iconurlToday =
          "https://openweathermap.org/img/w/" + iconcodeToday + ".png";
        $("#wiconToday").attr("src", iconurlToday);

        cityTempEl.textContent = `Temperature: ${data.main.temp} °C`;
        cityWindEl.textContent = `Wind: ${data.wind.speed} m/s`;
        cityHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;
      });
    }
  });
}
