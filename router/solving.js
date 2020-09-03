const router = require('express').Router();
const Controller = require('../controllers/solvingController');

router.get('/', Controller.getFormat);
router.post('/', Controller.solving);

module.exports = router;