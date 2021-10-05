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
  const [activity,setActivity] = useState({countryId:[]});
  const {countries} = props
  const selectList = countries.sort(compare).map(country => <option name={country.id} value={country.id}>{country.name}</option>)
//const {name,difficulty,duration,season,countryId} = req.body;

  function changeValues(e){
    e.preventDefault();
    setActivity({...activity,[e.target.name]:e.target.value});
  }
  function postActivity(e){
    e.preventDefault();
    // axios.post('http://localhost:3001/activity',activity)
    //   .then(result=>alert(result.data.message))
    props.addActivity(activity);
  }
  return (
    <div>
      <Link to="/home">HOME</Link><br/>
      <fieldset>
        <legend><h2>Add new activity</h2></legend>
      <form onSubmit={e=>postActivity(e)}  autoComplete="off">
        <label htmlFor="name">Activity name: </label>
        <input name="name" type="text" value={activity.name} onChange={(e)=>changeValues(e)}/><br/>
        <label htmlFor="difficulty">Difficulty: </label>
        <input className='difSelector' list="dif" name="difficulty" type="range" min="1" max="5" step="1" value={activity.difficulty} onChange={(e)=>changeValues(e)}/><br/>
        <datalist id="dif">
          <option value='1'/>
          <option value='2'/>
          <option value='3'/>
          <option value='4'/>
          <option value='5'/>
        </datalist>
        <div> ___________1___2___3___4___5_</div>
        <label htmlFor="duration">Duration (hs): </label>
        <input type="number" name="duration" min="0" value={activity.duration} onChange={(e)=>changeValues(e)}/><br/>
        <label htmlFor="season">Season: </label>
          <input list="seasons" name="season" value={activity.season} onChange={(e)=>changeValues(e)}/> <br/>
            <datalist id="seasons">
              <option value="summer"/>
              <option value="fall"/>
              <option value="winter"/>
              <option value="spring"/>
            </datalist>
        <br/>
        <label htmlFor="countryId">Select countries related to this activity: </label><br/>
        <select multiple id="countryId" value={activity.countryId} name="countryId" size="10" onChange={(e)=>{
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