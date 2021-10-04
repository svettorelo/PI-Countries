const initialState = {
  countries: [],
  selectedCountry:{activities:[]},
  countryList: []
}

function rootReducer(state = initialState,action){
  switch (action.type){
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    case 'GET_COUNTRY_DETAIL':
      return {
        ...state,
        selectedCountry: action.payload
      }
    case 'CLEAR_COUNTRY_DETAIL':
      return {
        ...state,
        selectedCountry: action.payload
      }
    case 'SEARCH_COUNTRY':
      return {
        ...state,
        countries: action.payload
      }
    case 'GET_COUNTRY_LIST':
      return {
        ...state,
        countryList: action.payload
      }
    case 'ADD_ACTIVITY':
      return {
        ...state
      }
    case 'ORDER?FILTER?':
      return {}
    default:
      return {
        ...state
      }
  }
}
export default rootReducer;