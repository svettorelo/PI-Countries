const {Router} = require('express');
const router = Router();
const {GetCountriesOrdered,GetCountries,GetCountryDetail,SearchCountries,FilterCountries} = require('../controllers/country');

router.get('/:id',(req,res,next)=>{
  let {id}=req.params;
  GetCountryDetail(id)
    .then(country => res.json(country))
    .catch(err => next(err));
});

router.get('/',(req,res,next)=>{
    let {name,param,order,filter} = req.query;
    if(name){
      SearchCountries(name)
        .then(countries => res.json(countries))
        .catch(err => next(err));
    } else if(param&&order){
      GetCountriesOrdered(order,param)
        .then(countries => res.json(countries))
        .catch(err => next(err));
    } else if(filter){
      FilterCountries(filter)
        .then(countries => res.json(countries))
        .catch(err => next(err));
    } else {
      GetCountries()
        .then(countries => res.json(countries))
        .catch(err => next(err));
    }
});

module.exports = router;