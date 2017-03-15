var express = require('express');
var router = express.Router();
const BundleSvc = require('../services/bundleSvc.js');
var filter=require("lodash/filter");
var dd=[];
/* GET home page. */
router.get('/', function(req, res, next) {
  var bundleSvc = new BundleSvc();
  bundleSvc.getBundles().then(data => {
    dd=data;
    res.render('index',{ title: 'f3ff', datas:data});
  })
});

router.get('/currDate', function(req, res, next){
    // var myDate = new Date();
    // var currentDate=myDate.toLocaleDateString(); //获取当前日期
    var nowDate=getNowFormatDate();
    //console.log(nowDate);
   var aData=filter(dd,(l) => {
      return l.applies.time.substring(0,10)==nowDate;
   })
     res.json({list:aData})


  // res.end(JSON.stringify(aData));
  //res.render('test',{ datass:aData});
})

router.get('/allDate', function(req, res, next){
  var alldata=dd;
  //console.log(alldata);
  res.json({listall:alldata})
  // res.end(JSON.stringify(aData));
  //res.render('test',{ datass:aData});
})


function getNowFormatDate(){
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    Year= day.getFullYear();//支持IE和火狐浏览器.
    Month= day.getMonth()+1;
    Day = day.getDate();
    CurrentDate += Year;
    if (Month >= 10 ){
     CurrentDate +="-"+ Month;
    }
    else{
     CurrentDate +="-"+ "0" + Month;
    }
    if (Day >= 10 ){
     CurrentDate +="-"+ Day ;
    }
    else{
     CurrentDate +="-"+ "0" + Day ;
    }
    return CurrentDate;
 }
module.exports = router;
