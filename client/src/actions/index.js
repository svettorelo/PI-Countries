import axios from 'axios';
import {BASE_URL,ACTIVITY_URL} from '../constants';

export function getCountries(page){
  return function (dispatch){
    return axios.get(`${BASE_URL}/countries?page=${page}`)
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
export function getCountryList(){
  return function (dispatch){
    return axios.get(`${BASE_URL}/countries?list=1`)
      .then(result => dispatch({
          type: 'GET_COUNTRY_LIST',
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
      .then(result=> dispatch({
          type: 'SEARCH_COUNTRY',
          payload: result.data
        })
      )
  }
}
// export function addActivity(activity){
// axios.post(ACTIVITY_URL)}