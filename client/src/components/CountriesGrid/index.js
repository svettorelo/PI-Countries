import {connect} from 'react-redux'
import CountryCard from "../CountryCard";
import {Link} from "react-router-dom";
import "./CountriesGrid.css";
import {useState} from "react";
import {getCountries} from "../../actions";

export function CountriesGrid(props){
  let i = 1;
  const [page, setPage] = useState(0);
  let countriesToShow;
  const {resultCountries,countries} = props;

  if(resultCountries.length) countriesToShow = resultCountries;
  else countriesToShow = countries;

  const total = countriesToShow.length;
  const maxPage = total / 10;

  function nextPage() {
      setPage(page < maxPage ? page + 1 : page);
    }
  function previousPage() {
      setPage(page > 0 ? page - 1 : page)
    }
  function buttonLeft() {
      return page === 0 ? ' ' : <button onClick={previousPage}>{'<<'}</button>
    }
  function buttonRight() {
      return page >= maxPage ? ' ' : <button onClick={nextPage}>{'>>'}</button>
    }

  let currentCountries = countriesToShow.slice(page * 10 === total ? total - 1 : page * 10, page === 0 ? 9 : page * 10 + 10);

  return (
    <div>
      <div className="cards">
        {currentCountries.map(c => {
          return (
            <div key={i++}>
              <Link to={'/country/' + c.id}>
                <CountryCard name={c.name} continent={c.continent} flag={c.flag}/>
              </Link>
            </div>)
        })}
      </div>
      {buttonLeft()} <strong> {page} </strong> {buttonRight()}
    </div>
  )
}

const mapStateToProps = (state) => ({     //subscribe component to state.countries
  countries: state.countries,
  resultCountries: state.resultCountries
});
function mapDispatchToProps(dispatch){
  return {
    getCountries: ()=>dispatch(getCountries())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CountriesGrid);