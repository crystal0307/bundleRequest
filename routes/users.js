var express = require('express');
var router = express.Router();
const UserSvc=require('../services/userSvc.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //getUsers();
  //getW();
  res.render('user');
});


function getUsers(){

  //var userSvc = new UserSvc();
  //userSvc.updateUser().then(data => {
  //
  //})
  //

}

function getW(){
  var userSvc = new UserSvc();
  userSvc.getWeeks('2017-10-01').then(data => {
    console.log(data);
  })
}

module.exports = router;
