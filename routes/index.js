var express = require('express');
var router = express.Router();
const BundleSvc = require('../services/bundleSvc.js');
const OrderSvc = require('../services/orderSvc.js');
var filter = require("lodash/filter");
var moment = require("moment");
var dataType = "";
/* GET home page. */
router.get('/', function(req, res, next) {
    dataType = "Bundle";
    getData('todayData').then(data => {
        res.render('index', {
            datas: data
        });
    }).catch((error) => {
        res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
        }); //解决中文提示乱码问题
        res.end('系统错误，请重试!');
    })


});

router.get('/lottery/:id', function(req, res, next) {
    var bundleSvc = new BundleSvc();
    bundleSvc.updateLottery(req.params.id, ['朱和燕', '汤东玲', '杨洁瑾', '戴丽榕', '叶乃利']).then(() => {
        res.json({
            res: 'success'
        });
    }).catch(err => {
        res.json({
            res: 'fail'
        });
    });
});

router.get('/currDate', function(req, res, next) {
    if (req.query.val != undefined && req.query.val != null) {
        dataType = req.query.val;
    }
    if (dataType == "Order") {
        getOrder('todayOrder').then(data => {
            res.json({
                list: data,
                flag: "order"
            });
        })
    } else {
        getData('todayData').then(data => {
            //console.log(data);
            res.json({
                list: data,
                flag: "bundle"
            });
        }).catch((error) => {
            res.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8"
            });
            res.end('系统错误，请重试!');
        })
    }
})

router.get('/allDate', function(req, res, next) {
    if (dataType == "Order") {
        getOrder('allOrder').then(data => {
            res.json({
                listall: data,
                flag: "order"
            });
        })
    } else {
        getData('allDate').then(data => {
            res.json({
                listall: data,
                flag: "bundle"
            });
        }).catch((error) => {
            res.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8"
            });
            res.end('系统错误，请重试!');
        })
    }

})


function getData(req) {
    return new Promise((resolve, reject) => {
        var bundleSvc = new BundleSvc();
        bundleSvc.getBundles().then(data => {
            //throw new Error('niji');
            if (req == 'allDate') {
                resolve(data);
            } else if (req == 'todayData') {
                var myDate = new Date();
                var nowDate = moment(myDate).locale('zh-cn').format('L');
                var aData = filter(data, (l) => {
                    return l.applies.time.substring(0, 10) == nowDate;
                })
                resolve(aData);
            }
        }).catch((err) => {
            reject(err);
        })
    }).catch((err) => {
        reject(err);
    })
}

function getOrder(req) {
    return new Promise((resolve, reject) => {
        var orderSvc = new OrderSvc();
        orderSvc.getOrders().then(data => {
            if (req == 'allOrder') {
                resolve(data);
            } else if (req == 'todayOrder') {
                var myDate = new Date();
                var nowDate = moment(myDate).locale('zh-cn').format('L');
                // console.log(nowDate);
                var aData = filter(data, (l) => {
                    return l.created.substring(0, 10) == nowDate;
                })
                resolve(aData);
            }
        })
    })
}

module.exports = router;
