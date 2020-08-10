class Weather{
  constructor(city, country){
    this.apikey = '1aac82e9e17dd88de8bbb8c61de06052';
    this.city = city;
    this.country = country;
  }

  //Fetch weather from API
  async getWeather(){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&APPID=1aac82e9e17dd88de8bbb8c61de06052`)

    const responseData = await response.json();

    return responseData;
  }

  //Change Weather location
  changeLocation(city, country) {
    this.city = city;
    this.country = country;
  }
}