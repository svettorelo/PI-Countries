const {Country,Activity} = require('../db.js');
const axios = require('axios');
const {Op} = require('sequelize');
const {BASE_URL} = require('../constants');
let countries = [];

// function GetCountries(req,res,next){
//   Country.findAll()
//     .then(response => {
//       response.forEach(co => countries.push({
//         name: co.name,flag: co.flag,continent: co.continent}));
//       next(countries);
//     })
//     .catch(err=> {console.error(err);next(err);})}

function GetCountries(){
  return Country.findAll()
    .then(response => {
      response.forEach(co => countries.push({
        name: co.name,
        flag: co.flag,
        continent: co.continent
      }));
      return countries;
    })
    .catch(err=> {
      console.error(err);
      return err;
    })
}
function AddCountry(){
  axios.get(`${BASE_URL}`)
    .then(response => response.data)
    .then(data => {
      data.forEach( c => {
        Country.create({
          name: c.name.common,
          id: c.cca3,
          capital: c.capital? c.capital[0] : 'capital not found',
          continent: c.region,
          area: c.area,
          subregion: c.subregion,
          flag: c.flags[1] //|| 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png'
        })
          .then(()=> console.log('country Added!'))
          .catch(er=>console.log(er))
      });
    })
   .catch(notread => console.log(notread));
}
function GetCountryDetail(id){
  return Country.findByPk(id.toUpperCase(),{include: Activity})
    .then(response=>response?response:'We\'re sorry, no matches were found for your search')
    .catch(err=>err)
}
function SearchCountries(name){
  return Country.findAll({where:{name:{
        [Op.or]: {
          [Op.iLike]:'%'+name,
          [Op.substring]: name,
          [Op.substring]: name[0].toUpperCase()+name.substring(1)
        }
  }}})
    .then(response=>response.length?response:'We\'re sorry, no matches were found for your search')
    .catch(err=>err)
}

module.exports = {AddCountry,GetCountries,GetCountryDetail,SearchCountries}