import './App.css';
import React,{useEffect,useState} from "react"; //mio
import axios from 'axios';  //mio

function App() {
  const [countries,setCountries] = useState([]);//
  useEffect(()=>{
    axios.get('http://localhost:3001/countries?page=0')
      .then(response => {
        setCountries(response.data.countries);
        const pageNumbers = response.data.pages;
      });
  },[]);
  let countryData = countries.map(c=>{
    return (
      <div key={Math.random()}>
        <h2>{c.name}</h2>
        <h4>{c.continent}</h4>
        <img src={c.flag} height={120} width={200} alt='flag not found'/>
      </div>
    )
  })
  return (
    <div className="App">
      {countryData}
      {/*<h1>Henry Countries</h1>*/}
    </div>
  );
}

export default App;
