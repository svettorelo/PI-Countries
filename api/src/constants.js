const BASE_URL = 'https://restcountries.com/v3/all'
const NAME_URL = 'https://restcountries.com/v3/name' //https://restcountries.com/v2/name/{name}
//...character/?page=1  si me trajese la 1ra pag
const ALPHA_URL = 'https://restcountries.com/v3/alpha' // GET https://restcountries.com/v2/alpha/{code}

module.exports = {
  BASE_URL,
  NAME_URL,
  ALPHA_URL
}