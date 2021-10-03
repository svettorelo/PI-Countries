const { Router } = require('express');
const {AddNewActivity} = require('../controllers/activity')

const router = Router();

router.get('/',(req,res)=>{
  res.send(`route to show form to add new activity`);
});

router.post('/',(req,res,next)=>{
  const {name,difficulty,duration,season,countryId} = req.body;
    AddNewActivity(name,difficulty,duration,season,countryId)
      .then(() => res.json({message:'activity created!'}))
      .catch(err => next(err));
});

module.exports = router;