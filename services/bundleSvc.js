
  const Promise = require('promise');
  const User = require('../models/User');

  var BundleSvc = function(){

  }
  BundleSvc.prototype.getBundles = function(){
    console.log('getaaa');
    return new Promise((resolve, reject) => {
       var list = User.aggregate([{$unwind:"$applies"},{$project:{applies:1,_id:0}}]).sort({"applies.time":-1});
       resolve(list);
    })
  }

  module.exports = BundleSvc;
