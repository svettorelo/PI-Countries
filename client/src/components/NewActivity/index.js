import {Link} from "react-router-dom";
import './NewActivity.css'
import {connect} from "react-redux";
import {useState} from "react";
import {addActivity} from "../../actions";
//import axios from "axios";

export function NewActivity(props){
  function compare(a,b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  const [activity,setActivity] = useState({season: '', countryId: [], name: '', duration: 0, difficulty: 1});
  const {countries} = props
  const seasons = ['summer','winter','spring','fall']
  const selectList = [...countries].sort(compare).map(country => <option key={country.id} name={country.id} value={country.id}>{country.name}</option>)
//const {name,difficulty,duration,season,countryId} = req.body;

  function changeValues(e){
    e.preventDefault();
    setActivity({...activity,[e.target.name]:e.target.value});
  }
  function postActivity(e){
    e.preventDefault();
    if(!seasons.includes(activity.season)) alert('Please write season name correctly')
    else if(!((activity.name!=='')&&activity.duration>0)) {
      alert("Please complete all fields!");
    }
    else {
      props.addActivity(activity);
      setActivity({season: '', countryId: [], name: '', duration: 0, difficulty: 1}); //to clear all fields after submitting
    }
  }
  return (
    <div>
      <Link to="/home">
      <img title="Home" name="img" width={50} src='https://static.thenounproject.com/png/2002086-200.png' alt='home'/>
      </Link>Home<br/>
      <fieldset>
        <legend><h2>Add new activity</h2></legend>
      <form name={"actForm"} onSubmit={e=>postActivity(e)}  autoComplete="off">
        <label htmlFor="name">Activity name: </label>
        <input name="name" type="text" value={activity.name} onChange={(e)=>changeValues(e)} required={true}/><br/>
        <label htmlFor="difficulty">Difficulty: </label>
        <input className='difSelector' list="dif" name="difficulty" required={true} type="range" min="1" max="5" step="1" value={activity.difficulty} onChange={(e)=>changeValues(e)}/><br/>
        <datalist id="dif">
          <option value='1'/>
          <option value='2'/>
          <option value='3'/>
          <option value='4'/>
          <option value='5'/>
        </datalist>
        <div> _1___2___3___4___5_</div>
        <label htmlFor="duration">Duration (hs): </label>
        <input type="number" name="duration" min="0" required={true} value={activity.duration} onChange={(e)=>changeValues(e)}/><br/>
        <label htmlFor="season">Season: </label>
        <input list="seasons" required={true} name="season" value={activity.season} onChange={(e)=>changeValues(e)}/> <br/>
            <datalist id="seasons">
              <option value="summer"/>
              <option value="fall"/>
              <option value="winter"/>
              <option value="spring"/>
            </datalist>
        {/*<select name="season" defaultValue={''} value={activity.season} onChange={(e)=>changeValues(e)}>*/}
        {/*  <option key="SEASON" value="">SEASON</option>*/}
        {/*  <option key="summer" value="summer">summer</option>*/}
        {/*  <option key="fall" value="fall">fall</option>*/}
        {/*  <option key="winter" value="winter">winter</option>*/}
        {/*  <option key="spring" value="spring">spring</option>*/}
        {/*</select >*/}
        <br/>
        <label htmlFor="countryId">Select countries related to this activity: </label><br/>
        <select multiple={true} id="countryId" required={true} value={activity.countryId} name="countryId" size="10" onChange={(e)=>{
          setActivity({...activity,countryId:Array.from(e.target.selectedOptions).map(el=>el.value)})
        }}>
          {selectList}
        </select><br/>
        <input type="submit" />
      </form>
      </fieldset>
    </div>
  )
}
const mapStateToProps = (state) => ({     //subscribe component to state.selectedCountry
  countries: state.countries
});
function mapDispatchToProps(dispatch){
  return {
    addActivity: (activity) => dispatch(addActivity(activity))}
}
export default connect(mapStateToProps,mapDispatchToProps)(NewActivity);