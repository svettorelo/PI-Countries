import {connect} from 'react-redux'
import CountryCard from "./CountryCard";
import {Link} from "react-router-dom";
import "./CountriesGrid.css";
import {getCountries} from "../actions";

export function CountriesGrid(props){
// let countr = [{
//   name:"Antarctica",id:"ATA",continent:"Antarctic",area:1.4E7,
//   population:1000,flag:"https://upload.wikimedia.org/wikipedia/commons/b/b5/Emblem_of_the_Antarctic_Treaty.svg"},
//   {name:"Malaysia",id:"MYS",capital:"Kuala Lumpur",
//     continent:"Asia",area:330803.0,population:32365998,
//     flag:"https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg"}]
let i = 1;

 const {countries} = props.countries;

  return (
    countries.map( c => {
    return (
      <div key={i++} >
      <Link to={'/country/'+c.id}>
        <CountryCard  name={c.name} continent={c.continent} flag={c.flag}/>
      </Link>
      </div>
    )}
  ))
}

const mapStateToProps = (state) => ({     //subscribe component to state.countries
  countries: state.countries
});
function mapDispatchToProps(dispatch){
  return {getCountries: (page)=>dispatch(getCountries(page))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CountriesGrid);