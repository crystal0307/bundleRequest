/**
 * Created by guoxuan on 17/3/29.
 */
const Promise = require('promise');
const Order = require('../models/order');
const Item = require('../models/item');
var _ = require("lodash");


var OrderSvc = function() {

}


OrderSvc.prototype.getOrders = function() {
    return new Promise((resolve, reject) => {
        Order.find().then(orders => {
            //  console.log(_.filter(orders,(f) =>{return f.address.name == "黄一鸣";}));
            Item.find().then(items => {
                var resList = [];
                //console.log(resList.length);
                //items 需要遍历的集合
                _.forEach(items, (item) => {
                    var data = _.filter(orders, (o) => {
                        return o.itemId == item._id;
                    })
                    _.forEach(data, (order) => {
                        var name = item.name;
                        resList.push({
                            "itemName": name,
                            "quantity": order.quantity,
                            "created": order.created,
                            "province": order.address.province,
                            "city": order.address.city,
                            "detail": order.address.detail,
                            "tel": order.address.tel,
                            "name": order.address.name,
                            "status": order.status
                        });
                    })
                })
                resList = _.orderBy(resList, ["created"], ['desc'])
                resolve(resList);
            })
        }).catch(err => {
            reject(err);
        });
    }, err => {
        reject(err);
    })
}
module.exports = OrderSvc;
