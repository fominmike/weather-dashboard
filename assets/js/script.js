var searchButton = document.getElementById('searchButton')

var apiKey = '9cfe7036b90b3a13af1a88f6bf534b32'


function getApi(e) {
    e.preventDefault()
    
    var userInput = document.querySelector('.userInput').value
    
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`
    
    
    fetch(requestUrl)
    .then(function(response) {
        return response.json()
    }) 
     .then(function(data){
        console.log(data)
         })

}

function getWeatherForcast() {

    var userInput = document.querySelector('.userInput').value

    var requestUrl = `https://api.openweathermap.org/data/2.5/forcast?q=${userInput}&appid=${apiKey}`


    fetch(requestUrl)
    .then(function(response) {
        return response.json()
    }) 
     .then(function(data){
        console.log(data)
         })
}



searchButton.addEventListener('click', getApi)

