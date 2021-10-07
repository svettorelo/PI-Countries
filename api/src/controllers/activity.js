const {Activity} = require('../db.js');
let id = 1;

function GetActivities(){
  let activities = [];
  return Activity.findAll()
    .then(response => {
      response.forEach(ac => activities.push(ac.name));
      return activities;
    })
}

function AddNewActivity (name,difficulty,duration,season,countryId){
 return Activity.create({
      id:id++,
      name,
      difficulty,
      duration,
      season
    })
    .then(result => result.addCountries(countryId));
}

module.exports = {
  AddNewActivity,
  GetActivities
}