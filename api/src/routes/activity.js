const { Router } = require('express');
const {AddNewActivity} = require('../controllers/activity')

const router = Router();

router.post('/',(req,res)=>{
  const {name,difficulty,duration,season,countriesId} = req.body;
  try{ AddNewActivity(name,difficulty,duration,season,countriesId);
  }catch (err){

  }
});

module.exports = router;