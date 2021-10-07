import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  searchCountry,
  getCountries,
  getCountriesOrdered,
  filterCountry,
  frontFilter,
  clearResultCountries
} from "../../actions";
import {useState} from "react";
import './NavBar.css'

export function NavBar(props){

  const [searchValue,setSearchValue]= useState('');
  const [orderValue,setOrderValue]= useState('');
  const [filterValue,setFilterValue]= useState('');
  const [frontFilterValue,setFrontFilterValue]= useState('');

  const {activityList,countries,resultCountries} = props;
  const activitiesOptions = activityList.map(act=><option key={act} name={act} value={act}>{act}</option>);
  let con=[];
  const continentOptions = [...countries].sort(compare)
    .filter(e=>{if (con.includes(e.continent)) return false; else {con.push(e.continent); return true;}})
    .map(c => <option name={c.continent} key={c.continent} value={c.continent}>{c.continent}</option>)
  function compare(a,b) {
    if (a.continent < b.continent) return -1;
    if (a.continent > b.continent) return 1;
    return 0;
  }

  function handleSearch(ev){
    ev.preventDefault();
    setOrderValue('');
    setFilterValue('');
    setFrontFilterValue('');
    props.searchCountry(searchValue);
    if(!resultCountries.length) setSearchValue('');
  }
  function handleOrder(ev){
    ev.preventDefault();
    setFilterValue('');
    setFrontFilterValue('');
    setOrderValue(ev.target.value);
    switch (ev.target.value){
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
    setOrderValue('');
    setFrontFilterValue('');
    setFilterValue(ev.target.value);
    props.filterCountry(ev.target.value);
  }
  function handleFrontFilter(ev){
    ev.preventDefault();
    setFilterValue('');
    setOrderValue('');
    setFrontFilterValue(ev.target.value);
    props.frontFilter(ev.target.value);
  }
  function handleClear(ev){
    ev.preventDefault();
    setOrderValue('');
    setFilterValue('');
    setFrontFilterValue('');
    setSearchValue('');
    props.clearResultCountries();
  }

    return (
    <div className="bar">
      <Link to="/activity">
      <button>NEW ACTIVITY 🗺️</button>
      </Link>
      <form id={'search'} onSubmit={(e)=>handleSearch(e)}>
        <input autoComplete="off" type="search" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
        <input type="submit" value="SEARCH 🔍"/>

      </form>
      {/*<form id="order" >*/}
      <select id="order" value={orderValue} onChange={(e)=>handleOrder(e)}>
        <option value="">ORDER  </option>
        <option value="abc"> A ► Z </option>
        <option value="zyx"> Z ► A </option>
        <option value="pAsc"> Population ▲ </option>
        <option value="pDesc"> Population ▼ </option>
      </select>
      {/*</form>*/}
      FILTER >>
      <select id="frontFilter" value={frontFilterValue} onChange={(e)=>handleFrontFilter(e)}>
        <option value="">CONTINENT</option>
        {continentOptions}
      </select>
      <select id="contFilter" onChange={(e)=>handleFilter(e)} value={filterValue}>
        <option value="">ACTIVITY</option>
        {activitiesOptions}
      </select>
      <button onClick={e => handleClear(e)}>CLEAR ❌</button>
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
      frontFilter: (continent)=> dispatch(frontFilter(continent)),
      clearResultCountries: ()=>dispatch(clearResultCountries())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);