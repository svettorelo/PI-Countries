const { Router } = require('express');
const {AddNewActivity, GetActivities} = require('../controllers/activity')

const router = Router();

router.get('/',(req,res,next)=>{
  GetActivities()
    .then(activities => res.json(activities))
    .catch(err => next(err));
});

router.post('/',(req,res,next)=>{
  const {name,difficulty,duration,season,countryId} = req.body;
    AddNewActivity(name,difficulty,duration,season,countryId)
      .then(() => res.json({message:'activity created!'}))
      .catch(err => next(err));
});

module.exports = router;