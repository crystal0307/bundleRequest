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
                    if(res && res.openid){
                            WUser.findOneAndUpdate({'openId':res.openid},{'nick':res.nickname, 'unionId':res.unionid},(err,res) => {
                                if(err){
                                    console.log("ERROR:");
                                    console.log(res);
                                }
                                else{
                                    console.log("SUCCESS!")
                            }
                        });
                    }
                    else{
                        console.log("no openid");
                        console.log(res);
                    }
                })
            })
        })
    })
}

module.exports = UserSvc;