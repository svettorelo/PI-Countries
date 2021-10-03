const {Router} = require('express');
const router = Router();
const {CountryList,GetCountries,GetCountryDetail,SearchCountries} = require('../controllers/country');

router.get('/:id',(req,res,next)=>{
  let {id}=req.params;
  GetCountryDetail(id)
    .then(country => res.json(country))
    .catch(err => next(err));
});

router.get('/',(req,res,next)=>{
    let {name,page,list} = req.query;
    if(name){
      SearchCountries(name)
        .then(matches => res.json(matches))
        .catch(err => next(err));
    } else if(list){
      CountryList()
        .then(list => res.json(list))
        .catch(err => next(err));
    } else {
      GetCountries(page?parseInt(page):0)
        .then(countries => res.json(countries))
        .catch(err => next(err));
    }
});

module.exports = router;