const {Country,Activity} = require('../db.js');
const axios = require('axios');
const {Op, where} = require('sequelize');
const {BASE_URL} = require('../constants');

// function GetCountries(req,res,next){
//   Country.findAll()
//     .then(response => {
//       response.forEach(co => countries.push({
//         name: co.name,flag: co.flag,continent: co.continent}));
//       next(countries);})
//     .catch(err=> {console.error(err);next(err);})}

function GetCountriesOrdered(order,param){
  let countries = [];
  return Country.findAll({order:[[param,order]]})
    .then(response=>{
      response.forEach( co => countries.push({
        name: co.name,
        flag: co.flag,
        continent: co.continent,
        id: co.id}));
      return countries;
    })
}

function GetCountries(){
  let countries = [];
   return Country.findAll()
     .then(response => {
       response.forEach(co => countries.push({
                name: co.name,
                flag: co.flag,
                continent: co.continent,
                id: co.id
              }));
       return countries;
     })
}
function FilterCountries(filter){
  let countries =[];
  return Activity.findOne({
    where:{name: filter},
    include: [{
      model: Country
    }]
  })
    .then(response => {response.countries.forEach(co => countries.push({
        name: co.name,
        flag: co.flag,
        continent: co.continent,
        id: co.id
      }));
      return countries;}
    )
}

  // return Country.findAndCountAll({
  //   limit: (page===0) ? 9 : 10,             //pagination
  //   offset: (page===0) ? 0 : page*10-1
  // })
  //   .then(response => {
  //     response.rows.forEach(co => countries.push({
  //       name: co.name,flag: co.flag,continent: co.continent,id: co.id
  //     }));
  //     return {countries,total:response.count};
  //   })

function AddCountry(){
  axios.get(`${BASE_URL}`)
    .then(response => response.data)
    .then(data => {
      let allCountries = data.map(c => {
        return {
          name: c.name.common,
          id: c.cca3,
          capital: c.capital? c.capital[0] : 'This country has no capital',
          continent: c.region,
          area: c.area,
          population: c.population,
          subregion: c.subregion,
          flag: c.flags[0] //|| 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png'
      }})
      return Country.bulkCreate(allCountries)
    })
    .then(()=> console.log('countries added!'))
    .catch(er=>console.log(er))
}

function GetCountryDetail(id){
  return Country.findByPk(id.toUpperCase(),{
    include: [{
      model:Activity,
      attributes:{
        exclude:['createdAt','updatedAt']
      }
    }],
    attributes:{
      exclude:['createdAt','updatedAt']
    }
  })
  .then(response=>response?response:'We\'re sorry, no matches were found for your search')
}

function SearchCountries(name){
  let countries = [];
  return Country.findAll({where:{name:{
        [Op.or]: {
          [Op.like]: '%'+name+'%',
          [Op.iLike]:'%'+name,
          [Op.substring]: name,
          [Op.substring]: name[0].toUpperCase()+name.substring(1)
        }
  }}})
    .then(response => {
      if(response.length) {
        response.forEach(c => countries.push({name: c.name, continent: c.continent, flag: c.flag, id: c.id}));
        return countries;
      }
      else return {message: `We're sorry, no matches were found for your search`}
    })
}

module.exports = {AddCountry,GetCountries,GetCountryDetail,SearchCountries,GetCountriesOrdered,FilterCountries}