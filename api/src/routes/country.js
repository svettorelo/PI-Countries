const { Router } = require('express');
const router = Router();
const {AddCountry,GetCountries,GetCountryDetail,SearchCountries} = require('../controllers/country');
//const {Country} = require("../db.js");

router.post('/',(req,res)=>{
  AddCountry();    //load the db with data POST from landing page
  res.send('db loaded!')
});

router.get('/:id',(req,res)=>{
  let {id}=req.params;
  GetCountryDetail(id)
    .then(response=> res.json(response))
    .catch(err=>res.json({message: err}));
});

router.get('/',(req,res)=>{
    let {name,page} = req.query;
    if(name){
      SearchCountries(name)
        .then(matches=>res.json(matches))
        .catch(err=>res.json({error:'search', message:err}));
    }
    else {
      GetCountries(parseInt(page))
        .then(countries=>res.json(countries))
        .catch(err=>res.json({error:'get', message:err}));
    }
});

module.exports = router;