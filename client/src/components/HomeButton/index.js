import CountriesGrid from "../CountriesGrid";
import NavBar from "../NavBar";

import './HomeButton.css'

export default function HomeButton(){
     return (
    <div >
      <img title="Home" name="img" width={50} src='https://image.flaticon.com/icons/png/512/44/44748.png' alt='home'/>
      <label htmlFor="img">Home</label>
      <NavBar className="bar"/>
      <CountriesGrid/>
    </div>
  )
}
//https://www.seekpng.com/png/detail/333-3336288_repertoire-country-icon-black-png.png