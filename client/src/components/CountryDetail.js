import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getCountryDetail,clearCountryDetail,getCountries} from "../actions";
let i=1;

export function CountryDetail(props){
const id = props.match.params.id;
const {country} = props;

useEffect(()=>{
  props.getCountryDetail(id);
  },[]);

const activities = country.activities.map(c=>{
  return (<div key={i++}>
    <h4>Name: {c.name}</h4>
    <p>Season: {c.season}, duration {c.duration} hs, difficulty: {c.difficulty}</p>
    </div>
  )
})
  function exitCountryDetail(){
    props.clearCountryDetail();
    props.getCountries(0); //goes to home page 0
  }

  return (
    <div>
      <Link to="/home"><button onClick={exitCountryDetail}>Home</button></Link><br/>
      <h1>{country.name}</h1>
      <img src={country.flag} height={200} width={250}/>
      <h4>CODE: {country.id}</h4>
      <h3>Capital: {country.capital}</h3>
      <h3>Subregion: {country.subregion}</h3>
      <h3>Continent: {country.continent}</h3>
      <h3>Area: {country.area} units?</h3>
      <h3>Population: {country.population}</h3>
      <h3>Activities: {country.activities.length? null :'this country has no activities associated yet'}</h3>
      {activities}
    </div>
  )
}
const mapStateToProps = (state) => ({     //subscribe component to state.selectedCountry
  country: state.selectedCountry
});
function mapDispatchToProps(dispatch){
  return {
    getCountryDetail: id=>dispatch(getCountryDetail(id)),
    clearCountryDetail: ()=>dispatch(clearCountryDetail()),
    getCountries: page=>dispatch(getCountries(page))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CountryDetail);