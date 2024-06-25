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