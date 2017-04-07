const Promise = require('promise');
const User = require('../models/User');
const Bundle = require('../models/bundle');
const _ = require('lodash');

var BundleSvc = function() {

}

BundleSvc.prototype.updateLottery = function(bundleId, hits) {
    return new Promise(function(resolve, reject) {
        User.find().then(data => {
            _.forEach(data, x => {
                _.forEach(x.applies, y => {
                    if (y.bundleId === bundleId) {
                        if (_.find(hits, ii => {
                                return ii === y.name;
                            })) {
                            y.result = '申领成功';
                            console.log('hit' + y.name);
                        } else {
                            y.reuslt = '10元一键购商城代金券'
                        }
                    }
                });
                x.save().then(data => {}).catch(err => {
                    console.log(err);
                    reject(err);
                });
            })
            resolve();
        }).catch(err => reject(err));
    });
};

BundleSvc.prototype.getBundles = function() {
    return new Promise((resolve, reject) => {
        Bundle.findOne({
            "isActive": true
        }, {
            _id: 1
        }).then(bundle => {
            User.aggregate([{
                $unwind: "$applies"
            }, {
                $project: {
                    applies: 1,
                    _id: 0
                }
            }]).sort({
                "applies.time": -1
            }).then(data => {
                var resultList = _.filter(data, (result) => {
                    return result.applies.bundleId == bundle._id;
                })
                resolve(resultList);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    }, err => {
        reject(err);
    })
}

module.exports = BundleSvc;
