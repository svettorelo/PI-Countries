const { Router } = require('express');
// Importar todos los routers;
const countryRouter = require('./country.js');
const activityRouter = require('./activity.js');

const router = Router();

// Configurar los routers

router.use('/country', countryRouter);
router.use('/activity', activityRouter);

module.exports = router;
