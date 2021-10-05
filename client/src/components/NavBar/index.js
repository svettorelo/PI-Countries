import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {searchCountry,getCountries,getCountriesOrdered} from "../../actions";
import {useState} from "react";
import './NavBar.css'

export function NavBar(props){
  const [searchValue,setSearchValue]= useState('');
    function handleSearch(ev){
      ev.preventDefault();
      props.searchCountry(searchValue);
      if(!props.searchResult.length) setSearchValue('');
    }
    function handleOrder(ev){
      switch (ev.target.value){
        case 'none':
          props.getCountries(); break;
        case 'abc':
          props.getCountriesOrdered('ASC','name');break;
        case 'zyx':
          props.getCountriesOrdered('DESC','name');break;
        case 'pAsc':
          props.getCountriesOrdered('ASC','population');break;
        case 'pDesc':
          props.getCountriesOrdered('DESC','population');break;
        default:
          props.getCountries();
      }
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
      <form onSubmit={(e)=>handleSearch(e)}>
        <input autoComplete="off" type="search" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
        <input type="submit" value="Search"/>
        <button onClick={()=>clearSearch()}>Clear</button>
      </form>
      <form onChange={(e)=>handleOrder(e)}>
      Order:{' '}
      <select id="order">
        <option value="none">   </option>
        <option value="abc"> A - Z </option>
        <option value="zyx"> Z - A </option>
        <option value="pAsc"> Pop. Asc. </option>
        <option value="pDesc"> Pop. Desc. </option>
      </select>
      </form>

      <span>filter</span>
        <select/>
      </div>
  )
}
const mapStateToProps = (state) => ({     //subscribe component to state.searchResult
  searchResult: state.searchResult
});
function mapDispatchToProps(dispatch){
    return {
      searchCountry: (country) => dispatch(searchCountry(country)),
      getCountries: () => dispatch(getCountries()),
      getCountriesOrdered: (order,param)=>dispatch(getCountriesOrdered(order,param))}
}
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);