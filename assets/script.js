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

function showFiveDayForecast(dataValue) {
  const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${dataValue}&units=metric&appid=${apiKey}`;

  fetch(apiUrlFiveDays).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {


        document.getElementById(`day1Date`).textContent = now
          .add(1, "day")
          .format("DD/MM/YYYY");

        var iconcode1 = data.list[7].weather[0].icon;
        var iconurl1 = "https://openweathermap.org/img/w/" + iconcode1 + ".png";
        $("#wicon1").attr("src", iconurl1);

        document.getElementById(`day1Weather`).textContent =
          `Temp: ` + data.list[7].main.temp + ` °C`;
        document.getElementById(`day1Wind`).textContent =
          `Wind: ` + data.list[7].wind.speed + ` m/s`;
        document.getElementById(`day1Humidity`).textContent =
          `Humidity: ` + data.list[7].main.humidity + `%`;

        document.getElementById(`day2Date`).textContent = now
          .add(2, "day")
          .format("DD/MM/YYYY");

        var iconcode2 = data.list[15].weather[0].icon;
        var iconurl2 = "https://openweathermap.org/img/w/" + iconcode2 + ".png";
        $("#wicon2").attr("src", iconurl2);

        document.getElementById(`day2Weather`).textContent =
          `Temp: ` + data.list[15].main.temp + ` °C`;
        document.getElementById(`day2Wind`).textContent =
          `Wind: ` + data.list[15].wind.speed + ` m/s`;
        document.getElementById(`day2Humidity`).textContent =
          `Humidity: ` + data.list[15].main.humidity + `%`;

        document.getElementById(`day3Date`).textContent = now
          .add(3, "day")
          .format("DD/MM/YYYY");

        var iconcode3 = data.list[23].weather[0].icon;
        var iconurl3 = "https://openweathermap.org/img/w/" + iconcode3 + ".png";
        $("#wicon3").attr("src", iconurl3);

        document.getElementById(`day3Weather`).textContent =
          `Temp: ` + data.list[23].main.temp + ` °C`;
        document.getElementById(`day3Wind`).textContent =
          `Wind: ` + data.list[23].wind.speed + ` m/s`;
        document.getElementById(`day3Humidity`).textContent =
          `Humidity: ` + data.list[23].main.humidity + `%`;

        document.getElementById(`day4Date`).textContent = now
          .add(4, "day")
          .format("DD/MM/YYYY");

        var iconcode4 = data.list[31].weather[0].icon;
        var iconurl4 = "https://openweathermap.org/img/w/" + iconcode4 + ".png";
        $("#wicon4").attr("src", iconurl4);

        document.getElementById(`day4Weather`).textContent =
          `Temp: ` + data.list[31].main.temp + ` °C`;
        document.getElementById(`day4Wind`).textContent =
          `Wind: ` + data.list[31].wind.speed + ` m/s`;
        document.getElementById(`day4Humidity`).textContent =
          `Humidity: ` + data.list[31].main.humidity + `%`;

        document.getElementById(`day5Date`).textContent = now
          .add(5, "day")
          .format("DD/MM/YYYY");

        var iconcode5 = data.list[39].weather[0].icon;
        var iconurl5 = "https://openweathermap.org/img/w/" + iconcode5 + ".png";
        $("#wicon5").attr("src", iconurl5);

        document.getElementById(`day5Weather`).textContent =
          `Temp: ` + data.list[39].main.temp + ` °C`;
        document.getElementById(`day5Wind`).textContent =
          `Wind: ` + data.list[39].wind.speed + ` m/s`;
        document.getElementById(`day5Humidity`).textContent =
          `Humidity: ` + data.list[39].main.humidity + `%`;
      });
    }
  });
}