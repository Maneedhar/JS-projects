class UI{
  constructor(){
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temp = document.getElementById('w-temp');
    this.icon = document.getElementById('w-icon');
    this.details = document.getElementById('w-details');
    this.feelsLike = document.getElementById('w-feels-like');
    this.humidity = document.getElementById('w-humidity');
    this.pressure = document.getElementById('w-pressure');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather){
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.temp.textContent = `${weather.main.temp}°C`;
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
    this.pressure.textContent = `Pressure: ${weather.main.pressure} hPa`;
    this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like}°C`;
    this.wind.textContent = `Wind Speed: ${weather.wind.speed} m/s from the ${this.calcWindDir(weather.wind.deg)}`; 
    this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  }

  calcWindDir(degrees) {
    let windDir;
    switch (true) {
      case (degrees > 0 && degrees < 23):
      case (degrees > 337 && degrees < 360):
        windDir = 'N';
        break;
      case (degrees > 22 && degrees < 68):
        windDir = 'NE';
        break;
      case (degrees > 67 && degrees < 113):
        windDir = 'E';
        break;
      case (degrees > 112 && degrees < 158):
        windDir = 'SE';
        break;
      case (degrees > 157 && degrees < 203):
        windDir = 'S';
        break;
      case (degrees > 202 && degrees < 248):
        windDir = 'SW';
        break;
      case (degrees > 247 && degrees < 293):
        windDir = 'W';
        break;
      case (degrees > 293 && degrees < 338):
        windDir = 'NW';
        break;
    }
    return windDir;
  }
}