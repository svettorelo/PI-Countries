const { Router } = require('express');
const router = Router();
let countries = [];
const {AddCountry,GetCountries} = require('../controllers/country');

router.get('/',(req,res)=>{
  try {
    //countries = GetCountries();
      if (!countries.length) {       //if countries array is empty
        AddCountry();
        res.json('countries added');
      } else {
      console.log(`countries not axios`);
      res.json(countries);
    }
  } catch(err){
    res.send('it didnt work')
  }
});

module.exports = router;