let allDays = [
  "Sunday ",
  "Monday ",
  "Tuesday ",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday ",
];
let allIcons = [
  "clear sky",
  "clouds",
  "few clouds",
  "haze",
  "heavy snow",
  "mist",
  "rain",
  "shower rain",
  "snow",
  "thunderstorm",
  "drizzle",
];
//////////////////////// all functions
function showWeather(response) {
  document.querySelector("span#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  mainCtemp = response.data.main.temp;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  maxMainTemp = response.data.main.temp_max;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  minMainTemp = response.data.main.temp_min;

  //change main icon

  let headImg = document.querySelector("div img.head-img");
  let mainWeather = response.data.weather[0].main.toLowerCase();
  let descriptionWeather = response.data.weather[0].description.toLowerCase();
  for (let i = 0; i < allIcons.length; i++) {
    if (descriptionWeather.localeCompare(allIcons[i]) === 0) {
      headImg.src = `images/${allIcons[i]}.gif`;
    } else if (mainWeather.localeCompare(allIcons[i]) === 0) {
      headImg.src = `images/${allIcons[i]}.gif`;
    } else if (response.data.weather[0].icon === "50n") {
      headImg.src = `images/mist.gif`;
    }
  }
}
function searchCity(event) {
  event.preventDefault();

  if (input.value) {
    let city = document.querySelector("div.city-info h2");
    input.value = input.value.trim().toLowerCase();
    city.innerHTML = `<em><strong>${
      input.value.charAt(0).toUpperCase() + input.value.slice(1)
    }</strong></em>`;
  } else {
    alert("please enter a city");
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);

  input.value = "";
}
function findMyLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  function retrievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(myUrl).then(showWeather);
    axios.get(myUrl).then(function myCityName(response) {
      document.querySelector(
        "div.city-info h2"
      ).innerHTML = `<em><strong>${response.data.name}</strong></em>`;
    });
  }
}
function changeF(event) {
  event.preventDefault();

  FchangeFormula("span#temp", mainCtemp);
  FchangeFormula("#max-temp", maxMainTemp);
  FchangeFormula("#min-temp", minMainTemp);

  fLink.classList.add("isDisabled");
  cLink.classList.remove("isDisabled");
}
function changeC(event) {
  event.preventDefault();

  CchangeFormula("span#temp", mainCtemp);
  CchangeFormula("#max-temp", maxMainTemp);
  CchangeFormula("#min-temp", minMainTemp);

  cLink.classList.add("isDisabled");
  fLink.classList.remove("isDisabled");
}
function FchangeFormula(place, temp) {
  let Fweather = (temp * 9) / 5 + 32;
  document.querySelector(place).innerHTML = `${Math.round(Fweather)}°`;
}
function CchangeFormula(place, temp) {
  document.querySelector(place).innerHTML = `${Math.round(temp)}°`;
}
/////////////// api
let apiKey = "a94ab690eaf15d9347e2d7ea11287c43";
let firstApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
axios.get(firstApiUrl).then(showWeather);

//showing the time
let now = new Date();

let day = document.querySelector("h5 span#day");
day.innerHTML = allDays[now.getDay()];
let myTime = document.querySelector("h5 span#time");
if (now.getMinutes() > 9 && now.getHours() > 9) {
  myTime.innerHTML = `${now.getHours()} : ${now.getMinutes()}`;
} else if (now.getMinutes() <= 9 && now.getHours() > 9) {
  myTime.innerHTML = `${now.getHours()} : 0${now.getMinutes()}`;
} else if (now.getMinutes() > 9 && now.getHours() <= 9) {
  myTime.innerHTML = `0${now.getHours()} : ${now.getMinutes()}`;
} else {
  myTime.innerHTML = `0${now.getHours()} : 0${now.getMinutes()}`;
}

//changing city name
let input = document.querySelector("input.form-control");
let submitCity = document.querySelector(".submit-city");

submitCity.addEventListener("click", searchCity);
//find my city

let findMyCity = document.querySelector(".my-city");

findMyCity.addEventListener("click", findMyLoc);

//changing C and F main temp

let fLink = document.querySelector("a.fLink");
let cLink = document.querySelector("a.cLink");
cLink.classList.add("isDisabled");

fLink.addEventListener("click", changeF);

cLink.addEventListener("click", changeC);

let mainCtemp = null;
let maxMainTemp = null;
let minMainTemp = null;
