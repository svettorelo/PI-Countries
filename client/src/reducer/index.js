const initialState = {
  countries: [],
  selectedCountry:{activities:[]},
  currentPage:0,
  activityList:[],
  searchResult:[]
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
        searchResult: action.payload
      }
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activityList: [...state.activityList,action.payload]
      }
    case 'GET_COUNTRIES_ORDERED':
      return {
        ...state,
        countries: action.payload
      }
    case 'FILTER_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default rootReducer;