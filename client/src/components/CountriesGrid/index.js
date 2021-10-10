import {connect} from 'react-redux'
import CountryCard from "../CountryCard";
import {Link} from "react-router-dom";
import "./CountriesGrid.css";
import {useState} from "react";

export function CountriesGrid(props){

  let i = 1;
  const [page, setPage] = useState(0);
  const {resultCountries,countries} = props;
  const countriesToShow = resultCountries.length? resultCountries:countries;
  const total = countriesToShow.length;
  const maxPage = Math.floor(total / 10);


  function nextPage() {
      setPage(page < maxPage ? page + 1 : page);
    }
  function previousPage() {
      setPage(page > 0 ? page - 1 : page)
    }
  function buttonLeft() {
      return page === 0 ? ' ' : <button className="pageButton" onClick={previousPage}>{'<<'}</button>
    }
  function buttonRight() {
      return page >= maxPage ? ' ' : <button className="pageButton" onClick={nextPage}>{'>>'}</button>
    }

  const currentCountries = countriesToShow.slice(page * 10 === total ? total - 1 : page * 10, page === 0 ? 9 : page * 10 + 10);

  return (
    <div className="grid">
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
      <div className="buttons">{buttonLeft()} <strong className="page"> {page} </strong> {buttonRight()}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({     //subscribe component to state.countries
  countries: state.countries,
  resultCountries: state.resultCountries
});

export default connect(mapStateToProps,null)(CountriesGrid);