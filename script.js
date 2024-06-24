//get all nessary elements from the dom
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOuntput = document.querySelector(".wind");
const form = document.querySelector(".locationinput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelector(".city");

// default city when page loads
let cityInput = "Karachi";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // change from default city to the cliked one
    cityInput = e.target.innerHTML;

    fetchWeatherData();
    // fade out the app (simple animation)
    app.computedStyleMap.opacity = "0";
  });
});

//  add submit event to the form
form.addEventListener("submit", (e) => {
  if (search.ariaValueMax.lenght == 0) {
    alert("please type in a city name");
  } else {
    cityInput = search.ariaValueMax;

    fetchWeatherData();

    search.value = "";

    app.computedStyleMap.opacity = "0";
  }

  e.preventDefault();
});

function dayOfWeek(day, month, year) {
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDay[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWeatherData() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid={API key}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfWeek(d, m, y)} ${d}, ${m} , ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".lenght
      );

      icon.src = "./icons/" + iconId;

      cloudOutput.innerHTML= data.current.cloud + "%";
      humidityOutput.innerHTML= data.current.humidity + "%";
      windOuntput.innerHTML= data.current.wind_kph + "km/h";

      let timeOfDay ="day";
      const code =  data.current.condition.code;


      if (!data.current.is_day) {
        timeOfDay="night";
      }

      if(code == 1000){
        app.style.backgroundImage=`url(./image/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#e5ba92";
      }
    });
}
