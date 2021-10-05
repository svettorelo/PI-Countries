import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import './CountryDetail.css'
import {getCountryDetail,clearCountryDetail,getCountries} from "../../actions";
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
    props.getCountries(0); //goes to home page 0 AUNQUE DEBERIA IR A SU PAGINA ANTERIOR!
  }

  return (
    <div className="detail">
      <Link to="/home"><button onClick={exitCountryDetail}>Home</button></Link><br/>
      <h1>{country.name}</h1>
      <img src={country.flag} height={200} width={250} alt="flag"/>
      <h4>CODE: {country.id}</h4>
      <span>Capital: {country.capital}</span>
      <span>Subregion: {country.subregion}</span>
      <span>Continent: {country.continent}</span>
      <span>Area: {country.area} units?</span>
      <span>Population: {country.population}</span>
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