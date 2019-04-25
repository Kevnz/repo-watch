var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GitHub Observatory' });
});
router.get('/:user', function(req, res, next) {
  res.render('index', { title: 'GitHub Observatory' });
});
module.exports = router;
