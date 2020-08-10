//Initialize Storage
const storage = new Storage;

//Get stored Location Data
const weatherLocation = storage.getLocationData();

//Initialize weather object
const weather = new Weather(weatherLocation.city, weatherLocation.country)

//Initialize UI Object
const ui = new UI;

//get weather on dom load
document.addEventListener('DOMContentLoaded', getWeather)

//change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;

  weather.changeLocation(city, country);

  //Set location in LS
  storage.setLocationData(city, country)

  //get and display weather after location change
  getWeather();

  //close the model
  $('#locModal').modal('hide');
})

function getWeather()
  {
    weather.getWeather()
    .then(res => {
      ui.paint(res)
    })
    .catch(err => console.log(err));
  }