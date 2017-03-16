var express = require('express');
var router = express.Router();
const BundleSvc = require('../services/bundleSvc.js');
var filter=require("lodash/filter");
var moment=require("moment");
/* GET home page. */
router.get('/', function(req, res, next) {
  getData('todayData').then(data =>{
    res.render('index',{datas:data});
  }).catch((error) =>{
    res.writeHead(200, {
          "Content-Type": "text/html;charset=utf-8"
      });//解决中文提示乱码问题
    res.end('系统错误，请重试!');
  })
});

router.get('/currDate', function(req, res, next){
  getData('todayData').then(data =>{
     res.json({list:data});
  }).catch((error) =>{
    res.writeHead(200, {
          "Content-Type": "text/html;charset=utf-8"
      });
    res.end('系统错误，请重试!');
  })

})

router.get('/allDate', function(req, res, next){
    getData('allDate').then(data =>{
      res.json({listall:data});
    }).catch((error) =>{
      res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
        });
      res.end('系统错误，请重试!');
    })
})

function getData(req){
  return new Promise((resolve,reject) =>{
    var bundleSvc = new BundleSvc();
    bundleSvc.getBundles().then(data =>{
      //throw new Error('niji');
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
    }).catch((err)=>{
      reject(err);
    })
  }).catch((err)=>{
    reject(err);
  })
}

module.exports = router;
