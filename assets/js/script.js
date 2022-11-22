var searchButton = document.getElementById('searchButton')

var apiKey = '9cfe7036b90b3a13af1a88f6bf534b32'


var allInfo = document.querySelector('.allWeather')
var currentBox = document.querySelector('.currentWeather')

var searchHis = document.getElementById('history')
//functions
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
        renderResults(data)
        console.log(data)
         })
}

function renderResults(data) {
    var forecast = document.querySelector('.forecast')
    
    for( var i = 7; i < data.list.length; i+=8) {
        var card = document.createElement('div')
        var icon = data.list[i].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
        var tempinF = Math.round(1.8*(data.list[i].main.temp-273)+32)
        var unixDate = (data.list[i].dt) * 1000
        var dateString = moment(unixDate).format('MM/DD/YYYY')
        var windSpeed = Math.ceil(data.list[i].wind.speed * 2.23)
        var content = `
        <div class='card border-dark' id='cards'>
            <div>
                    <p class="date1">${dateString}</p>
                    <img src="${iconUrl}">
                    <p class="temp1">Temp: ${tempinF} °F</p>
                    <p class="wind1">Wind: ${windSpeed} MPH</p>
                    <p class="humid1">Humidity: ${data.list[i].main.humidity} %</p>
            </div>
        </div>`
        card.innerHTML = content
        forecast.appendChild(card)
    }
    returnInput()
}

function returnInput() {
    var userInput = document.querySelector('.userInput').value
    
    var button1 = document.createElement('button')
    button1.textContent = userInput 
    searchHis.appendChild(button1)
}

searchButton.addEventListener('click', getCurrentWeather)
searchButton.addEventListener('click', getWeatherForcast)
