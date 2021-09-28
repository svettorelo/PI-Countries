const {Activity} = require('../db.js');
let id = 1;

function AddNewActivity (name,difficulty,duration,season,countryId){
    return Activity.create({
      id:id++,
      name,
      difficulty,
      duration,
      season}).then(result => result.addCountries(countryId));
}

module.exports = {
  AddNewActivity
}