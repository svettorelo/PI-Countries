import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {searchCountry,getCountries,getCountriesOrdered,filterCountry,frontFilter} from "../../actions";
import {useState} from "react";
import './NavBar.css'

export function NavBar(props){

  const [searchValue,setSearchValue]= useState('');
  const {activityList,countries,resultCountries} = props;
  const activitiesOptions = activityList.map(act=><option id={act} name={act} value={act}>{act}</option>);
  let con=[];
  const continentOptions = countries.sort(compare)
    .filter(e=>{if (con.includes(e.continent)) return false; else {con.push(e.continent); return true;}})
    .map(c => <option name={c.continent} key={c.continent} value={c.continent}>{c.continent}</option>)
  function compare(a,b) {
    if (a.continent < b.continent) return -1;
    if (a.continent > b.continent) return 1;
    return 0;
  }

  function handleSearch(ev){
      ev.preventDefault();
      props.searchCountry(searchValue);
      if(!resultCountries.length) setSearchValue('');
    }
  function handleOrder(ev){
    ev.preventDefault();
    switch (ev.target.value){
      case 'none':
        props.getCountries();
        break;
      case 'abc':
        props.getCountriesOrdered('ASC','name');
        break;
      case 'zyx':
        props.getCountriesOrdered('DESC','name');
        break;
      case 'pAsc':
        props.getCountriesOrdered('ASC','population');
        break;
      case 'pDesc':
        props.getCountriesOrdered('DESC','population');
        break;
      default:
        props.getCountries();
    }
  }
  function handleFilter(ev){
    ev.preventDefault();
    props.filterCountry(ev.target.value);
  }
  function handleFrontFilter(ev){
    ev.preventDefault();
    props.frontFilter(ev.target.value);
  }
  function clearSearch(){
      props.getCountries();
      setSearchValue('')
    }

    return (
    <div className="bar">
      <Link to="/activity">
      <button>New activity</button>
      </Link>
      <form id={'search'} onSubmit={(e)=>handleSearch(e)}>
        <input autoComplete="off" type="search" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
        <input type="submit" value="Search"/>
        <button onClick={()=>clearSearch()}>Clear</button>
      </form>
      <form id={'order'} onChange={(e)=>handleOrder(e)}>
      Order:{' '}
      <select id="order">
        <option value="none">   </option>
        <option value="abc"> A ► Z </option>
        <option value="zyx"> Z ► A </option>
        <option value="pAsc"> Population ▲ </option>
        <option value="pDesc"> Population ▼ </option>
      </select>
      </form>
      Filter
      <form id={'actFilter'} onChange={(e)=>handleFrontFilter(e)}>
      <select>
        <option value="none">CONTINENT</option>
        {continentOptions}
      </select>
      </form>
      <form id={'contFilter'} onChange={(e)=>handleFilter(e)}>
      <select>
        <option value="none">ACTIVITY</option>
        {activitiesOptions}
      </select></form>
      </div>
  )
}
const mapStateToProps = (state) => ({     //subscribe component to state.searchResult
  resultCountries: state.resultCountries,
  activityList: state.activityList,
  countries: state.countries
});
function mapDispatchToProps(dispatch){
    return {
      searchCountry: (country) => dispatch(searchCountry(country)),
      getCountries: () => dispatch(getCountries()),
      getCountriesOrdered: (order,param)=>dispatch(getCountriesOrdered(order,param)),
      filterCountry: (activityName)=>dispatch(filterCountry(activityName)),
      frontFilter: (continent)=> dispatch(frontFilter(continent))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);