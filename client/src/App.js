import './App.css';
import React,{useEffect,useState} from "react"; //mio
import {BrowserRouter, Route} from 'react-router-dom';
import {connect,useDispatch} from "react-redux";
import Home  from './components/Home';
import CountryDetail from './components/CountryDetail';
import LandingPage from './components/LandingPage'
import NewActivity from "./components/NewActivity";
import {getCountries} from "./actions";
import {bindActionCreators} from "redux";



export default function App() {
  // const [countries,setCountries] = useState([]);//
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(getCountries())
  //   axios.get('http://localhost:3001/countries?page= 4')
  //     .then(response => {
  //       setCountries(response.data.countries);
  //       const pageNumbers = response.data.total/10;
  //     });
  // },[]);

  // let countryData = countries.map(c=>{
  //   return (
  //     <div key={Math.random()}>
  //       <h2>{c.name}</h2>
  //       <h4>{c.continent}</h4>
  //       <img src={c.flag} height={120} width={200} alt='flag not found'/>
  //     </div>
  //   )
  // })
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/activity" component={NewActivity}/>
        <Route exact path="/country/:id" component={CountryDetail}/>
      {/*<h1>Henry Countries</h1>*/}
      </div>
    </BrowserRouter>
  );
}

// const mapStateToProps = (state) => ({     //subscribe component to state.selectedCountry
//   countries: state.countries
// })
// function mapDispatchToProps(dispatch){
//   return bindActionCreators(getCountries,dispatch);
// }
// export default connect(mapStateToProps,mapDispatchToProps)(App);
