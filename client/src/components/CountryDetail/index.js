import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import './CountryDetail.css'
import {getCountryDetail,clearCountryDetail,getCountries} from "../../actions";
let i=1;
let icons = {
  spring:'https://static.thenounproject.com/png/1258985-200.png',
  winter: 'https://static.thenounproject.com/png/1764771-200.png',
  fall: 'https://static.thenounproject.com/png/3676597-200.png',
  summer:'https://static.thenounproject.com/png/461965-200.png'//2408381
}
export function CountryDetail(props){
const {id} = props.match.params;
const {country,getCountryDetail} = props;

useEffect(()=>{
  getCountryDetail(id);
  },[getCountryDetail,id]);

const activities = country.activities.map(c=>{
  return (<div className="activity" key={i++}>
      <p><strong><big>{c.name}</big></strong></p>
    <img  width={40} alt={'season'} src={icons[c.season]}/>
      <p>Season: {c.season}</p>
      <p>Duration: {c.duration} hs</p>
      <p>Difficulty: {c.difficulty}</p>
    </div>
  )
})

  return (
    <div className="back">
      <Link to="/home">
        <button className="homebutton" onClick={props.clearCountryDetail}>
          <img className="homeImg" title="Home" name="img" width={50} src='https://static.thenounproject.com/png/2002086-200.png' alt='home'/>
        </button>
      </Link><br/>
      <div>
        <h1 className="countryTitle">{country.name}</h1>
      </div>
      <div className="detail">
        <div className="description">
          <br/>
          <img src={country.flag} height={200} width={280} alt="flag"/>
          <h4>Code: {country.id}</h4>
        </div>
        <div className="description">
          <p><strong>Capital: </strong>{country.capital}</p>
          <p><strong>Subregion: </strong>{country.subregion}</p>
          <p><strong>Continent: </strong>{country.continent}</p>
          <p><strong>Area: </strong>{country.area} km<sup>2</sup></p>
          <p><strong>Population: </strong>{country.population}</p>
        </div>
      </div>
        <h3 className="actTitle">Activities: {country.activities.length? null :'this country has no activities associated yet'}</h3>
        <div className="activities" >{activities}</div>

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