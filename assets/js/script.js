var searchButton = document.getElementById('searchButton')

var apiKey = '9cfe7036b90b3a13af1a88f6bf534b32'


var allInfo = document.querySelector('.allWeather')
var currentBox = document.querySelector('.currentWeather')




function getCurrentWeather(e) {
    e.preventDefault()
    
    var userInput = document.querySelector('.userInput').value
    
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`
    
    allInfo.style.display = 'block'

    fetch(requestUrl)
    .then(function(response) {
        return response.json()
    }) 
     .then(function(data){
        console.log(data)

        var date = moment().format("MMM Do YY");
        var name = data.name
        var date1 = document.createElement('h3')
        date1.textContent = name + ` ${date}` 
        currentBox.appendChild(date1)

        var icon = data.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png"
        var img = document.createElement('img')
        img.setAttribute('src', iconurl)
        img.setAttribute('alt', 'weatherIcon')
        currentBox.appendChild(img)

        var temp = Math.floor((data.main.temp - 273.15) * 1.8 + 32)
        newP = document.createElement('p')
        newP.textContent = 'Temperature: ' + temp + '°F'
        currentBox.appendChild(newP)

        var wind = data.wind.speed
        var conversion = Math.ceil(wind * 2.237)
        newP1 = document.createElement('p')
        newP1.textContent = 'Wind Speed: ' + conversion + ' MPH'
        currentBox.appendChild(newP1)

        var humidity = data.main.humidity
        newP2 = document.createElement('p')
        newP2.textContent = 'Humidity: ' + humidity + ' %'
        currentBox.appendChild(newP2)
        })
}

function getWeatherForcast(e) {
    e.preventDefault()

    var userInput = document.querySelector('.userInput').value

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apiKey}`


    fetch(requestUrl)
    .then(function(response) {
        return response.json()
    }) 
     .then(function(data){
        console.log(data)
         })
}


searchButton.addEventListener('click', getCurrentWeather)
searchButton.addEventListener('click', getWeatherForcast)

