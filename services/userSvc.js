/**
 * Created by guoxuan on 17/4/10.
 */
const Promise = require('promise');
const WUser = require('../models/wuser');
const GLOBAL = require('../global.js');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(GLOBAL.APPID, GLOBAL.APPSECRET);
var _=require("lodash");

var UserSvc = function(){

}

UserSvc.prototype.updateUser = function(){
    return new Promise((resolve, reject) => {
            //console.log("test")
        WUser.find().then((data) => {
            _.forEach(data, (u) => {
                api.getUser(u.openId, (err, res) => {
                //console.log(res.openid);
                WUser.findOneAndUpdate({'openId':res.openid},{'nick':res.nickname, 'unionId':res.unionid},(err,res) => {
                    console.log(err);
                    console.log(res);
                });
                })
            })
        })
    })
}

module.exports = UserSvc;