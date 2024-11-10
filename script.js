const btn = document.getElementById("searchBtn");
const apiKey = "290bbc08441dd7fb6867db42868b621f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const box = document.getElementById("cityInp");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weather-icon");
const every = document.getElementById("every")
const notFound = document.getElementById("notfound");
const convert = document.getElementById("convert");
let c = true;
async function searchTemp(city)
{
    const api = await fetch(apiUrl + city + "&appid=" + apiKey);
    if(api.status == 404)
    {
        notFound.style.display = "flex";
        every.style.display = "none";
    }
    else{
        
        const result = await api.json();
        const main = result.main;
        const weather = result.weather[0].main;
        temp.textContent = Math.round(main.temp) + "°C";
        humidity.textContent = main.humidity + "%";
        windSpeed.textContent = result.wind.speed + "Km/h";
        if(weather === "Clouds")
        {
            weatherIcon.src = "images/cloudy.png"
        }
        if(weather == "Clear")
        {
            weatherIcon.src = "images/sunny.png"
        }
        if(weather == "Rain")
        {
            weatherIcon.src = "images/rainy.png"
        }
        if(weather == "Snow")
        {
            weatherIcon.src = "images/snowy.png"
        }
        every.style.display = "flex";
        notFound.style.display = "none";
        c = true;
        
    }
}
btn.addEventListener("click",function()
{
    searchTemp(box.value);
})
convert.addEventListener("click",function()
{
    if(c)
    {
        temp.textContent = Math.round((parseInt(temp.textContent) * 9 / 5) + 32) + "°F";
        convert.textContent = "°C";
    }
    else{
        temp.textContent = Math.round((parseInt(temp.textContent) - 32)*5/9) +  "°C";
        convert.textContent = "°F";
    }
    c = !c;
})