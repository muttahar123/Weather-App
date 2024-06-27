const apikey = "89fec250fa79ac58077762911be97acb";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=lahore";

  // Set default values for elements
document.querySelector(".name").innerHTML = "Enter a city to get the weather.";
document.querySelector(".temp").innerHTML = "--°c";
document.querySelector(".humidity").innerHTML = "--%";
document.querySelector(".wind").innerHTML = "-- km/h";
document.querySelector(".cloud").innerHTML = "-- %";

  const searchBox = document.querySelector(".search");
  const searchBtn = document.querySelector(".submit");
  const weatherIcon = document.querySelector(".weather img");
  const condition = document.querySelector(".weather span")

  async function checkWeather( ) {
  const response = await fetch(apiUrl +  `&appid=${apikey}`);
  var data = await response.json();
  console.log(data);

  document.querySelector(".name").innerHTML = data.name + "";
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(`.humidity`).innerHTML = data.main.humidity + "%";
  document.querySelector(`.wind`).innerHTML = data.wind.speed + " km/h";
  document.querySelector(`.cloud`).innerHTML = data.clouds.all + " %";

  if(data.weather[0].main == 'Clouds'){
    weatherIcon.src = "assest/cloudy.png";
    condition.innerHTML = "Cloudy";
    // Set a new background image for the body
document.body.style.backgroundImage = "url('assest/day/cloudy.jpg')";

}else if(data.weather[0].main == 'Clear'){
    weatherIcon.src = 'assest/sun.png';
    condition.innerHTML = "clear";

}else if(data.weather[0].main == 'Rain'){
    weatherIcon.src = 'assest/drizzle.png';
    condition.innerHTML = "Rain";

}else if(data.weather[0].main == 'Drizzle'){
    weatherIcon.src = 'assest/rain.png';
    condition.innerHTML = "drizzle";

}else if(data.weather[0].main == 'Mist'){
    weatherIcon.src = 'assest/fog.png';
    condition.innerHTML = "Mist";
}else if(data.weather[0].main == 'Smoke'){
    weatherIcon.src = 'assest/smoke.png';
    condition.innerHTML = "Smoke";
    document.body.style.backgroundImage = "url('assest/night/cloudy.jpg')";

}else if(data.weather[0].main == 'Haze'){
    weatherIcon.src = 'assest/fog.png';
    condition.innerHTML = "Haze";

}
  }

// searchBtn.addEventListener("click" , () =>{
//     checkWeather(searchBox.value);
// })

  checkWeather();