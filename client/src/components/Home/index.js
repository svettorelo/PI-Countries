import CountriesGrid from "../CountriesGrid";
import NavBar from "../NavBar";
import './Home.css'

export default function Home(){
  return (
    <div className="home">
      <img title="Home" name="img" width={50} src='https://static.thenounproject.com/png/2002086-200.png' alt='home'/>
      <label htmlFor="img">Home</label><br/>
      <NavBar className="bar"/>
      <CountriesGrid/>
    </div>
  )
}

//https://www.seekpng.com/png/detail/333-3336288_repertoire-country-icon-black-png.png
