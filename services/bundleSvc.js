
  const Promise = require('promise');
  const User = require('../models/User');
  const Bundle = require('../models/bundle');
  const _ = require('lodash');

  var BundleSvc = function(){

  }
  BundleSvc.prototype.getBundles = function(){
    return new Promise((resolve, reject) => {

      Bundle.findOne({"isActive":true},{_id:1}).then(bundle => {
        User.aggregate([{$unwind:"$applies"},{$project:{applies:1,_id:0}}]).sort({"applies.time":-1}).then(data => {
            var resultList = _.filter(data, (result) => {
              return result.applies.bundleId == bundle._id;
            })
            resolve(resultList);
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
      },err => {
        reject(err);
      })
  }

  module.exports = BundleSvc;
