import {useState, useEffect } from "react"
import axios from "axios"

const SearchBar = ({search, handleSearch}) => (
  <div>
        search country <form>
          <input value = {search}
          onChange={(event) => handleSearch(event.target.value)}/>
          </form>
    </div>
)

const CountryInfo = ({country}) => {
return (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h3>Languages</h3>
    <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
    <img src={country.flags["png"]} alt="flag"></img>
  </div>
)
}

const Weather = ({country}) => {
  const [weatherReport, setWeatherReport] = useState(null)

  const [lat, lng] = country.latlng

  const weatherHook = () => {
    axios
    .get("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lng+"&units=imperial&appid="+process.env.REACT_APP_API_KEY)
    .then(response => {
      setWeatherReport(response.data.list[0])
    })}

    useEffect(weatherHook, [])

    if (weatherReport){
    return (
      <div>
        <h1> Weather in {country.capital} </h1>
        <div> Temperature {weatherReport.main.temp} Celcius</div>
        <img src={"http://openweathermap.org/img/wn/"+weatherReport.weather[0].icon+"@2x.png"} alt="flag"></img>
        <div>wind {weatherReport.wind.speed} m/s</div>
      </div>
    )}

  }

  const ShowCountry = ({country, handleReturn}) => (
    <div>
    <CountryInfo country={country} />
    <Weather country = {country} />
    <br></br>
    <button onClick={()=> handleReturn("")}>
      return to search
    </button>
    </div>
  )

const Display = ({search, countriestoShow, shortCut, setShortCut}) => {
  
  if (shortCut){
    return (
      <ShowCountry country = {shortCut} handleReturn = {setShortCut} />
    )
  }

  if (search) {
    if (countriestoShow.length == 1){
      return (
        <ShowCountry country = {countriestoShow[0]} handleReturn = {setShortCut} />
      )
    } else if (countriestoShow.length <= 10) {
      return (
        <ul>
          {countriestoShow.map(country => 
          <li key={country.name.common}>{country.name.common} <button onClick={() => setShortCut(country)}>
            show
            </button> 
          </li> )}
        </ul>
      )
    } else {
      return ("Too many matches, specify another filter")
    }
  } else {
    return ("")
  }

}



const App = () => {

  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")  // controlled component for user-submitted input
  const [shortCut, setShortCut] = useState("")
  const [resetShortCut, setReset] = useState(false)
  // Get Country Data
  const hook = () => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  // Filter search 
  const handleSearch = (event) => {

    setNewSearch(event.target.value)
  }
  const searchCountries = () => countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))

    return (
      <div>
      <SearchBar search = {newSearch} handleSearch={setNewSearch} />
      <Display search = {newSearch} countriestoShow = {searchCountries()} shortCut = {shortCut} setShortCut = {setShortCut} />
      </div>
    )
}

export default App