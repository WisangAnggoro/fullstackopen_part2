import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Countries = ({countries}) => {
  if(countries.length > 10)
  {
    return (
      <div>
        too many matches, specify another filter 
      </div>
    )
  }
  else if (countries.length !== 1)
  {
    return (
      <div>
        {
          countries.map((country,index) => 
            <p key={index}>{country.name}</p>  
          )
        }
      </div>
    )
  } 
  return (
    <div>
      {
        countries.map((country,index) => 
        <>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {
              country.languages.map((language) => 
                <li>{language.name}</li>
              )
            }
          </ul>
          <img src={country.flag} alt={country.name+" flag"} width="400" />
        </>
        )
      }
    </div>
  )
}

const App = () => {
  const [countries, setcountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');
  const visibleCountries = (filterCountry!== '')
    ? countries.filter(country => country.name.indexOf(filterCountry)!==-1)
    : countries
  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        setcountries(response.data)
      )
  }, []);

  return (

    <div>
      <input 
        type="text"
        value={filterCountry}
        onChange={handleFilterChange}
      />
      <Countries countries={visibleCountries}/>
    </div>
  );
}

export default App;
