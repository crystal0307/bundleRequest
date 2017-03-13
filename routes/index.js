var express = require('express');
var router = express.Router();
const BundleSvc = require('../services/bundleSvc.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var bundleSvc = new BundleSvc();
  bundleSvc.getBundles().then(data => {
    res.render('index');
  })
});

module.exports = router;
