const { Router } = require('express');
// Importar todos los routers;
const countryRouter = require('./country.js');
const activityRouter = require('./activity.js');
const {AddCountry} = require("../controllers/country");

const router = Router();

// Configurar los routers

router.use('/countries', countryRouter);
router.use('/activity', activityRouter);

router.get('/',(req,res)=>{
  res.send('homePage');
})

module.exports = router;
