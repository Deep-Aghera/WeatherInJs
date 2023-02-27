
const dataUrl = "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/";


    window.onload = chainFun();
    function chainFun() {
      populateCity();
      getCityDetails();
    }

    async function populateCity(){
    let selectCity = document.getElementById("city");

    selectCity.innerHTML = `<option value="All-Places">All Places</option>`;
    

    let cityArray = await getCity();
    console.log("here at city",cityArray);  
    let optionString = ``;
   cityArray.city.map(function(city) {
    optionString+= `<option value="${city.name}">${city.name}</option>`;
     })

     selectCity.innerHTML += optionString;
     
    console.log("here at city",cityArray);
}

 function getCity() {
  let cityDataUrl = dataUrl + "india-popular-city.json";

   let cityData =fetchData(cityDataUrl);
   return cityData;
}

// Fetch Function 
//    Fetch Function Using 

/*
  function fetchData(url) {
  let AllData =  fetch(url)
  .then((response) => response.json())
  .then(function(data) {
    //console.log(data);
     return data;
   });
   return AllData

 } */

// Fetch Function Using async/await
async function fetchData(url) {
  let Data = await fetch(url);
  let NewData =  Data.json();
  return NewData
}

//getCity();
 

//                                                                 getCity Detail
 
async function getCityDetails() {
  let cityDetails  = await fetchData(dataUrl + 'make-your-trip-package.json');
  console.log(cityDetails);
  let detailSection  = document.getElementById("allDetail");
  console.log(detailSection);
  let temp = ``;
  cityDetails.map((city) => {
    temp += `<div class="cityDetailSection" id="cityDetailSection">
    <div class="city-detail-element">
                <div class="first-derail">
                    <p><b>${city.cityName}</b></p>
                    <p>${city.tourDate}</p>
                    <p>${city.category}</p>
                </div>
                <div class="temprature">
                    <p>Average temperature</p>
                    <div class="celcus">
                        ${city.temp}
                    </div>
                </div>
            </div>
            <div class="piture-detail-element">
                <img id="city-image" src="${city.cityImg}" alt="" srcset="">
            </div>
            <div class="price-detail-elemtn">
                <div class="price-detail-name">
                    <p>Total Price:</p>
                    <h3>${city.price}</h3>
                </div>
               
                <button>Expore</button>
            </div>
        </div>
    
    </div>`
  })

  detailSection.innerHTML  = temp;
}


//                                                                 fetch weather detail 


async function handleSeachClick(e) {
  console.log(e);
  let selecCityEle = document.getElementById("city");
  let city = selecCityEle.value;
  let cityWeatherData =await getWeatherDetailByCity(city);
  let tempElement = document.getElementById("temp-data");
  let tempEle = ` <img src="${cityWeatherData.current.weather_icons}" alt=""> 
  <span> ${cityWeatherData.current.temperature}</span> 
  <span>${cityWeatherData.location.name}</span> 
  <span>${cityWeatherData.location.country}</span> `
  //tempElement.innerHTML = cityWeatherData.current.temperature
  tempElement.innerHTML = tempEle;
}


async  function getWeatherDetailByCity(city="ahmedabad") {
  let weatherDetailUrl = `http://api.weatherstack.com/current?access_key=01271fa4448ab60f28bbf97ecac19ceb&query=${city}`
  let WeatherData = await fetchData(weatherDetailUrl);
  console.log(WeatherData);
  return WeatherData;

}

getWeatherDetailByCity();
