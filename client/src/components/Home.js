import CountriesGrid from "./CountriesGrid";
import {connect} from "react-redux";
import NavBar from "./NavBar";
import {getCountries} from "../actions";
import {useState} from "react";
import './Home.css'

export function Home(props){
 const {total} = props.countries;
 const maxPag = total/10;
 const [page,setPage] = useState(0);

 function nextPage(){
   if(page<maxPag) {
     props.getCountries(page+1);
     setPage(page + 1);
   }
  }

  function previousPage(){
   if(page>0) {
     props.getCountries(page-1);
     setPage(page-1)
  }}
  function buttonLeft(){
   if(page===0) return ' ';
   else return (<button onClick={previousPage}>{'<<'}</button>)
 }
  function buttonRight(){
    if(page>=maxPag) return ' ';
    else return (<button onClick={nextPage}>{'>>'}</button>)
  }
     return (
    <div>
      HOME
      <NavBar/>
      <div  className="cards" >
        <CountriesGrid/>
      </div>
      {buttonLeft()}{buttonRight()}
    </div>
  )
}

const mapStateToProps = (state) => ({     //subscribe component to state.countries
  countries: state.countries
});
function mapDispatchToProps(dispatch){
  return {getCountries: (page)=>dispatch(getCountries(page))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);