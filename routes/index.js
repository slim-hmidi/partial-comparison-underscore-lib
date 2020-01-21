const router = require('express').Router();
const partialCtrl = require('../controllers/index');

router.route('/data')
  .get(partialCtrl.getData);
