const {Country} = require('../db.js');
const axios = require('axios');
const {BASE_URL} = require('../constants');

function GetCountries(){
  Country.findAll()
    .then(c => {
      console.log(c);
      return [5];
    })
    .catch(err=> {
      console.error(err);
      return [];
    })
}

function AddCountry(){
  axios.get(`${BASE_URL}`)
    .then(response => response.data)
    .then(data => {
      data.forEach( c => {
        Country.create({
          name: c.name,
          id: c.alpha3Code,
          capital: c.capital ||'capital not found',
          continent: c.continent,
          area: c.area,
          population: c.population,
          flag: c.flags[1] //|| 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png'
        })
          .then(()=> console.log('country Added!'))
          .catch(er=>console.log(er))
      });
    })
    .catch(notread => console.log(notread));
}

module.exports = {AddCountry,GetCountries}