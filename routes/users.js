var express = require('express');
var router = express.Router();
const UserSvc=require('../services/userSvc.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  getUsers();
  res.render('user');
});


function getUsers(){

  setInterval(() => {
    var userSvc = new UserSvc();
    userSvc.updateUser().then(data => {
      //if(data == "OK")
      //{
      //  console.log("update success");
      //}
      //else{
      //  console.log(data);
      //}
    })
  }, 1000*60*60)

}

module.exports = router;
