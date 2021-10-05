import axios from 'axios';
import {BASE_URL,ACTIVITY_URL} from '../constants';

export function getCountries(){
  return function (dispatch){
    return axios.get(`${BASE_URL}/countries`)
      .then(result => dispatch({
          type: 'GET_COUNTRIES',
          payload: result.data
        })
      )
  }
}
export function getCountryDetail(id){
  return function (dispatch){
    return axios.get(`${BASE_URL}/countries/${id}`)
      .then(result => dispatch({
          type: 'GET_COUNTRY_DETAIL',
          payload: result.data
        })
      )
  }
}
export function getCountriesOrdered(order,param){
  return function (dispatch){
    return axios.get(`${BASE_URL}/countries?order=${order}&param=${param}`)
      .then(result => dispatch({
          type: 'GET_COUNTRIES_ORDERED',
          payload: result.data
        })
      )
  }
}
export function clearCountryDetail(){
  return function (dispatch){
    dispatch({
      type:'CLEAR_COUNTRY_DETAIL',
      payload:{flag:'https://1.bp.blogspot.com/-tM8Z7VPNn5Q/WMkr9sb6qyI/AAAAAAAAA9s/IjGPg8VFOkc41UWeaWuGY7eyJeCCEb82gCLcB/s1600/earth%2B.gif',
        activities: []}
    })
  }
}
export function searchCountry(name){
  return function (dispatch){
    return axios.get(`${BASE_URL}/countries?name=${name}`)
      .then(result => {
        if(Array.isArray(result.data)) dispatch({
            type: 'SEARCH_COUNTRY',
            payload: result.data
          });
        else {
          alert(result.data.message);
          dispatch({type: 'SEARCH_COUNTRY',
            payload:[]})
        }
        }
      )
  }
}
export function addActivity(activity){
  return function (dispatch){
    return axios.post(ACTIVITY_URL,activity)
      .then(result=> {
        alert(result.data.message);
        dispatch({
          type: 'ADD_ACTIVITY',
          payload: activity.name
        })
    })
  }
}