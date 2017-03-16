var express = require('express');
var router = express.Router();
const BundleSvc = require('../services/bundleSvc.js');
var filter=require("lodash/filter");
var moment=require("moment");
/* GET home page. */
router.get('/', function(req, res, next) {
  // var bundleSvc = new BundleSvc();
  // bundleSvc.getBundles().then(data => {
  //   var myDate = new Date();
  //   var nowDate=moment(myDate).locale('zh-cn').format('L');
  //   var aData=filter(data,(l) => {
  //      return l.applies.time.substring(0,10)==nowDate;
  //   })
  //   res.render('index',{ title: 'f3ff', datas:aData});
  // })
  getData('todayData').then(data =>{
    res.render('index',{ title: 'f3ff', datas:data});
  })
});

router.get('/currDate', function(req, res, next){
  getData('todayData').then(data =>{
     res.json({list:data});
  })

})

router.get('/allDate', function(req, res, next){
    getData('allDate').then(data =>{
      res.json({listall:data});
    })
})

function getData(req){
  return new Promise((resolve,reject) =>{
    var bundleSvc = new BundleSvc();
    bundleSvc.getBundles().then(data =>{
      if(req=='allDate'){
        resolve(data);
      }else if(req=='todayData'){
        var myDate = new Date();
        var nowDate=moment(myDate).locale('zh-cn').format('L');
        var aData=filter(data,(l) => {
           return l.applies.time.substring(0,10)==nowDate;
        })
        resolve(aData);
      }
    })
  })
}

module.exports = router;
