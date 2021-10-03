import {Link} from "react-router-dom";
import './NewActivity.css'
import {connect} from "react-redux";
import {useState} from "react";

export function NewActivity(props){
  const [activity,setActivity] = useState({});
  const selectList = props.listAll.map(country => <option name={country.id} value={country.id}>{country.name}</option>)
//const {name,difficulty,duration,season,countryId} = req.body;

  function changeValues(e){
    e.preventDefault();
    setActivity({...activity,[e.target.name]:e.target.value});
    console.log(activity);
  }
  function postActivity(e){
    e.preventDefault();
    console.log(activity);
  }
  return (
    <div>
      <Link to="/home">HOME</Link><br/>
      <h2>Add a new activity</h2>
      <form  onSubmit={e=>postActivity(e)}  autoComplete="off">
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
        <input type="number" name="duration" value={activity.duration} onChange={(e)=>changeValues(e)}/><br/>
        <label htmlFor="season">Season: </label>
          <input list="seasons" name="season" value={activity.season} onChange={(e)=>changeValues(e)}/> <br/>
            <datalist id="seasons">
              <option value="summer"/>
              <option value="fall"/>
              <option value="winter"/>
              <option value="spring"/>
            </datalist>
        <br/>
        <label htmlFor="countriesId">Select countries related to this activity: </label><br/>
        <select multiple name="countriesId" size="10" onChange={(e)=>changeValues(e)}>
          {selectList}
        </select><br/>
        <input type="submit" />
      </form>
    </div>
  )
}
const mapStateToProps = (state) => ({     //subscribe component to state.selectedCountry
  listAll: state.countryList
});

export default connect(mapStateToProps,null)(NewActivity);