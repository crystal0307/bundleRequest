/**
 * Created by guoxuan on 17/4/10.
 */
const Promise = require('promise');
const WUser = require('../models/wuser');
const UserModel = require('../models/User');
const GLOBAL = require('../global.js');
var WechatAPI = require('wechat-api');
var moment = require('moment');
var api = new WechatAPI(GLOBAL.APPID, GLOBAL.APPSECRET);
var _ = require("lodash");
const Events = require('./events.js');

var UserSvc = function() {
  api.setOpts({
    timeout: 30 * 1000
  });
}

UserSvc.prototype.getRes = function() {
  return new Promise((resolve, reject) => {
    api.getMaterial('7MxGeDIa82aJS6IvrdTtartcUuv49-9ZWnVXkvY7uRg', (err, data) => {
      if (err) {
        reject(err);
      } else {
        var articles = [];
        _.forEach(data.news_item, x => {
          articles.push({
            title: x.title,
            description: x.digest,
            picurl: x.thumb_url,
            url: x.url
          });
        });
        api.sendNews("oj5io0_EDfsAjvWdTYu-OuXuXa98", articles, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
      }
    })
  })
}


UserSvc.prototype.updateUser = function() {
  return new Promise((resolve, reject) => {
    WUser.find().then((data) => {
      _.forEach(data, (u) => {
       if(u.status != false)
        {
            api.getUser(u.openId, (err, res) => {
              if (res && res.openid) {
                console.log(res.nickname);
                WUser.findOneAndUpdate({
                  'openId': res.openid
                }, {
                  'nick': res.nickname,
                  'unionId': res.unionid
                }, (err, res) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                console.log(err);
              }
            })
        }
      })
    })
  })
}

UserSvc.prototype.getWeeks = function(bornDate) {
  return new Promise((resolve, reject) => {
    var bDate = new moment(bornDate);
    var now = new moment("2017-04-28");
    var days = parseInt(bDate.diff(now, "days")) + 1;
    var week = (40 - parseInt(days / 7));
    resolve(week + 1);
  })
}


UserSvc.prototype.sendTempateMsg = function() {
  return new Promise((resolve, reject) => {
    UserModel.find().then(datas => {
      _.forEach(datas, (data) => {
        if (data.preBorn != null && data.preBorn != undefined && data.preBorn != "") {
          var bDate = new moment(data.preBorn);
          var now = new moment();
          var dd = parseInt(bDate.diff(now, "days")) + 1;
          var week = (40 - parseInt(dd / 7));
          var weekRes = week + 1;
          var events = _.filter(Events.Events, (e) => {
            return e.week == weekRes;
          });
          if (events != null && events != undefined && events.length > 0) {
            _.forEach(events, (event) => {
              var isDo = _.filter(data.reminders, (r) => {
                return r == event.id;
              })
              if (isDo && isDo.length <= 0) {
                UserModel.findOneAndUpdate({
                  'openId': data.openId
                }, {
                  $push: {
                    'reminders': event.id
                  }
                }, (err, res) => {
                  if (!err) {
                    sendTem(data.unionId, event);
                  }
                })
              }
            })
          }
        }
      })
    })
  })
}

function sendTem(uId, event) {
  WUser.find({
    unionId: uId
  }).then(data => {
    if (data) {
      var datas = {
        "first": {
          "value": "您好!您的在办项目有最新进度,请及时跟进办理:"
        },
        "keyword1": {
          "value": event.title
        },
        "keyword2": {
          "value": "孕前检查"
        },
        "keyword3": {
          "value": (new moment()).format("YYYY年MM月DD日")
        },
        "remark": {
          "value": "点击详情可跟进办理"
        }
      }
      api.sendTemplate(data[0].openId, GLOBAL.TEMPLATEID, 'http://miaozhun.shtx.com.cn/template.html', datas, (err, res) => {
        console.log(err);
        console.log(res);
      })
    }
  })
}


module.exports = UserSvc;
