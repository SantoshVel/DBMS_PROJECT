
import { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import './App.css'
import searchIcon from "./assets/search.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import cloudIcon from "./assets/cloud.png";
import cloudyIcon from "./assets/cloudy.png";
import snowIcon from "./assets/snowy.png";
import rainIcon from "./assets/storm.png";
import clearIcon from "./assets/clear.png";

const WeatherFun =({icon,temp,city,country,lat,long,hum,win})=>{
return (<>
<div className="images">
  <img src={icon} alt=""/>
</div>
<div className="temperature">{temp} C</div>
<div className="city">{city}</div>
<div className="country">{country}</div>
<div className="latlon">
  <div>
  <span className='lat'>latitude</span>
  <span>{lat}</span>
  </div>
  <div className='long'>
  <span>Longitude</span>
  <span>{long}</span>
  </div>
</div>
<div className="humwind">
  <div className="hum">
    <img src={humidity} alt="" />
    <div className="humdata">{hum} %</div>
    <div className="hdata">Humidity</div>
  </div>
  <div className="wind">
    <img src={wind} alt="" />
    <div className="winddata">{win} km/h</div>
    <div className="wdata">Wind Speed</div>
  </div>
</div>
</>
)
}
WeatherFun.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  hum:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  long:PropTypes.number.isRequired,
  win:PropTypes.number.isRequired,

}
function App() {
  const apiKey="eb5796b3690843a53708cbbb817207d9";
  const [text,setText]=useState("Chennai");
 const [icon,setIcon]=useState(cloudyIcon);
 const [temp,setTemp]=useState(0);
 const [city,setCity]=useState("");
 const [country,setCountry]=useState("");
 const [lat,setLat]=useState(0);
 const[long,setlong]=useState(0);
 const[hum,setHum]=useState(0);
 const[win,setWin]=useState(0);
 const[cityNotFound,setcityNotFound]=useState(false);
 const[loading,setLoading]=useState(false);
 const[error,setError]=useState(null);
 const WeatherIconMap={
  "01d":clearIcon,
  "01n":clearIcon,
   "02d":cloudIcon,
   "02n":cloudIcon,
   "03d":cloudyIcon,
   "03n":cloudyIcon,
   "04d":cloudyIcon,
   "04n":cloudyIcon,
   "09d":rainIcon,
   "09n":rainIcon,
   "10d":rainIcon,
   "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,
  }
 const search = async ()=>{
  setLoading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
  try{
let res=await fetch(url);
let data=await res.json();
if(data.cod==="404"){
  console.error("City Not Found");
  setcityNotFound(true);
  setLoading(false);
  return;
}
setHum(data.main.humidity);
setTemp(Math.floor(data.main.temp));
setCity(data.name);
setCountry(data.sys.country);
setLat(data.coord.lat);
setlong(data.coord.lon);
setWin(data.wind.speed);
const weatherIconcode=data.weather[0].icon;
setIcon(WeatherIconMap[weatherIconcode] || clearIcon);
setcityNotFound(false);

  }
  catch(error){
    console.error("Error occured",error.message);
    setError("Error Occured");
  }
  finally{
 setLoading(false);
  }
  }
  const handlecity = (e) =>{
   setText(e.target.value);
  }
  const handleKeyDown =(e)=>{
    if(e.key==="Enter"){
      search();
    }
  }
  useEffect(function(){
    search();
  },[])
  return (
    <>
      <div className="container">
        <div className="textbox">
          <input type="text"  onChange={handlecity} value={text} onKeyDown={handleKeyDown}/>
          <div className="image" onClick={()=>search()}>
            <img src={searchIcon} alt="" />
          </div>
        </div>
       
        {loading && <div className="loading">Loading...</div> }
        {error && <div className="error">{error}</div> }
        {cityNotFound  && <div className="cityNotFound">City Not Found</div> }
    {!cityNotFound && !error && <WeatherFun icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} hum={hum} win={win}/>}
      <div className="super">Design by J.Rahul</div>
      </div>
      
    </>
  )
}

export default App
